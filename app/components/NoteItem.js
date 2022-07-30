import React from 'react';
import {ListItem} from '.';
import NoteItemContent from './NoteItemContent';

const NoteItem = ({item, isDetail = false, onItemPress}) => {
  return (
    <ListItem
      content={<NoteItemContent isDetail={isDetail} item={item._data} />}
      onItemPress={onItemPress}
    />
  );
};

export default React.memo(NoteItem);
