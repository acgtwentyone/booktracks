import React from 'react';
import {ListItem} from '.';
import NoteItemContent from './NoteItemContent';

const NoteItem = ({item, recent = false, onItemPress, limit}) => {
  return (
    <ListItem
      content={
        <NoteItemContent recent={recent} limit={limit} item={item._data} />
      }
      recent={recent}
      onItemPress={onItemPress}
    />
  );
};

export default React.memo(NoteItem);

