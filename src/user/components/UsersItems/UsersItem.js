import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../../shared/components/UIElements/Card/Card';
import Avatar from '../../../shared/components/UIElements/Avatar/Avatar';
import { REACT_APP_ASSETS_URL } from '../../../config/config';
import './UsersItem.scss';

const UsersItem = ({ id, image, name, placeCount }) => (
  <li className="user-item">
    <Card className="user-item__content">
      <Link to={`/${id}/places`}>
        <div className="user-item__image">
          <Avatar image={`${REACT_APP_ASSETS_URL}/${image}`} alt={name} />
        </div>
        <div className="user-item__info">
          <h2>{name}</h2>
          <h3>
            {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
          </h3>
        </div>
      </Link>
    </Card>
  </li>
);

export default UsersItem;
