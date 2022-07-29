import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppConfigIcon, ListBookItems} from '../components';

const FavScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AppConfigIcon />,
    });
    return () => {};
  }, []);
  return <ListBookItems isFavourities={true} />;
};

export default FavScreen;
