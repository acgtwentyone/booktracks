import firestore from '@react-native-firebase/firestore';

import {FIREBASE_BOOKS_PATH, FIREBASE_PAGES_PATH} from '../secrets';

export const COLLECTION_NAMES = {
  books: FIREBASE_BOOKS_PATH,
  pages: FIREBASE_PAGES_PATH,
};

export const ERROR_MESSAGES = {
  default: 'Oppss... algo deu errado',
};

export const ItemStatus = {
  active: 1,
  inactive: 0,
};

export const serTimestamp = firestore.FieldValue.serverTimestamp();

export const add = async (data, path, onSuccess) => {
  try {
    await firestore()
      .collection(path)
      .add(data)
      .then(() => {
        onSuccess;
      });
  } catch (error) {
    console.error(ERROR_MESSAGES.default, error);
  }
};

export const update = async (data, path, doc, onSuccess) => {
  try {
    await firestore()
      .collection(path)
      .doc(doc)
      .update(data)
      .then(() => {
        onSuccess;
      });
  } catch (error) {
    console.error(ERROR_MESSAGES.default, error);
  }
};

export const remove = async (path, doc, onSuccess) => {
  try {
    await firestore()
      .collection(path)
      .doc(doc)
      .delete()
      .then(() => {
        onSuccess;
      });
  } catch (error) {
    console.error(ERROR_MESSAGES.default, error);
  }
};
