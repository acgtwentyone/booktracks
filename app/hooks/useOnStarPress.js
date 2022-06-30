import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {COLLECTION_NAMES} from '../firebase/FirebaseUtils';
import {useAlertError, useShowMessage} from '../hooks';
import {getObjData} from '../data/AsyncStorageUtils';
import {limitStr} from '../Utils';

const useOnStarPress = (data, id) => {
  const {title, favourity} = data;
  const {_alertError} = useAlertError();
  const {_showToastMsg} = useShowMessage();

  const _onStarPress = () => {
    getObjData('user', e => _alertError()).then(u => {
      firestore()
        .collection('users')
        .doc(u.uid)
        .collection(COLLECTION_NAMES.books)
        .doc(id)
        .update({
          favourity: !favourity,
        })
        .then(() => {
          _showToastMsg(
            `Book "${limitStr(title)}" ${
              favourity ? 'removed from' : 'added to'
            } favourity`,
          );
        })
        .catch(error => _alertError());
    });
  };

  return {_onStarPress};
};

export default useOnStarPress;
