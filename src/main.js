import { render } from './framework/render.js';
import FiltersView from './view/filters-view.js';
import WaypointListPresenter from './presenter/waypoint-list-presenter.js';
import WaypointsModel from './model/waypoint-model.js';
import { generateFilter } from './mock/filter.js';

const siteTripControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const waypointsModel = new WaypointsModel();
const waypointListPresenter = new WaypointListPresenter();
const filters = generateFilter();

render(new FiltersView(filters), siteTripControlsElement);
waypointListPresenter.init(siteTripEventsElement, waypointsModel);
