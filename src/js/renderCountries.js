import countryTpl from '../templates/country.hbs';
import countryListTpl from '../templates/countriesList.hbs';
import notices from './pnotify-lib';
import NewApiService from '../js/fetchCountries';

const newApiService = new NewApiService();

var debounce = require('lodash.debounce');

const refs = {
  container: document.querySelector('.countries'),
  input: document.querySelector('.search-country'),
  countriesList: document.querySelector('.country-list'),
  countryDiv: document.querySelector('.country-description'),
};

refs.input.addEventListener('input', debounce(onSearchCountry, 800));
refs.countriesList.addEventListener('click', addCountryOptionToInput);

function onSearchCountry(e) {
  newApiService.query = e.target.value;

  newApiService.fetchArticleCountry().then((data) => {
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

  resetPage();
}

function addCountryOptionToInput(e) {
  if (e.target.hasAttribute('data-action')) {
    refs.input.value = e.target.textContent.trim();
    // newApiService.query = newQuery;
    newApiService.fetchArticleCountry().then(makeCountry);

    resetPage();
  }
}

function makeCountriesList(data) {
  refs.countriesList.insertAdjacentHTML('beforeend', countryListTpl(data));
}

function makeCountry(data) {
  refs.countryDiv.insertAdjacentHTML('beforeend', countryTpl(...data));
}

function resetPage() {
  refs.countriesList.innerHTML = '';
  refs.countryDiv.innerHTML = '';
}
