import { render } from './framework/render.js';
import FiltersView from './view/filters-view.js';
import WaypointListPresenter from './presenter/waypoint-list-presenter.js';
import WaypointsModel from './model/waypoint-model.js';

const siteTripControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const waypointsModel = new WaypointsModel();
const waypointListPresenter = new WaypointListPresenter();

render(new FiltersView(), siteTripControlsElement);
waypointListPresenter.init(siteTripEventsElement, waypointsModel);
