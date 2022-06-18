import React from 'react';
import {Box, FlatList, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useLoadBooks} from '../hooks';
import AppActivityIndicator from './AppActivityIndicator';
import ListTitle from './ListTitle';

const SelectBookOptions = ({selectedBook, setSelectedBook}) => {
  const {books, loading, refreshing} = useLoadBooks(false);

  const BookItem = ({item}) => {
    return undefined !== item && item !== null ? (
      <TouchableOpacity onPress={() => setSelectedBook(item)}>
        <Box
          p={5}
          m={2}
          _dark={
            undefined !== selectedBook &&
            selectedBook !== null &&
            selectedBook.id === item.id
              ? {background: 'coolGray.600'}
              : {background: 'coolGray.900'}
          }
          _light={
            undefined !== selectedBook &&
            selectedBook !== null &&
            selectedBook.id === item.id
              ? {background: 'coolGray.200'}
              : {background: 'coolGray.500'}
          }
          flexDirection="column"
          alignItems="center">
          <Text fontWeight="bold" fontSize="lg">
            {item._data.author.length > 12
              ? `${item._data.author.substring(0, 11)}...`
              : item._data.author}
          </Text>
          <Text fontSize="md">
            {item._data.title.length > 16
              ? `${item._data.title.substring(0, 15)}...`
              : item._data.title}
          </Text>
        </Box>
      </TouchableOpacity>
    ) : (
      <></>
    );
  };

  if (loading) {
    return <AppActivityIndicator />;
  }

  return books.length > 0 ? (
    <Box flexDirection="column" m={2}>
      <ListTitle title="Select a book" />
      <FlatList
        horizontal
        refreshing={refreshing}
        data={books}
        renderItem={({item}) => <BookItem item={item} />}
        showsHorizontalScrollIndicator={false}
      />
      <Text px={2} mt={6} mb={2} fontSize="md">
        Please fill the note details (Optional)
      </Text>
    </Box>
  ) : (
    <Box
      flexDirection="column"
      p={0}
      justifyContent="center"
      alignItems="center">
      <ListTitle title="Ainda não tens livros registrados. Registre um novo livro antes de proceder" />
    </Box>
  );
};

export default SelectBookOptions;
