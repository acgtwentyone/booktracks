import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (storage_Key, value, onError) => {
  try {
    await AsyncStorage.setItem(`@${storage_Key}`, value);
  } catch (e) {
    onError(e);
  }
};

export const storeObjData = async (storage_Key, value, onError) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${storage_Key}`, jsonValue);
  } catch (e) {
    onError(e);
  }
};

export const getData = async (storage_Key, onError) => {
  try {
    const value = await AsyncStorage.getItem(`@${storage_Key}`);
    return value;
  } catch (e) {
    onError(e);
  }
};

export const getObjData = async (storage_Key, onError) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${storage_Key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    onError(e);
  }
};
