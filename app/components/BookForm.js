import React from 'react';
import {Controller} from 'react-hook-form';
import {FormControl, Stack, Text} from 'native-base';

import {AppInput, AppTextArea} from './';
import {useErrorColor} from '../hooks';

const BookForm = ({control, errors}) => {
  const {errorColor} = useErrorColor();

  const ErrorMessage = ({name}) => (
    <>
      {errors && errors[name] && (
        <Text mx={4} my={2} color={errorColor} fontSize="md">
          {errors[name]?.message}
        </Text>
      )}
    </>
  );

  return (
    <FormControl h="100%">
      <Stack my={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              label="Title"
              showLabel={true}
              variant="underlined"
            />
          )}
          name="title"
        />
        <ErrorMessage name="title" />
      </Stack>

      <Stack my={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              label="Author"
              showLabel={true}
              variant="underlined"
            />
          )}
          name="author"
        />
        <ErrorMessage name="author" />
      </Stack>

      <Stack my={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              props={{keyboardType: 'numeric'}}
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              label="Year"
              showLabel={true}
              variant="underlined"
              inputW="1/4"
            />
          )}
          name="year"
        />
        <ErrorMessage name="year" />
      </Stack>

      <Stack my={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              control={control}
              rules={{required: true}}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              label="ISBN"
              showLabel={true}
              variant="underlined"
            />
          )}
          name="isbn"
        />
        <ErrorMessage name="isbn" />
      </Stack>
      <Stack my={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              props={{keyboardType: 'numeric'}}
              control={control}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              label="Last readed page"
              showLabel={true}
              variant="underlined"
              inputW="1/4"
            />
          )}
          name="last_readed_page"
        />
        <ErrorMessage name="last_readed_page" />
      </Stack>
      <Stack my={4} mx={2}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextArea
              placeholder="Another description"
              control={control}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="description"
        />
        <ErrorMessage name="description" />
      </Stack>
    </FormControl>
  );
};

export default React.memo(BookForm);
