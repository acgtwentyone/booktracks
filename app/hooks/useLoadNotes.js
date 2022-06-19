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
  const dataSubscriber = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    subscriber.current = _loadNotes();
    return () => {
      subscriber;
      dataSubscriber;
    };
  });

  const _onRefresh = () => {
    setLoading(true);
    setNotes([]);
    _loadNotes();
  };

  const _loadNotes = () => {
    dataSubscriber.current = getObjData('user', e => {})
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
                  .then(n => {
                    if (n.docs.length > 0) {
                      n.docs.forEach(doc => {
                        // setNotes(no => no.concat(doc));
                      });
                    }
                  });
              }
            });
          })
          .catch(e => _alertError());
      })
      .catch(error => _alertError());
    setLoading(false);
  };

  return {
    notes,
    loading,
    refreshing,
    _loadNotes,
    _onRefresh,
    subscriber,
    dataSubscriber,
  };
};

export default useLoadNotes;
