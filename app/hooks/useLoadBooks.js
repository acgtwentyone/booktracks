import {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
import {getObjData} from '../data/AsyncStorageUtils';

const useLoadBooks = isFavourities => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const subscriber = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    subscriber.current = _loadBooks();
    return () => subscriber;
  }, []);

  const _onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    setBooks([]);
    _loadBooks();
  };

  const _loadBooks = () => {
    setLoading(true);
    getObjData('user', e => {}).then(u => {
      subscriber.current = firestore()
        .collection('users')
        .doc(u.uid)
        .collection(COLLECTION_NAMES.books);
      if (isFavourities) {
        subscriber.current = subscriber.current.where('favourity', '==', true);
      }
      subscriber.current = subscriber.current.onSnapshot(querySnapshot => {
        const _books = [];
        querySnapshot.forEach(documentSnapshot => {
          _books.push(documentSnapshot);
        });
        setBooks(_books);
        setLoading(false);
        setRefreshing(false);
      });
    });
  };

  return {books, loading, refreshing, _onRefresh, subscriber};
};

export default useLoadBooks;
