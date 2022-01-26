import React from 'react';
import {StyleSheet} from 'react-native';
import {AuthForm} from '../components';

const SignupScreen = ({navigation}) => {
  return <AuthForm signin={false} navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default SignupScreen;
