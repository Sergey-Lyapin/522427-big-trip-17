import { getRandomInteger } from '../utils.js';
import { FilterType } from './const.js';

export const generateFilter = () => Object.entries(FilterType).map(
  ([filterName]) => ({
    name: filterName,
    count: getRandomInteger(0, 10),
  }),
);
