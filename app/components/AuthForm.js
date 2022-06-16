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
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNetInfo} from '@react-native-community/netinfo';

import {Screen} from '.';
import {FIREBASE_ERRORS, NAVIGATORS_NAME, ROUTES_NAME} from '../Utils';
import {Controller, useForm} from 'react-hook-form';
import {useShowMessage} from '../hooks';
import {SigninSchema, SignupSchema} from '../validation/Validations';
import {set} from '../firebase/FirebaseUtils';

const AuthForm = ({navigation, signin = true}) => {
  const [starting, setStarting] = useState(true);
  const errorColor = useColorModeValue('red.500', 'white');
  const defaultValues = signin
    ? {
        email: '',
        password: '',
      }
    : {
        username: '',
        email: '',
        password: '',
      };
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(signin ? SigninSchema : SignupSchema),
  });
  const {_showToastMsg} = useShowMessage();
  const netInfo = useNetInfo();

  const navigateTab = () => {
    navigation.replace(NAVIGATORS_NAME.tab);
  };

  const isInternet = () => {
    return (
      undefined !== netInfo &&
      netInfo !== null &&
      netInfo.isConnected !== null &&
      netInfo.isConnected
    );
  };

  useEffect(() => {
    setStarting(false);
  }, []);

  const NoInternetAlert = () => {
    const bgColor = useColorModeValue('coolGray.500', 'coolGray.900');
    return (
      <>
        {!isInternet() && (
          <Box
            p={4}
            backgroundColor={bgColor}
            borderTopLeftRadius={8}
            borderTopRightRadius={8}>
            <Text fontSize={15} fontWeight="bold">
              No internet connection
            </Text>
          </Box>
        )}
      </>
    );
  };

  const __processSiginOrSignup = async ({email, password, username = null}) => {
    if (isInternet()) {
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
          .then(({user}) => {
            set({username: username}, 'users', user.uid, navigateTab());
          })
          .catch(error => {
            _showToastMsg(FIREBASE_ERRORS[error.code]);
          });
      }
    } else {
      _showToastMsg('No internet connection.');
    }
  };

  const _signinAnonymously = () => {
    if (isInternet()) {
      auth()
        .signInAnonymously()
        .then(() => {
          navigation.replace(NAVIGATORS_NAME.tab);
        })
        .catch(error => {
          _showToastMsg(FIREBASE_ERRORS[error.code]);
        });
    } else {
      _showToastMsg('No internet connection.');
    }
  };

  const ErrorMessage = ({name}) => (
    <>
      {errors && errors[name] && (
        <Text mt={2} color={errorColor}>
          {errors[name]?.message}
        </Text>
      )}
    </>
  );

  if (starting) {
    return null;
  }

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
            {!signin && (
              <Stack mx={8} my={2}>
                <Controller
                  name="username"
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder="username"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <ErrorMessage name="username" />
              </Stack>
            )}
            <Stack mx={8} my={2}>
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

            <Stack mx={8} my={2}>
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
          {/* {signin && (
            <HStack justifyContent="center" mt={4}>
              <Button size="sm" variant="link" onPress={_signinAnonymously}>
                Skip Sign in
              </Button>
            </HStack>
          )} */}
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
      <NoInternetAlert />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthForm;
