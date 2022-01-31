import React from 'react';
import {StyleSheet} from 'react-native';
import ListItem from './ListItem';

const BookItem = ({
  style,
  props,
  name,
  author,
  favourity,
  showFavIcon = true,
  showEdit = true,
  recent = false,
  onEditPress,
  onStarPress,
  onDotPress,
}) => {
  return (
    <ListItem
      title={name}
      subtitle={author}
      favourity={favourity}
      style={[styles.container, {...style}]}
      showFavIcon={showFavIcon}
      showEdit={showEdit}
      {...props}
      recent={recent}
      onDotPress={onDotPress}
      onEditPress={onEditPress}
      onStarPress={onStarPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default BookItem;
