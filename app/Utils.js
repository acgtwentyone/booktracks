import {Dimensions} from 'react-native';

const COLORS = {
  accent: '#448AFF',
  divider: '#BDBDBD',
  icons: '#FFFFFF',
  primary: '#3F51B5',
  primary_dark: '#303F9F',
  primary_light: '#C5CAE9',
  primary_text: '#212121',
  secondary_text: '#757575',
  white: '#FFFFFF',
};

const ROUTES_NAME = {
  account: 'ACCOUNT',
  books: 'BOOKS',
  book_detail: 'BOOK_DETAIL',
  note_detail: 'NOTE_DETAIL',
  add_edit_book: 'ADD_EDIT_BOOK',
  add_edit_note: 'ADD_EDIT_NOTE',
  favourities: 'FAVOURITIES',
  notes: 'NOTES',
  search: 'SEARCH',
  settings: 'SETTINGS',
  signin: 'SIGNIN',
  signup: 'SIGNUP',
};

const SCREEN_TITLES = {
  account: 'Account',
  add_book: 'New Book',
  add_note: 'New Note',
  book_detail: 'Book Detail',
  note_detail: 'Note Detail',
  books: 'Books',
  edit_book: 'Edit Book',
  edit_note: 'Edit Note',
  favourities: 'Favourities',
  notes: 'Notes',
  new_book: 'New Book',
  new_note: 'New Note',
  search: 'Search',
  settings: 'Settings',
};

const TABS_NAME = {
  books: 'BOOKS_TAB',
  notes: 'NOTES_TAB',
  favourities: 'FAV_TABS',
  settings: 'SETTINGS_TAB',
};

const NAVIGATORS_NAME = {
  auth: 'AUTH',
  tab: 'TAB',
};

const APP_INPUT_ALIGN_LABEL = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const HIT_SLOP = {top: 20, right: 20, bottom: 20, left: 20};

const FIREBASE_ERRORS = {
  'auth/user-not-found': 'User not found!',
  'auth/invalid-email': 'That email address is invalid!',
  'auth/wrong-password': 'Password does not match owr records!',
  'auth/email-already-in-use': 'That email address is already in use!',
  'auth/operation-not-allowed': 'Oppss... Not able to login user!',
  'auth/no-current-user': 'No user currently signed in',
  'auth/network-request-failed':
    'A network error. Interrupted connection or unreachable host',
};

export const uuid = () => {
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 || 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 || 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const limitStr = (str, limit = SCREEN_WIDTH / 25, end = '...') => {
  return str.length > limit ? `${str.substring(0, limit - 1)}${end}` : str;
};

export {
  APP_INPUT_ALIGN_LABEL,
  COLORS,
  FIREBASE_ERRORS,
  HIT_SLOP,
  NAVIGATORS_NAME,
  TABS_NAME,
  ROUTES_NAME,
  SCREEN_HEIGHT,
  SCREEN_TITLES,
  SCREEN_WIDTH,
};
