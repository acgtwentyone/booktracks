import React from 'react';
import {BookItemContent, ListItem} from '.';

const BookItem = ({item, isDetail = false, onStarPress, onItemPress}) => {
  return (
    <ListItem
      content={
        <BookItemContent
          onStarPress={onStarPress}
          item={item._data}
          isDetail={isDetail}
          itemId={item.id}
        />
      }
      onItemPress={onItemPress}
    />
  );
};

export default React.memo(BookItem);
