import AbstractView from '../framework/view/abstract-view.js';
import {offers} from '../mock/waypoint.js';
import {humanizeData, humanizeClassData, humanizeTime, humanizeDataFromClass, humanizeDifference} from '../utils.js';

const DIFF_SECOND = 60;
const DIFF_HOUR = 3600;

const createWaypointTemplate = (waypoint) => {
  const {basePrice, dateFrom, dateTo, type} = waypoint;
  const humanDataFrom = humanizeData(dateFrom);
  const humanDataClassFrom = humanizeClassData(dateFrom);
  const humanDataFromClass = humanizeDataFromClass(dateFrom);
  const humanTimeFrom = humanizeTime(dateFrom);
  const humanDataClassTo = humanizeClassData(dateTo);
  const humanTimeTo = humanizeTime(dateTo);
  const differenceDate = humanizeDifference(dateFrom, dateTo);

  const waypointFavorite = () => {
    if (waypoint.isFavorite) {
      return 'event__favorite-btn--active';
    }
  };

  const diffHour = () => {
    const hour = Math.round(differenceDate/DIFF_HOUR);
    if ( hour > 0) {
      const second = differenceDate - (hour * DIFF_HOUR);
      const minute = Math.ceil(second / DIFF_SECOND);
      return `${hour}H ${minute}M`;
    } else {
      const minute = Math.ceil(differenceDate / DIFF_SECOND);
      return `${minute}M`;}
  };

  const waypointTypeOffer = offers.find((offer) => offer.type === type);
  let waypointOffer = [];
  if (waypointTypeOffer) {
    waypointOffer = waypointTypeOffer.offers.map((typeOffer) =>
      waypoint.offers.includes(typeOffer.id) ?
        `<li class="event__offer">
            <span class="event__offer-title">${typeOffer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${typeOffer.price}</span>
         </li>`: '').join('');}

  return (
    `<li class="trip-events__item">
    <div class="event">
    <time class="event__date" datetime="${humanDataFromClass}">${humanDataFrom}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} Amsterdam</h3>
        <div class="event__schedule">
          <p class="event__time">
           <time class="event__start-time" datetime="${humanDataClassFrom}">${humanTimeFrom}</time>
            &mdash;
           <time class="event__end-time" datetime="${humanDataClassTo}">${humanTimeTo}</time>
          </p>
          <p class="event__duration">${diffHour()}</p>
        </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${waypointOffer}
                </ul>
                <button class="event__favorite-btn ${waypointFavorite()}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`
  );};

export default class WaypointView extends AbstractView {
  #waypoint = null;

  constructor(waypoint) {
    super();
    this.#waypoint = waypoint;
  }

  get template() {
    return createWaypointTemplate(this.#waypoint);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.setFavorite = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#setFavoriteClickHandler);
  };

  #setFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.setFavorite();
  };
}
