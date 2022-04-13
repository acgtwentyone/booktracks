import React from 'react';
import {FlatList} from 'native-base';
import {BookItem, ListTitle, Screen} from '../components';
import useLoadBooks from '../hooks/useLoadBooks';

const HomeScreen = () => {
  const RecentBooks = ({isFavScreen, title}) => {
    const {books} = useLoadBooks(isFavScreen);
    return (
      <>
        <ListTitle title={title} />
        <FlatList
          data={books}
          renderItem={({item}) => (
            <BookItem item={item} isFavScreen={isFavScreen} recent={true} />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
        />
      </>
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
