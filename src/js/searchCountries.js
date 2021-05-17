import countryTpl from '../templates/country.hbs';
import countryListTpl from '../templates/countriesList.hbs';

import notices from './pnotify';

var debounce = require('lodash.debounce');

const refs = {
  container: document.querySelector('.countries'),
  input: document.querySelector('.search-country'),
  countriesList: document.querySelector('.country-list'),
  countryDiv: document.querySelector('.country-description'),
};

refs.input.addEventListener('input', debounce(onSearchCountry, 500));

function onSearchCountry(e) {
  fetchCountry(e).then(data => {
    if (data.length === 1) {
      makeCountry(data);
    }
    if (data.length > 1) {
      makeCountriesList(data);
    }
    if (data.length > 10) {
      notices.alertTooManyMatches();
    }
  });

  resetInput();
}

function fetchCountry(e) {
  return fetch(`https://restcountries.eu/rest/v2/name/${e.target.value}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('', notices.errorEmptyInput());
  });
}

function makeCountriesList(data) {
  refs.countriesList.insertAdjacentHTML('beforeend', countryListTpl(data));
}

function makeCountry(data) {
  refs.countryDiv.insertAdjacentHTML('beforeend', countryTpl(...data));
}

function resetInput() {
  refs.countriesList.innerHTML = '';
  refs.countryDiv.innerHTML = '';
}
