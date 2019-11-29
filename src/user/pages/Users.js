import React from 'react';

import UsersList from '../components/UsersList/UsersList';
import { USERS_LIST } from '../../dummy/dummy';

const Users = () => <UsersList items={USERS_LIST} />;

export default Users;
