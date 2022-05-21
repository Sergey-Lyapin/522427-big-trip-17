import {createElement} from '../render.js';

const createNoWaypointTemplate = () => ('<p class="trip-events__msg">Click New Event to create your first point</p>');

export default class NoWaypointView {
  #element = null;
  get template() {
    return createNoWaypointTemplate();
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
