import AbstractView from '../framework/view/abstract-view.js';

const createFiltersItemTemplate = (filter) => {
  const {name} = filter;
  return (`<div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}">
  <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
</div>`);
};

const createFiltersTemplate = (filters)=> {
  const AllFilters = filters.map((filter) => createFiltersItemTemplate(filter)).join('');
  return ( `<form class="trip-filters" action="#" method="get">
  ${AllFilters}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor(filters){
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
