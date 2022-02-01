import React from 'react';
import {StyleSheet} from 'react-native';
import {ListBooks} from '../components';

const BooksScreen = () => {
  return <ListBooks subtitle="My Books" />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BooksScreen;
