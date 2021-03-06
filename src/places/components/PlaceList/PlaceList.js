import React from 'react';

import Card from '../../../shared/components/UIElements/Card/Card';
import PlaceItem from '../PlaceItem/PlaceItem';
import Buttton from '../../../shared/components/FromElements/Button/Button';
import './PlaceList.scss';

const PlaceList = ({ items, onDeletePlace }) => {
  if (items.length === 0)
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maby create one?</h2>
          <Buttton to="/places/new">Share Place</Buttton>
        </Card>
      </div>
    );

  return (
    <ul className="place-list">
      {items.map(item => {
        const { id, image, title, description, address, creator, location } = item;
        return (
          <PlaceItem
            key={id}
            id={id}
            image={image}
            title={title}
            description={description}
            address={address}
            creatorId={creator}
            coordinates={location}
            onDelete={onDeletePlace}
          />
        );
      })}
    </ul>
  );
};

export default PlaceList;
