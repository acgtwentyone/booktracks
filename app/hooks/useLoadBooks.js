import {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';

const useLoadBooks = isFavourities => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const subscriber = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    subscriber.current = _loadBooks();
    return () => subscriber();
  }, []);

  const _onRefresh = () => {
    _loadBooks();
  };

  const _loadBooks = () => {
    subscriber.current = firestore().collection(COLLECTION_NAMES.books);
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
    });
  };

  return {books, loading, refreshing, _loadBooks, _onRefresh};
};

export default useLoadBooks;
