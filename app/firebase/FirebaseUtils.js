import firestore from '@react-native-firebase/firestore';

export const COLLECTION_NAMES = {
  books: 'books',
};

export const ERROR_MESSAGES = {
  default: 'Oppss... algo deu errado',
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
