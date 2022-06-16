import { render } from '../framework/render.js';
import WaypointListView from '../view/waypoint-list-view.js';
import NoWaypointView from '../view/no-waypoint-view.js';
import SortingView from '../view/sorting-view.js';
import WaypointPresenter from './waypoint-presenter.js';
import { updateItem, sortingDefault, sortingWaypointTime, sortingWaypointPrice } from '../utils.js';
import { SortingType } from '../mock/const.js';

export default class WaypointListPresenter {
  #waypointListContainer = null;
  #waypointsModel = null;
  #waypointListWaypoints = [];
  #waypointListComponent = new WaypointListView();
  #sortingComponent = new SortingView();
  #noWaypointsComponent = new NoWaypointView();
  #waypointPresenter = new Map();
  #currentSortingType = null;

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

  #handleModeChange = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleWaypointChange = (updatedWaypoint) => {
    this.#waypointListWaypoints = updateItem(this.#waypointListWaypoints, updatedWaypoint);
    this.#waypointPresenter.get(updatedWaypoint.id).init(updatedWaypoint);
  };

  #sortingWaypoints = (sortingType) => {
    switch (sortingType) {
      case SortingType.PRICE_DOWN:
        this.#waypointListWaypoints.sort(sortingWaypointPrice);
        break;
      case SortingType.TIME_DOWN:
        this.#waypointListWaypoints.sort(sortingWaypointTime);
        break;
      case SortingType.DEFAULT:
        this.#waypointListWaypoints.sort(sortingDefault);
        break;
      default:
        this.#waypointListWaypoints.sort(sortingDefault);
    }

    this.#currentSortingType = sortingType;
  };

  #handleSortingTypeChange = (sortingType) => {
    if (this.#currentSortingType === sortingType) {
      return;
    }
    this.#sortingWaypoints(sortingType);
    this.#clearWaypointList();
    this.#renderWaypointList();
  };

  #clearWaypointList = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();
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
    this.#sortingComponent.setSortingTypeChangeHandler(this.#handleSortingTypeChange);
  };

  #renderWaypoints = () => {
    if(this.#currentSortingType === null){
      this.#waypointListWaypoints.sort(sortingDefault);
    }
    this.#waypointListWaypoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
  };

  #renderWaypoint = (waypoint) => {
    const waypointPresenter = new WaypointPresenter(this.#waypointListComponent.element, this.#handleWaypointChange, this.#handleModeChange);
    waypointPresenter.init(waypoint);
    this.#waypointPresenter.set(waypoint.id, waypointPresenter);
  };
}
