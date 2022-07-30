import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {FormControl, HStack, Text, VStack} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import {yupResolver} from '@hookform/resolvers/yup';
import {AppInput, SubmitButton} from '.';
import {getObjData} from '../data/AsyncStorageUtils';
import {useAlertError, useErrorColor, useShowMessage} from '../hooks';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
import {UpdateLastReadedPageSchema} from '../validation/Validations';
import {APP_INPUT_ALIGN_LABEL} from '../Utils';

const UpdateLastReadedPage = ({item, id, onClose, isVisible = false}) => {
  const [updating, setUpdataing] = useState(false);
  const {_alertError} = useAlertError();
  const {errorColor} = useErrorColor();
  const {_showToastMsg} = useShowMessage();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      last_readed_page: item.last_readed_page.toString(),
    },
    resolver: yupResolver(UpdateLastReadedPageSchema),
  });

  const _onUpdateLastReadedPage = data => {
    setUpdataing(true);
    const {last_readed_page} = data;
    getObjData('user', e => _alertError()).then(u => {
      firestore()
        .collection(COLLECTION_NAMES.users)
        .doc(u.uid)
        .collection(COLLECTION_NAMES.books)
        .doc(id)
        .update({
          last_readed_page: last_readed_page,
        })
        .then(() => {
          setUpdataing(false);
          _showToastMsg('Last readed page updated');
          onClose();
        })
        .catch(error => {
          setUpdataing(false);
          _alertError();
        });
    });
  };

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
    <FormControl w="full">
      <HStack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        w="full"
        p="0">
        <VStack w="4/6">
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <AppInput
                props={{keyboardType: 'numeric'}}
                control={control}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                mx={0}
                alignLabel={APP_INPUT_ALIGN_LABEL.vertical}
                label="Last readed page"
                showLabel={true}
                variant="underlined"
                inputW="2/4"
                keyboardType="numeric"
              />
            )}
            name="last_readed_page"
          />
          <ErrorMessage name="last_readed_page" />
        </VStack>
        <SubmitButton
          handleSubmit={handleSubmit}
          onSubmit={_onUpdateLastReadedPage}
          title="Update"
          showProgressIndicator={true}
          progress={updating}
          isLoadingText="Updating"
        />
      </HStack>
    </FormControl>
  );
};

export default React.memo(UpdateLastReadedPage);
