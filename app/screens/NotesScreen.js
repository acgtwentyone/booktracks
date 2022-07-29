import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppConfigIcon, ListNoteItems} from '../components';

const NotesScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <AppConfigIcon />,
    });
    return () => {};
  }, []);

  return <ListNoteItems />;
};

export default NotesScreen;
