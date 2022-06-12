import { render, replace } from '../framework/render.js';
import WaypointView from '../view/waypoint-view.js';
import EditFormView from '../view/edit-form-view.js';

export default class WaypointPresenter {
  #waypointsContainer = null;
  #waypointComponent = null;
  #editFormComponent = null;
  #waypoint = null;
  
  constructor(waypointsContainer) {
    this.#waypointsContainer = waypointsContainer;
  }
    

  init = (waypoint) => {
    this.#waypoint = waypoint;

    this.#waypointComponent = new WaypointView(waypoint);
    this.#editFormComponent = new EditFormView(waypoint);

    this.#waypointComponent.setEditClickHandler(this.#handleEditClick);
    this.#editFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editFormComponent.setEditFormClickHandler(this.#handleFormClick);

    render(this.#waypointComponent, this.#waypointsContainer);
  };

  #replaceWaypointToEditForm = () => {
    replace(this.#editFormComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceEditFormToWaypoint = () => {
    replace(this.#waypointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditFormToWaypoint();
    }
  };

  #handleEditClick = () => {
    this.#replaceWaypointToEditForm();
  };
  #handleFormSubmit = () => {
    this.#replaceEditFormToWaypoint();
  };
  #handleFormClick = () => {
    this.#replaceEditFormToWaypoint();
  };
}