import React from 'react';
import {StyleSheet} from 'react-native';

import {AuthForm} from '../components';

const SigninScreen = ({navigation}) => {
  return <AuthForm navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default SigninScreen;
