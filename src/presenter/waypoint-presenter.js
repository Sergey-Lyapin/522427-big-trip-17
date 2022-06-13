import { render, replace } from '../framework/render.js';
import WaypointView from '../view/waypoint-view.js';
import EditFormView from '../view/edit-form-view.js';

export default class WaypointPresenter {
  #waypointsContainer = null;
  #waypointComponent = null;
  #editFormComponent = null;
  #changeData = null;
  #waypoint = null;
  constructor(waypointsContainer, changeData) {
    this.#waypointsContainer = waypointsContainer;
    this.#changeData = changeData;
  }
  
  init = (waypoint) => {
    this.#waypoint = waypoint;

    const prevWaypointComponent = this.#waypointComponent;

    this.#waypointComponent = new WaypointView(waypoint);
    this.#editFormComponent = new EditFormView(waypoint);

    this.#waypointComponent.setEditClickHandler(this.#handleEditClick);
    this.#waypointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editFormComponent.setEditFormClickHandler(this.#handleFormClick);

    if (prevWaypointComponent === null) {
      render(this.#waypointComponent, this.#waypointsContainer);
    }

    if (this.#waypointsContainer.contains(prevWaypointComponent.element)) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }


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

  #handleFavoriteClick = () => {
    this.#changeData({...this.#waypoint, isFavorite: !this.#waypoint.isFavorite});
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
