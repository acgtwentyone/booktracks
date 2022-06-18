import {Box, Button, HStack, Switch, Text, useColorMode} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Screen} from '../components';
import {FIREBASE_ERRORS, NAVIGATORS_NAME} from '../Utils';
import {useShowMessage} from '../hooks';

const SettingsScreen = ({navigation}) => {
  const {colorMode, toggleColorMode} = useColorMode();
  const {_showToastMsg} = useShowMessage();
  const subscriber = useRef(null);

  useEffect(() => {
    return () => subscriber;
  }, []);

  const _signout = () => {
    subscriber.current = auth()
      .signOut()
      .then(() => navigation.replace(NAVIGATORS_NAME.auth))
      .catch(error => _showToastMsg(FIREBASE_ERRORS[error.code]));
  };

  return (
    <Screen style={styles.container}>
      <Box>
        <Text padding={4}>Theme</Text>
        <HStack justifyContent="space-between" alignItems="center" paddingX={4}>
          <Text>Dark Mode</Text>
          <Switch
            size="sm"
            onToggle={toggleColorMode}
            isChecked={colorMode === 'dark'}
          />
        </HStack>
      </Box>
      <Box alignItems="center" position="absolute" bottom={8} width="100%">
        <Button onPress={_signout}>Sign out</Button>
      </Box>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen;
