import React from 'react';
import {StyleSheet} from 'react-native';
import {ListBooks} from '../components';

const FavScreen = () => {
  return <ListBooks isFavourities={true} subtitle="My Favourities" />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FavScreen;
