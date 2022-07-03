import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import {AppBadge} from '.';
import {limitStr} from '../Utils';

const NoteItemContent = ({item, recent = false, limit, detail = false}) => {
  const {book_name, note, page} = item;

  return (
    <>
      {detail ? (
        <VStack>
          <HStack
            w="full"
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <AppBadge title={book_name}>book</AppBadge>
            <AppBadge title="Page">{page}</AppBadge>
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
              {limit ? limitStr(note, limit) : note}
            </Text>
            <AppBadge title="Page">{page}</AppBadge>
          </HStack>
          <AppBadge title={book_name}>book</AppBadge>
        </VStack>
      )}
    </>
  );
};

export default React.memo(NoteItemContent);
