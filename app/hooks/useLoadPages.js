import {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';

const useLoadPages = isFavourities => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const subscriber = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    subscriber.current = _loadPages();
    return () => subscriber;
  }, []);

  const _onRefresh = () => {
    _loadPages();
  };

  const _loadPages = () => {
    subscriber.current = firestore()
      .collection(COLLECTION_NAMES.pages)
      .subscriber.current.onSnapshot(querySnapshot => {
        const _pages = [];
        querySnapshot.forEach(documentSnapshot => {
          _pages.push(documentSnapshot);
        });
        setPages(_pages);
        setLoading(false);
      });
  };

  return {pages, loading, refreshing, _loadPages, _onRefresh};
};

export default useLoadPages;
