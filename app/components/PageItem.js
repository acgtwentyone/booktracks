import React from 'react';
import {StyleSheet} from 'react-native';
import ListItem from './ListItem';

const PageItem = ({style, props, page, book, recent = false}) => {
  return (
    <ListItem
      title={page}
      subtitle={book}
      style={[styles.container, {...style}]}
      {...props}
      showFavIcon={false}
      recent={recent}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PageItem;
