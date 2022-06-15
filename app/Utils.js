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
  favourities: 'FAVOURITIES',
  home: 'HOME',
  pages: 'PAGES',
  search: 'SEARCH',
  settings: 'SETTINGS',
  signin: 'SIGNIN',
  signup: 'SIGNUP',
};

const SCREEN_TITLES = {
  account: 'Account',
  books: 'Books',
  favourities: 'Favourities',
  home: 'Home',
  pages: 'Pages',
  search: 'Search',
  settings: 'Settings',
};

const TABS_NAME = {
  home: 'HOME_TAB',
  books: 'BOOKS_TAB',
  pages: 'PAGES_TAB',
  favourities: 'FAV_TABS',
  settings: 'SETTINGS_TAB',
};

const NAVIGATORS_NAME = {
  auth: 'AUTH',
  tab: 'TAB',
};

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const HIT_SLOP = {top: 20, right: 20, bottom: 20, left: 20};

const FONT_SIZE = {
  font_16: 16,
  font_15: 15,
  font_18: 18,
  font_20: 20,
};

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

export {
  COLORS,
  FIREBASE_ERRORS,
  FONT_SIZE,
  HIT_SLOP,
  NAVIGATORS_NAME,
  TABS_NAME,
  ROUTES_NAME,
  SCREEN_HEIGHT,
  SCREEN_TITLES,
  SCREEN_WIDTH,
};
