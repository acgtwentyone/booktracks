import firestore from '@react-native-firebase/firestore';

export const COLLECTION_NAMES = {
  books: 'books',
};

export const ERROR_MESSAGES = {
  default: 'Oppss... algo deu errado',
};

export const serTimestamp = firestore.FieldValue.serverTimestamp();

export const addNew = async (data, path) => {
  try {
    await firestore()
      .collection(path)
      .add(data)
      .then(() => {
        console.log('Data successfully created!');
      });
  } catch (error) {
    console.error(ERROR_MESSAGES.default, error);
  }
};

export const update = async (data, path, doc) => {
  try {
    await firestore()
      .collection(path)
      .doc(doc)
      .update(data)
      .then(() => {
        console.log('Data successfully updated!');
      });
  } catch (error) {
    console.error(ERROR_MESSAGES.default, error);
  }
};

export const remove = async (path, doc) => {
  try {
    await firestore()
      .collection(path)
      .doc(doc)
      .delete()
      .then(() => {
        console.log('Data successfully deleted!');
      });
  } catch (error) {
    console.error(ERROR_MESSAGES.default, error);
  }
};
