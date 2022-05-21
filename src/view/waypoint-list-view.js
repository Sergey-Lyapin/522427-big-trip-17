import {createElement} from '../render.js';

const createWaypointListTemplate = () => ('<ul class="trip-events__list"></ul>');

export default class WaypointListView {
  #element = null;

  get template() {
    return createWaypointListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
