import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList/PlaceList';
import { PLACES_LIST } from '../../dummy/dummy';

const UserPlaces = () => {
  const { userId } = useParams();
  const loadedPlaces = PLACES_LIST.filter(place => {
    return place.creator === userId;
  });
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
