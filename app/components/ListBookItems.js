import React from 'react';
import {StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {AppFab, BookItem, ListTitle, Screen, VList} from '.';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
import {useAlertError, useLoadBooks, useShowMessage} from '../hooks';
import {getObjData} from '../data/AsyncStorageUtils';
import {limitStr, ROUTES_NAME, SCREEN_WIDTH} from '../Utils';
import {useNavigation} from '@react-navigation/native';

const ListBookItems = ({isFavourities = false, subtitle}) => {
  const {books, loading, refreshing, _onRefresh} = useLoadBooks(isFavourities);
  const {_alertError} = useAlertError();
  const {_showToastMsg} = useShowMessage();
  const navigation = useNavigation();

  const _onStarPress = ({_data: {title, favourity}, id}) => {
    getObjData('user', e => _alertError()).then(u => {
      firestore()
        .collection('users')
        .doc(u.uid)
        .collection(COLLECTION_NAMES.books)
        .doc(id)
        .update({
          favourity: !favourity,
        })
        .then(() => {
          _showToastMsg(
            `Book "${limitStr(title)}" ${
              favourity ? 'removed from' : 'added to'
            } favourity`,
          );
        })
        .catch(error => _alertError());
    });
  };

  const _onFabPress = () => {
    navigation.navigate(ROUTES_NAME.add_edit_book, {edit: false});
  };

  const _onItemPress = item => {
    navigation.navigate(ROUTES_NAME.book_detail, {
      id: item.id,
    });
  };

  return (
    <Screen style={styles.container}>
      <VList
        onRefresh={_onRefresh}
        refreshing={refreshing}
        data={books}
        renderItem={({item}) => (
          <BookItem
            item={item}
            onStarPress={() => _onStarPress(item)}
            onItemPress={() => _onItemPress(item)}
            isFavScreen={isFavourities}
            limit={SCREEN_WIDTH / 16}
          />
        )}
        ListHeaderComponent={<ListTitle title={subtitle} />}
        loading={loading}
      />
      {!isFavourities && <AppFab onPress={_onFabPress} />}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListBookItems;
