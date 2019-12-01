import React from 'react';
import { Link } from 'react-router-dom';

import MainHeader from '../MainHeader/MainHeader';
import NavLinks from '../NavLinks/NavLinks';
import './MainNavigation.scss';

const MainNavigation = () => (
  <MainHeader>
    <button className="main-navigation__menu-btn">
      <span />
      <span />
      <span />
    </button>
    <h1 className="main-navigation__title">
      <Link to="/">Your Places</Link>
    </h1>
    <nav>
      <NavLinks />
    </nav>
  </MainHeader>
);

export default MainNavigation;
