import React from 'react';
import {StyleSheet} from 'react-native';
import {ListBookItems} from '../components';

const FavScreen = () => {
  return <ListBookItems isFavourities={true} subtitle="My Favourities" />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FavScreen;
