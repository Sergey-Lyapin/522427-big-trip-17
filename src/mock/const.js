const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const WaypointType = {
  TRAIN: 'train',
  TAXI: 'taxi',
  BUS: 'bus',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTARAUNT: 'restaraunt',
};

const SortingType = {
  DEFAULT: 'default',
  PRICE_DOWN: 'price-down',
  TIME_DOWN: 'time-down',
};

const EMPTY_POINT = {
  basePrice: 200,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: {
    description: ' ',
    name: ' ',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0972568065067317',
        description: ' '
      }
    ]
  },
  type: 'train',
  offers: []
};

export { FilterType, SortingType, EMPTY_POINT, WaypointType };
