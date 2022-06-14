import dayjs from 'dayjs';

const humanizeData = (waypointData) => dayjs(waypointData).format('MMM D');
const humanizeClassData = (waypointData) => dayjs(waypointData).format('YYYY-MM-DDTHH:mm');
const humanizeTime = (waypointData) => dayjs(waypointData).format('HH:mm');
const humanizeDataFromClass = (waypointData) => dayjs(waypointData).format('YYYY-MM-DD');
const humanizeDifference = (date1, date2) => dayjs(date2).diff(dayjs(date1), 'second');
const humanizeDateAddWaypoint = (waypointData) => dayjs(waypointData).format('DD/MM/YY HH:mm');
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {getRandomInteger, humanizeData, humanizeClassData, humanizeTime, humanizeDataFromClass, humanizeDifference, humanizeDateAddWaypoint, updateItem};
