const SEARCH_URL = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = name => {
  return fetch(
    `${SEARCH_URL}${name}?fields=name,capital,population,flags,languages`
  ).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
};
