import React from 'react';
import {StyleSheet} from 'react-native';
import {ListBookItems} from '../components';

const BooksScreen = () => {
  return <ListBookItems subtitle="My Books" />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BooksScreen;
