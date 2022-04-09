import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Image,
  Input,
  ScrollView,
  Stack,
  Text,
  useColorModeValue,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {yupResolver} from '@hookform/resolvers/yup';

import {Screen} from '.';
import {FIREBASE_ERRORS, NAVIGATORS_NAME, ROUTES_NAME} from '../Utils';
import {Controller, useForm} from 'react-hook-form';
import useShowMessage from '../hooks/useShowMessage';
import {SigninSchema} from '../validation/Validations';

const AuthForm = ({navigation, signin = true}) => {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(SigninSchema),
  });
  const {_showToastMsg} = useShowMessage();

  const navigateTab = () => {
    navigation.replace(NAVIGATORS_NAME.tab);
  };

  const __processSiginOrSignup = async ({email, password}) => {
    if (signin) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigateTab();
        })
        .catch(error => {
          _showToastMsg(FIREBASE_ERRORS[error.code]);
        });
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigateTab();
        })
        .catch(error => {
          _showToastMsg(FIREBASE_ERRORS[error.code]);
        });
    }
  };

  const _signinAnonymously = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        navigation.replace(NAVIGATORS_NAME.tab);
      })
      .catch(error => {
        _showToastMsg(FIREBASE_ERRORS[error.code]);
      });
  };

  const ErrorMessage = ({name}) => (
    <Text mt={2} color={useColorModeValue('red.500', 'white')}>
      {errors[name]?.message}
    </Text>
  );

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <HStack justifyContent="center" p={8}>
          <Image
            source={require('../../assets/png/logo.png')}
            width={48}
            height={48}
            resizeMode="center"
            alt="Logo"
          />
        </HStack>
        <Box
          w={{
            base: '100%',
            md: '25%',
          }}>
          <FormControl isRequired>
            <Stack mx={4}>
              <Controller
                name="email"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <ErrorMessage name="email" />
            </Stack>

            <Stack mt={4} mx={4}>
              <Controller
                name="password"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    type="password"
                    placeholder="password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <ErrorMessage name="password" />
            </Stack>
            <HStack justifyContent="center" mt={8}>
              <Button
                size="sm"
                endIcon={
                  <Icon
                    as={MaterialCommunityIcons}
                    name="arrow-right"
                    size="xs"
                  />
                }
                onPress={handleSubmit(__processSiginOrSignup)}>
                {signin ? 'Sign in' : 'Sign up'}
              </Button>
            </HStack>
          </FormControl>
          {signin && (
            <HStack justifyContent="center" mt={8}>
              <Icon as={MaterialCommunityIcons} name="google" size="xs" />
              <Icon
                as={MaterialCommunityIcons}
                name="twitter"
                size="xs"
                mx={8}
              />
              <Icon as={MaterialCommunityIcons} name="facebook" size="xs" />
            </HStack>
          )}
          {signin && (
            <HStack justifyContent="center" mt={4}>
              <Button size="xs" variant="link" onPress={_signinAnonymously}>
                Skip Sign in
              </Button>
            </HStack>
          )}
          <HStack
            justifyContent="center"
            alignItems="center"
            mt={8}
            px={signin ? 32 : 8}>
            <Text>
              {signin ? 'No account yet ?' : 'Already has an account ?'}
            </Text>
            <Button
              size="sm"
              variant="link"
              onPress={() =>
                navigation.navigate(
                  signin ? ROUTES_NAME.signup : ROUTES_NAME.signin,
                )
              }>
              {signin ? 'Sign up' : 'Sign in'}
            </Button>
          </HStack>
        </Box>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthForm;
