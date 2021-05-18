import notices from './pnotify-lib';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchArticleCountry() {
    return fetch(
      `https://restcountries.eu/rest/v2/name/${this.searchQuery}`,
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('', notices.errorEmptyInput());
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
