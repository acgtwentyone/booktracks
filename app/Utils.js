import React from 'react';
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

export {
  COLORS,
  FONT_SIZE,
  HIT_SLOP,
  NAVIGATORS_NAME,
  TABS_NAME,
  ROUTES_NAME,
  SCREEN_HEIGHT,
  SCREEN_TITLES,
  SCREEN_WIDTH,
};
