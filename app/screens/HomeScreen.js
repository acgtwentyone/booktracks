import React from 'react';
import {Box, FlatList} from 'native-base';
import {
  AppActivityIndicator,
  BookItem,
  EmptyView,
  ListTitle,
  PageItem,
  Screen,
} from '../components';
import {useLoadBooks, useLoadPages} from '../hooks';

const HomeScreen = () => {
  const emptyStyle = (data, loading) => {
    return data.length === 0 && !loading
      ? {
          flex: 1,
          justifyContent: 'center',
        }
      : {};
  };

  const RecentBooks = ({isFavScreen, title}) => {
    const {books, loading} = useLoadBooks(isFavScreen);
    return (
      <Box pb={4}>
        {<ListTitle title={title} />}
        {(!books || books.length === 0) && loading && <AppActivityIndicator />}
        <FlatList
          px={2}
          data={books}
          renderItem={({item}) => (
            <BookItem item={item} isFavScreen={isFavScreen} recent={true} />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={emptyStyle(books, loading)}
          ListHeaderComponent={
            books.length === 0 &&
            !loading && (
              <EmptyView
                iconName="cloud-off-outline"
                title={
                  isFavScreen
                    ? 'There is no favourities books.'
                    : 'There is no books.'
                }
              />
            )
          }
        />
      </Box>
    );
  };

  const RecentPages = () => {
    const {pages, loading} = useLoadPages();
    return (
      <Box pb={4}>
        {<ListTitle title="Recent pages" />}
        {(!pages || pages.length === 0) && loading && <AppActivityIndicator />}
        <FlatList
          px={2}
          data={pages}
          renderItem={({item}) => <PageItem item={item} recent={true} />}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={emptyStyle(pages, loading)}
          ListHeaderComponent={
            pages.length === 0 &&
            !loading && (
              <EmptyView
                iconName="cloud-off-outline"
                title="There is no pages."
              />
            )
          }
        />
      </Box>
    );
  };

  return (
    <Screen>
      <FlatList
        ListHeaderComponent={
          <>
            <RecentBooks title="Recent books" isFavScreen={false} />
            <RecentPages />
            <RecentBooks title="Recent favourities books" isFavScreen={true} />
          </>
        }
        keyExtractor={item => item.toString()}
      />
    </Screen>
  );
};

export default HomeScreen;
