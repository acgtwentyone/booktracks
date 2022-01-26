import {Box, FlatList, ScrollView} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

import {BookItem, ListTitle, PageItem, Screen} from '../components';
const books = require('../dummy/books.json');
const favourities = require('../dummy/favourities.json');
const pages = require('../dummy/pages.json');

const HomeScreen = () => {
  const HList = ({data, renderItem}) => (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );

  const RecentBook = ({data, title, props}) => (
    <Box {...props}>
      <ListTitle title={`Recent ${title}`} />
      <HList
        data={data}
        renderItem={({item}) => (
          <BookItem name={item.title} author={item.author} recent={true} />
        )}
      />
    </Box>
  );

  const RecentPage = ({props}) => (
    <Box {...props}>
      <ListTitle title="Recent Pages" />
      <HList
        data={pages}
        renderItem={({item}) => (
          <PageItem page={`Page ${item.page}`} book={item.book} recent={true} />
        )}
      />
    </Box>
  );

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <RecentBook data={books} title="books" />
        <RecentPage props={{mt: 4}} />
        <RecentBook
          data={favourities}
          title="favourities"
          props={{mt: 4, mb: 8}}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
