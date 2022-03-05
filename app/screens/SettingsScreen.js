import {Box, HStack, Switch, Text, useColorMode} from 'native-base';
import React from 'react';

import {Screen} from '../components';

const SettingsScreen = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Screen>
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
    </Screen>
  );
};

export default SettingsScreen;
