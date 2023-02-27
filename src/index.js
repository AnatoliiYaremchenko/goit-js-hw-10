import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const listRef = document.querySelector('.country-list');
const divRef = document.querySelector('.country-info');
const inputRef = document.querySelector('#search-box');

const addCounrtyList = arr => {
  divRef.innerHTML = '';

  const list = arr
    .map(el => {
      console.log();
      return `<li class="country-item">
                <img class="country-img" src="${el.flags.svg}" alt="flag">
                <span class="counntry-name">${el.name.common}</span>
            </li>`;
    })
    .join('');

  listRef.innerHTML = `${list}`;
};

const addCounrtyCard = arr => {
  listRef.innerHTML = '';

  const card = arr
    .map(el => {
      const langs = Object.values(el.languages).join(',');

      return `<div class="country-name__wrapper">
                <img class="country-img" src="${el.flags.svg}" alt="flag">
                <span class="country-card-name">${el.name.common}</span>
            </div>
            <ul class="country-info-list">
                <li class="country-info-item">
                    <span class="country-info-text">Capital:</span>
                    ${el.capital}
                </li>
                <li class="country-info-item">
                    <span class="country-info-text">Population:</span>
                    ${el.population}
                </li>
                <li class="country-info-item">
                    <span class="country-info-text">Languages:</span>
                    ${langs}
                </li>
            </ul>
            `;
    })
    .join('');

  divRef.innerHTML = `${card}`;
};

const onSearchForm = event => {
  const countryName = event.target.value.trim();

  if (!countryName) {
    divRef.innerHTML = '';
    listRef.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        divRef.innerHTML = '';
        listRef.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length < 10 && data.length > 1) {
        divRef.innerHTML = '';
        addCounrtyList(data);
      } else {
        addCounrtyCard(data);
      }
    })
    .catch(error => {
      divRef.innerHTML = '';
      listRef.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};

const initialSaveData = debounce(onSearchForm, DEBOUNCE_DELAY);

inputRef.addEventListener('input', initialSaveData);
