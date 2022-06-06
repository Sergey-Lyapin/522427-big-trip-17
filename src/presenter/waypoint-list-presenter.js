import { render, replace } from '../framework/render.js';
import WaypointListView from '../view/waypoint-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import NoWaypointView from '../view/no-waypoint-view.js';
import SortingView from '../view/sorting-view.js';

export default class WaypointListPresenter {
  #waypointListContainer = null;
  #waypointsModel = null;
  #waypointListWaypoints = [];
  #waypointListComponent = new WaypointListView();
  #sortingComponent = new SortingView();
  init = (waypointListContainer, waypointsModel) => {
    this.#waypointListContainer = waypointListContainer;
    this.#waypointsModel = waypointsModel;
    this.#waypointListWaypoints = [...this.#waypointsModel.waypoints];
    if(this.#waypointListWaypoints.length === 0){
      render(new NoWaypointView(), this.#waypointListContainer);
    } else{
      render (this.#sortingComponent, this.#waypointListContainer);
      render(this.#waypointListComponent, this.#waypointListContainer);
      for (let i = 0; i < this.#waypointListWaypoints.length; i++) {
        this.#renderWaypoint(this.#waypointListWaypoints[i]);
      }
    }
  };

  #renderWaypoint = (waypoint) => {
    const waypointComponent = new WaypointView(waypoint);
    const editFormComponent = new EditFormView(waypoint);

    const replaceWaypointToEditForm = () => {
      replace(editFormComponent, waypointComponent);
    };
    const replaceEditFormToWaypoint = () => {
      replace(waypointComponent, editFormComponent);
    };
    waypointComponent.setEditClickHandler(() => {
      replaceWaypointToEditForm();
    });
    editFormComponent.setFormSubmitHandler(() => {
      replaceEditFormToWaypoint();
    });
    editFormComponent.setEditEscHandler(() => {
      replaceEditFormToWaypoint();
    });
    editFormComponent.setEditFormClickHandler(() => {
      replaceEditFormToWaypoint();
    });
    render(waypointComponent, this.#waypointListComponent.element);
  };
}
