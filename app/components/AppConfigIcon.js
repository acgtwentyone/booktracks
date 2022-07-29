import React from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppTouchableOpacity} from '.';
import {ROUTES_NAME} from '../Utils';
import {Icon, useColorModeValue} from 'native-base';

const AppConfigIcon = () => {
  const navigation = useNavigation();
  const iconColor = useColorModeValue('black', 'primary.500');
  return (
    <AppTouchableOpacity
      onPress={() => navigation.navigate(ROUTES_NAME.settings)}>
      <Icon
        as={MaterialCommunityIcons}
        name="cog-outline"
        size="sm"
        color={iconColor}
      />
    </AppTouchableOpacity>
  );
};

export default React.memo(AppConfigIcon);
