import firestore from '@react-native-firebase/firestore';

import {
  FIREBASE_BOOKS_PATH,
  FIREBASE_NOTES_PATH,
  FIREBASE_USERS_PATH,
} from '@env';

export const COLLECTION_NAMES = {
  books: FIREBASE_BOOKS_PATH,
  notes: FIREBASE_NOTES_PATH,
  users: FIREBASE_USERS_PATH,
};

export const ERROR_MESSAGES = {
  default: 'Oppss... something went wrong.',
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

export const set = async (data, path, doc, onSuccess) => {
  try {
    await firestore()
      .collection(path)
      .doc(doc)
      .set(data)
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
