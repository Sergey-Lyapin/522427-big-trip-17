import WaypointListView from '../view/waypoint-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import {render} from '../render.js';

export default class WaypointListPresenter {
  #waypointListContainer = null;
  #waypointsModel = null;
  #waypointListWaypoints = [];
  #waypointListComponent = new WaypointListView();
  init = (waypointListContainer, waypointsModel) => {
    this.#waypointListContainer = waypointListContainer;
    this.#waypointsModel = waypointsModel;
    this.#waypointListWaypoints = [...this.#waypointsModel.waypoints];
    render(this.#waypointListComponent, this.#waypointListContainer);
    render(new EditFormView(this.#waypointListWaypoints[0]), this.#waypointListComponent.element);
    for (let i = 0; i < this.#waypointListWaypoints.length; i++) {
      render(new WaypointView(this.#waypointListWaypoints[i]), this.#waypointListComponent.element);
    }
  };
}
