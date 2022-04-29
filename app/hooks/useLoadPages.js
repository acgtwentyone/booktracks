import {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
import {getObjData} from '../data/AsyncStorageUtils';

const useLoadPages = () => {
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
    getObjData('user', e => {})
      .then(u => {
        firestore()
          .collection('users')
          .doc(u.uid)
          .collection(COLLECTION_NAMES.books)
          .get()
          .then(bookSnaps => {
            let _pages = [];
            bookSnaps.forEach(doc => {
              if (doc.exists) {
                doc.ref
                  .collection(COLLECTION_NAMES.pages)
                  .get()
                  .then(pageSnaps => {
                    pageSnaps.forEach(p => {
                      _pages.push(p);
                      // setPages(prev => [...prev, p]);
                    });
                    console.log(_pages);
                    // setPages(_pages);
                  })
                  .catch(e => console.log(e));
              }
            });
          })
          .catch(e => console.log(e));
      })
      .catch(error => console.log('oppss...'));
    setLoading(false);
  };

  return {pages, loading, refreshing, _loadPages, _onRefresh};
};

export default useLoadPages;
