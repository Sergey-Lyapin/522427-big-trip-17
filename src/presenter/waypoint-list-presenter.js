import { render } from '../framework/render.js';
import WaypointListView from '../view/waypoint-list-view.js';
import NoWaypointView from '../view/no-waypoint-view.js';
import SortingView from '../view/sorting-view.js';
import WaypointPresenter from './waypoint-presenter.js';

export default class WaypointListPresenter {
  #waypointListContainer = null;
  #waypointsModel = null;
  #waypointListWaypoints = [];
  #waypointListComponent = new WaypointListView();
  #sortingComponent = new SortingView();
  #noWaypointsComponent = new NoWaypointView();

  constructor(waypointListContainer, waypointsModel) {
    this.#waypointListContainer = waypointListContainer;
    this.#waypointsModel = waypointsModel;
  }

  init = (waypointListContainer, waypointsModel) => {
    this.#waypointListContainer = waypointListContainer;
    this.#waypointsModel = waypointsModel;
    this.#waypointListWaypoints = [...this.#waypointsModel.waypoints];
    if(this.#waypointListWaypoints.length === 0){
      this.#renderNoWaypoints();
    } else{
      this.#renderSorting();
      this.#renderWaypointList();
    }
  };

  #renderNoWaypoints = () => {
    render(this.#noWaypointsComponent, this.#waypointListContainer);
  }

  #renderWaypointList = () => {
    render(this.#waypointListComponent, this.#waypointListContainer);
    for (let i = 0; i < this.#waypointListWaypoints.length; i++) {
      this.#renderWaypoint(this.#waypointListWaypoints[i]);
    }
  }

  #renderSorting = () => {
    render (this.#sortingComponent, this.#waypointListContainer);
  }

  #renderWaypoint = (waypoint) => {
    const waypointPresenter = new WaypointPresenter(this.#waypointListComponent.element);
    waypointPresenter.init(waypoint);
  };
}
