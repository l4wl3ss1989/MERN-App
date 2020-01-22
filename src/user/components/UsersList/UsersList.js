import React from 'react';

import UsersItem from '../UsersItems/UsersItem';
import Card from '../../../shared/components/UIElements/Card/Card';
import './UsersList.scss';

const UsersList = ({ items }) => {
  if (items.length === 0)
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );

  return (
    <ul className="users-list">
      {items.map(user => {
        const { id, image, name, places } = user;
        return <UsersItem key={id} id={id} image={image} name={name} placeCount={places.length} />;
      })}
    </ul>
  );
};

export default UsersList;
