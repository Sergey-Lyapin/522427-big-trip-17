import { remove, render, replace } from '../framework/render.js';
import WaypointView from '../view/waypoint-view.js';
import EditFormView from '../view/edit-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class WaypointPresenter {
  #waypointsContainer = null;
  #waypointComponent = null;
  #editFormComponent = null;
  #changeData = null;
  #changeMode = null;
  #waypoint = null;
  #mode = Mode.DEFAULT;
  constructor(waypointsContainer, changeData, changeMode) {
    this.#waypointsContainer = waypointsContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (waypoint) => {
    this.#waypoint = waypoint;
    const prevWaypointComponent = this.#waypointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#waypointComponent = new WaypointView(waypoint);
    this.#editFormComponent = new EditFormView(waypoint);

    this.#waypointComponent.setEditClickHandler(this.#handleEditClick);
    this.#waypointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editFormComponent.setEditFormClickHandler(this.#handleFormClick);

    if (prevWaypointComponent === null) {
      render(this.#waypointComponent, this.#waypointsContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevWaypointComponent);
    remove(prevEditFormComponent);

  };

  destroy = () => {
    remove(this.#waypointComponent);
    remove(this.#waypointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToWaypoint();
    }
  };

  #replaceWaypointToEditForm = () => {
    replace(this.#editFormComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditFormToWaypoint = () => {
    replace(this.#waypointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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

  #handleFormSubmit = (waypoint) => {
    this.#changeData(waypoint);
    this.#replaceEditFormToWaypoint();
  };

  #handleFormClick = () => {
    this.#replaceEditFormToWaypoint();
  };
}
