import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {getObjData} from '../data/AsyncStorageUtils';
import {useAlertError} from '../hooks';

const useLoadNotes = () => {
  const {_alertError} = useAlertError();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const _onRefresh = () => {
    setRefreshing(true);
    _loadNotes();
  };

  useEffect(() => {
    _loadNotes();
    return () => {};
  }, []);

  const _loadNotes = () => {
    setLoading(true);
    getObjData('user', e => () => _alertError())
      .then(u => {
        firestore()
          .collectionGroup('notes')
          .where('user_id', '==', u.uid)
          .onSnapshot(snapshot => {
            const _notes = [];
            snapshot.forEach(documentSnapshot => {
              _notes.push(documentSnapshot);
            });
            setNotes(_notes);
            setLoading(false);
            setRefreshing(false);
          });
      })
      .catch(error => _alertError());
  };

  return {
    notes,
    loading,
    refreshing,
    _onRefresh,
  };
};

export default useLoadNotes;
