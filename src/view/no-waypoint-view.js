import AbstractView from '../framework/view/abstract-view.js';

const createNoWaypointTemplate = () => ('<p class="trip-events__msg">Click New Event to create your first point</p>');

export default class NoWaypointView extends AbstractView {
  get template() {
    return createNoWaypointTemplate();
  }
}
