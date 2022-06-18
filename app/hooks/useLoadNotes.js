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

  useEffect(() => {
    subscriber.current = _loadNotes();
    return () => subscriber;
  }, []);

  const _onRefresh = () => {
    _loadNotes();
  };

  const _loadNotes = () => {
    getObjData('user', e => {})
      .then(u => {
        firestore()
          .collection('users')
          .doc(u.uid)
          .collection(COLLECTION_NAMES.books)
          .get()
          .then(bookSnaps => {
            let _notes = [];
            bookSnaps.forEach(doc => {
              if (doc.exists) {
                doc.ref
                  .collection(COLLECTION_NAMES.notes)
                  .get()
                  .then(noteSnaps => {
                    noteSnaps.forEach(p => {
                      _notes.push(p);
                    });
                    // console.log(_notes);
                  })
                  .catch(e => _alertError());
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
