import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {AppFab, NoteItem, ListTitle, Screen, VList} from '.';
import {useLoadNotes} from '../hooks';
import {ROUTES_NAME, SCREEN_WIDTH} from '../Utils';

const ListNoteItems = () => {
  const {notes, loading, refreshing, _onRefresh} = useLoadNotes();
  const navigation = useNavigation();

  const _onFabPress = () => {
    navigation.navigate(ROUTES_NAME.add_edit_note, {edit: false});
  };

  const _onItemPress = item => {
    navigation.navigate(ROUTES_NAME.note_detail, {
      id: item.id,
      book_id: item._data.book_id,
    });
  };

  return (
    <Screen style={styles.container}>
      <VList
        mt="4"
        onRefresh={_onRefresh}
        refreshing={refreshing}
        data={notes}
        renderItem={({item}) => (
          <NoteItem
            item={item}
            onItemPress={() => _onItemPress(item)}
            limit={SCREEN_WIDTH / 16}
          />
        )}
        loading={loading}
      />
      <AppFab onPress={() => _onFabPress()} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ListNoteItems);
