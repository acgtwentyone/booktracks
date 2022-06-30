import React from 'react';
import {Text} from 'native-base';
import {Screen} from '../components';
import {useRoute} from '@react-navigation/native';

const AddEditBookScreen = () => {
  const route = useRoute();
  console.log(route);

  return (
    <Screen>
      <Text>Add or edit Book</Text>
    </Screen>
  );
};

export default React.memo(AddEditBookScreen);
