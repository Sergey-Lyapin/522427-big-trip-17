import { render } from '../framework/render.js';
import WaypointListView from '../view/waypoint-list-view.js';
import NoWaypointView from '../view/no-waypoint-view.js';
import SortingView from '../view/sorting-view.js';
import WaypointPresenter from './waypoint-presenter.js';
import { updateItem } from '../utils.js';

export default class WaypointListPresenter {
  #waypointListContainer = null;
  #waypointsModel = null;
  #waypointListWaypoints = [];
  #waypointListComponent = new WaypointListView();
  #sortingComponent = new SortingView();
  #noWaypointsComponent = new NoWaypointView();
  #waypointPresenter = new Map();

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

  #handleWaypointChange = (updatedWaypoint) => {
    this.#waypointListWaypoints = updateItem(this.#waypointListWaypoints, updatedWaypoint);
    this.#waypointPresenter.get(updatedWaypoint.id).init(updatedWaypoint);
  };

  #renderNoWaypoints = () => {
    render(this.#noWaypointsComponent, this.#waypointListContainer);
  };

  #renderWaypointList = () => {
    render(this.#waypointListComponent, this.#waypointListContainer);
    this.#renderWaypoints();
  };

  #renderSorting = () => {
    render (this.#sortingComponent, this.#waypointListContainer);
  };

  #renderWaypoints = () => {
    this.#waypointListWaypoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
  };

  #renderWaypoint = (waypoint) => {
    const waypointPresenter = new WaypointPresenter(this.#waypointListComponent.element, this.#handleWaypointChange);
    waypointPresenter.init(waypoint);
    this.#waypointPresenter.set(waypoint.id, waypointPresenter);
  };
}
