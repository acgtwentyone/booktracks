import {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';

import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
import {getObjData} from '../data/AsyncStorageUtils';
import {useAlertError} from '../hooks';

const useLoadNotes = () => {
  const {_alertError} = useAlertError();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const subscriber = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const _notes = useRef([]);

  useEffect(() => {
    _loadNotes();
    return () => subscriber;
  }, []);

  const _onRefresh = () => {
    _loadNotes();
  };

  const _trigger = data => {
    _notes.current.push(data);
    if (_notes.current.length <= 4) {
      setNotes(_notes.current);
    }
  };

  const _loadNotes = () => {
    getObjData('user', e => {})
      .then(u => {
        subscriber.current = firestore()
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
                  .then(n =>
                    n.docs.forEach(v => {
                      _trigger(v);
                    }),
                  );
              }
            });
          })
          .catch(e => _alertError());
      })
      .catch(error => _alertError());
    setLoading(false);
  };

  return {notes, loading, refreshing, _loadNotes, _onRefresh};
};

export default useLoadNotes;
