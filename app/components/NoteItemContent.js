import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import {AppBadge} from '.';
import {limitStr} from '../Utils';

const NoteItemContent = ({item, isDetail = false}) => {
  const {book_name, note, page} = item;

  return (
    <>
      <HStack
        w="full"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        {!isDetail ? (
          <>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">
                {limitStr(note)}
              </Text>
              <AppBadge mt="6" title={limitStr(book_name)}>
                book
              </AppBadge>
            </VStack>
            {undefined !== page && (
              <AppBadge mt="6" title="Page">
                {page}
              </AppBadge>
            )}
          </>
        ) : (
          <VStack>
            <Text fontSize="lg" fontWeight="bold">
              {note}
            </Text>
            <AppBadge mt="6" title={book_name}>
              book
            </AppBadge>
            {undefined !== page && (
              <AppBadge mt="6" title="Page">
                {page}
              </AppBadge>
            )}
          </VStack>
        )}
      </HStack>
    </>
  );
};

export default React.memo(NoteItemContent);
