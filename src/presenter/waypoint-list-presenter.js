import WaypointListView from '../view/waypoint-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import NoWaypointView from '../view/no-waypoint-view.js';
import SortingView from '../view/sorting-view.js';
import {render} from '../render.js';

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
      this.#waypointListComponent.element.replaceChild(editFormComponent.element, waypointComponent.element);
    };
    const replaceEditFormToWaypoint = () => {
      this.#waypointListComponent.element.replaceChild(waypointComponent.element, editFormComponent.element);
    };
    waypointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceWaypointToEditForm();
    });
    editFormComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToWaypoint();
    });
    editFormComponent.element.querySelector('form').addEventListener('keydown', (evt) => {
      if (evt.code === 'Escape')
      {
        evt.preventDefault();
        replaceEditFormToWaypoint();
      }
    });
    editFormComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditFormToWaypoint();
    });
    render(waypointComponent, this.#waypointListComponent.element);
  };
}
