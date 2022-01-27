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
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

import {Screen} from '.';
// import useIsLoggedIn from '../hooks/useIsLoggedin';
import {NAVIGATORS_NAME, ROUTES_NAME} from '../Utils';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {SigninSchema} from '../validation/Validations';

const AuthForm = ({navigation, signin = true}) => {
  // const {login} = useIsLoggedIn();

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    // resolver: yupResolver(SigninSchema),
  });

  const navigateTab = () => {
    navigation.replace(NAVIGATORS_NAME.tab);
  };

  const __processSiginOrSignup = async data => {
    if (signin) {
      auth()
        .signInWithEmailAndPassword(
          'jane.doe@example.com',
          'SuperSecretPassword!',
        )
        .then(() => {
          console.log('User account created & signed in!');
          navigateTab();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    } else {
      auth()
        .createUserWithEmailAndPassword(
          'jane.doe@example.com',
          'SuperSecretPassword!',
        )
        .then(() => {
          console.log('User account created & signed in!');
          navigateTab();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };

  const _signinOrSignup = ({email, password}) => {
    const data = {email, password};
    __processSiginOrSignup(data);
  };

  const _signinAnonymously = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
        navigation.replace(NAVIGATORS_NAME.tab);
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
      });
  };

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
            <Stack mx="4">
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
              {errors.email && <Text>Email is Required</Text>}
            </Stack>

            <Stack mx="4" mt={8}>
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
              {errors.password && <Text>Password is Required</Text>}
            </Stack>
            <HStack justifyContent="center" mt={8}>
              <Button
                size="sm"
                // variant="outline"
                // isDisabled
                endIcon={
                  <Icon
                    as={MaterialCommunityIcons}
                    name="arrow-right"
                    size="xs"
                  />
                }
                onPress={handleSubmit(_signinOrSignup)}>
                {signin ? 'Sign in' : 'Sign up'}
              </Button>
            </HStack>
          </FormControl>
          {signin && (
            <HStack justifyContent="space-around" mt={8} px={32}>
              <Icon as={MaterialCommunityIcons} name="google" size="xs" />
              <Icon as={MaterialCommunityIcons} name="twitter" size="xs" />
              <Icon as={MaterialCommunityIcons} name="facebook" size="xs" />
            </HStack>
          )}
          {signin && (
            <HStack justifyContent="center" mt={8}>
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
