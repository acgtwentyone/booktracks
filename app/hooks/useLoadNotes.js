import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
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

  const trigger = data => {
    setNotes(n => n.concat(data));
  };

  useEffect(() => {
    _loadNotes();
    return () => {};
  }, []);

  const _loadNotes = () => {
    setLoading(true);
    setNotes([]);
    getObjData('user', e => {})
      .then(u => {
        firestore()
          .collection('users')
          .doc(u.uid)
          .collection(COLLECTION_NAMES.books)
          .get()
          .then(bookSnaps => {
            bookSnaps.forEach(b => {
              if (b.exists) {
                b.ref
                  .collection(COLLECTION_NAMES.notes)
                  .get()
                  .then(n => {
                    if (n.docs.length > 0) {
                      n.docs.forEach(doc => {
                        trigger(doc);
                      });
                    }
                  });
              }
            });
            setLoading(false);
            setRefreshing(false);
          })
          .catch(e => _alertError());
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
