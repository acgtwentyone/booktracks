import React from 'react';
import {StyleSheet} from 'react-native';

import {BookItem, ListTitle, Screen, VList} from '../components';

const favourities = require('../dummy/favourities.json');

const FavScreen = () => {
  return (
    <Screen style={styles.container}>
      <VList
        data={favourities}
        renderItem={({item: {title, author, favourity}}) => (
          <BookItem
            name={title}
            author={author}
            favourity={favourity}
            showFavIcon={false}
            showEdit={false}
          />
        )}
        ListHeaderComponent={<ListTitle title="Favourities Books" />}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FavScreen;
