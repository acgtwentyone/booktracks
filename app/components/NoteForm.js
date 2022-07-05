import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  Button,
  FormControl,
  HStack,
  Stack,
  Text,
  useDisclose,
} from 'native-base';

import {ActionSheet, AppInput, AppTextArea, SelectBookOptions} from './';
import {useErrorColor} from '../hooks';

const ACTION_SHEET_TYPES = {
  select_book: 'SELECT_BOOK',
};

const NoteForm = ({control, errors, selectedBook, setSelectedBook}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const {errorColor} = useErrorColor();
  const [actionSheetType, setActionSheetType] = useState(null);

  const ErrorMessage = ({name}) => (
    <>
      {errors && errors[name] && (
        <Text fontSize="md" mx={4} my={2} color={errorColor}>
          {errors[name]?.message}
        </Text>
      )}
    </>
  );

  const __onSelectBookPress = () => {
    setActionSheetType(ACTION_SHEET_TYPES.select_book);
    onOpen();
  };

  return (
    <FormControl>
      <HStack
        p={4}
        w="full"
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <Text fontSize="md">Select a book (required)</Text>
        <Button onPress={() => __onSelectBookPress()}>SELECT</Button>
      </HStack>
      <Stack>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              label="Page (optional)"
              showLabel={true}
              variant="underlined"
              inputW="1/4"
            />
          )}
          name="page"
        />
        <ErrorMessage name="page" />
      </Stack>
      <Stack my={6} mx={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextArea
              placeholder="Write your note here"
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              m={0}
            />
          )}
          name="note"
        />
        <ErrorMessage name="note" />
      </Stack>
      {ACTION_SHEET_TYPES.select_book === actionSheetType && (
        <ActionSheet isOpen={isOpen} onClose={onClose}>
          <SelectBookOptions
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
          />
        </ActionSheet>
      )}
    </FormControl>
  );
};

export default React.memo(NoteForm);
