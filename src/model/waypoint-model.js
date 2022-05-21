import {generateWaypoint} from '../mock/waypoint.js';

export default class WaypointsModel {
  #waypoints = Array.from({length: 0}, generateWaypoint);
  get waypoints() {
    return this.#waypoints;
  }
}
