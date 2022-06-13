import {getRandomInteger} from '../utils.js';
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
const generateOfferType = () => {
  const offersWaypointType = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
  const randomIndex = getRandomInteger(0, offersWaypointType.length-1);
  return offersWaypointType[randomIndex];
};
const destination = {
  description: generateDescription(),
  name: 'Chmonix',
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10)}`,
      description: generateDescription()
    }
  ]
};
const offers = [
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
];
const generateWaypoint = () => ({
  id: nanoid(),
  basePrice: getRandomInteger(0, 300),
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: destination,
  isFavorite: false,
  offers: [1, 2],
  type: generateOfferType(),
});

export {generateWaypoint, offers};
