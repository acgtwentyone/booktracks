import React from 'react';
import {Box, FlatList, Icon, Text} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppActivityIndicator, BookItem, ListTitle, Screen} from '../components';
import {useLoadBooks} from '../hooks';

const HomeScreen = () => {
  const EmptyView = () => (
    <Box p={5} alignItems="center" flex={1}>
      <Icon as={MaterialCommunityIcons} name="database-search" size={16} />
      <Text m={2}>Não há registros ...</Text>
    </Box>
  );

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
