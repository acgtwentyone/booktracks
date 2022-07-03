import React from 'react';
import {BookItemContent, ListItem} from '.';

const BookItem = ({
  item,
  recent = false,
  onStarPress,
  onItemPress,
  isFavScreen = false,
  limit,
}) => {
  return (
    <ListItem
      content={
        <BookItemContent
          onStarPress={onStarPress}
          item={item._data}
          recent={recent}
        />
      }
      recent={recent}
      onItemPress={onItemPress}
    />
  );
};

export default React.memo(BookItem);
