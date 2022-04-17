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
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            books.length === 0 &&
            !loading && (
              <EmptyView
                iconName="cloud-off-outline"
                title={
                  isFavScreen
                    ? 'Não há livros recentes'
                    : 'Não há livros adicionados aos favoritos'
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
          data={pages}
          renderItem={({item}) => <PageItem item={item} recent={true} />}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            pages.length === 0 &&
            !loading && (
              <EmptyView
                iconName="cloud-off-outline"
                title="Não há páginas recentes"
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
