import React from 'react';
import {Box, FlatList} from 'native-base';
import {
  AppActivityIndicator,
  BookItem,
  EmptyView,
  ListTitle,
  Screen,
} from '../components';
import {useLoadBooks} from '../hooks';

const HomeScreen = () => {
  const RecentBooks = ({isFavScreen, title}) => {
    const {books, loading} = useLoadBooks(isFavScreen);
    return (
      <Box pb={4}>
        {<ListTitle title={title} />}
        {(!books || books.length === 0) && loading && <AppActivityIndicator />}
        <FlatList
          data={books}
          renderItem={({item}) => (
            <BookItem item={item} isFavScreen={isFavScreen} recent={true} />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          ListHeaderComponent={books.length === 0 && !loading && <EmptyView />}
        />
      </Box>
    );
  };

  return (
    <Screen>
      <RecentBooks title="Recent books" isFavScreen={false} />
      <RecentBooks title="Recent favourities books" isFavScreen={true} />
    </Screen>
  );
};

export default HomeScreen;
