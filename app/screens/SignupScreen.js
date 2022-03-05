import React from 'react';
import {AuthForm} from '../components';

const SignupScreen = ({navigation}) => {
  return <AuthForm signin={false} navigation={navigation} />;
};

export default SignupScreen;
