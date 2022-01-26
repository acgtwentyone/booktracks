import React from 'react';
import {StyleSheet} from 'react-native';

import {AppFab, ListTitle, PageItem, Screen, VList} from '../components';

const pages = require('../dummy/pages.json');

const PagesScreen = () => {
  return (
    <Screen style={styles.container}>
      <VList
        data={pages}
        renderItem={({item: {page, book}}) => (
          <PageItem page={`Page ${page}`} book={book} />
        )}
        ListHeaderComponent={<ListTitle title="Registered pages" />}
      />
      <AppFab label="Page" />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PagesScreen;
