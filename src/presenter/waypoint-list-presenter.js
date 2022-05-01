import WaypointListView from '../view/waypoint-list-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import {render} from '../render.js';

export default class WaypointListPresenter {
    waypointListComponent = new WaypointListView();
  
    init = (waypointListContainer) => {

      this.waypointListContainer = waypointListContainer;
  
      render(this.waypointListComponent, this.waypointListContainer);
      render(new EditFormView(), this.waypointListComponent.getElement());
  
      for (let i = 0; i < 3; i++) {
        render(new WaypointView(), this.waypointListComponent.getElement());
      }
    };
  }