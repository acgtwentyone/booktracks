import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppConfigIcon, ListBookItems} from '../components';

const BooksScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AppConfigIcon />,
    });
    return () => {};
  }, []);

  return <ListBookItems />;
};

export default BooksScreen;
