import React from 'react';
import {ListBookItems} from '../components';

const FavScreen = () => {
  return <ListBookItems isFavourities={true} subtitle="My Favourities" />;
};

export default FavScreen;
