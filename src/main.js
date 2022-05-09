import {render} from './render.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import WaypointListPresenter from './presenter/waypoint-list-presenter.js';
import WaypointsModel from './model/waypoint-model.js';

const siteTripControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const waypointsModel = new WaypointsModel();
const waypointListPresenter = new WaypointListPresenter();

render(new FiltersView(), siteTripControlsElement);
render(new SortingView(), siteTripEventsElement);
waypointListPresenter.init(siteTripEventsElement, waypointsModel);
