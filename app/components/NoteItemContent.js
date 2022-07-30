import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import {AppBadge} from '.';
import {limitStr} from '../Utils';

const NoteItemContent = ({item, isDetail = false}) => {
  const {book_name, note, page} = item;

  return (
    <>
      {isDetail ? (
        <VStack>
          <HStack
            w="full"
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <AppBadge mt="2" title={book_name}>
              book
            </AppBadge>
            <AppBadge mt="2" mx="2" title="Page">
              {page}
            </AppBadge>
          </HStack>
          <Text fontSize="lg" fontWeight="bold">
            {note}
          </Text>
        </VStack>
      ) : (
        <VStack>
          <HStack
            w="full"
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <Text fontSize="lg" fontWeight="bold">
              {isDetail ? limitStr(note) : note}
            </Text>
            <AppBadge mt="2" mx="2" title="Page">
              {page}
            </AppBadge>
          </HStack>
          <AppBadge mt="2" title={book_name}>
            book
          </AppBadge>
        </VStack>
      )}
    </>
  );
};

export default React.memo(NoteItemContent);
