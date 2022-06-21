import {getRandomInteger} from '../utils.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const generateDescription = () => {
  const descriptions = [
    'The pen is mightier than the sword.',
    'When in Rome, do as the Romans.',
    'The squeaky wheel gets the grease.',
    'People who live in glass houses should not throw stones.',
    'If you can not beat them, join them.',
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const generateDestinationName = () => {
  const names = [
    'Amsterdam',
    'Geneva',
    'Chamonix',
  ];
  const randomIndex = getRandomInteger(0, names.length - 1);
  return names[randomIndex];
};
const generateOfferType = () => {
  const offersWaypointType = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
  const randomIndex = getRandomInteger(0, offersWaypointType.length-1);
  return offersWaypointType[randomIndex];
};
const generateDate = (dayBegin, dayEnd) => {
  const daysGap = getRandomInteger(dayBegin, dayEnd);
  const hoursGap = getRandomInteger(0, 24);
  const minutesGap = getRandomInteger(0, 60);
  const secondsGap = getRandomInteger(0, 60);

  return dayjs().add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute').add(secondsGap, 'second').toDate();
};

const generateDestination = () => ({
    description: generateDescription(),
    name: generateDestinationName(),
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 100)}`,
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 100)}`,
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 100)}`,
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 100)}`,
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 100)}`,
      }
    ]
  });

const generateOffers = () => [
    {
      type: generateOfferType(),
      offers: [
        {
          id: 1,
          title: 'Upgrade to a business class',
          price: 125
        }, {
          id: 2,
          title: 'Choose the radio station',
          price: 65
        } ]
    },
    {
      type: generateOfferType(),
      offers: [
        {
          id: 1,
          title: 'Upgrade to a business class',
          price: 120
        }, {
          id: 2,
          title: 'Choose the radio station',
          price: 60
        } ]
    },
    {
      type: generateOfferType(),
      offers: [
        {
          id: 1,
          title: 'Upgrade to a business class',
          price: 130
        }, {
          id: 2,
          title: 'Choose the radio station',
          price: 70
        } ]
    },
  ];

const offers = generateOffers();

const generateWaypoint = () => ({
  id: nanoid(),
  basePrice: getRandomInteger(0, 300),
  dateFrom: generateDate(0, 2),
  dateTo: generateDate(3, 5),
  destination: generateDestination(),
  isFavorite: false,
  offers: [1, 2, 3],
  type: generateOfferType(),
});

export {generateWaypoint, offers};
