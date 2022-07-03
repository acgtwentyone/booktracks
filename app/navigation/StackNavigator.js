import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddEditBookScreen,
  AddEditNoteScreen,
  BookDetailScreen,
  BooksScreen,
  FavScreen,
  HomeScreen,
  NoteDetailScreen,
  NotesScreen,
  SettingsScreen,
  SigninScreen,
  SignupScreen,
} from '../screens';
import {NAVIGATORS_NAME, ROUTES_NAME, SCREEN_TITLES} from '../Utils';
import {useScreenOptions} from '../hooks';
import {AppTab} from '.';

const AuthStk = createNativeStackNavigator();
const BooksStk = createNativeStackNavigator();
const FavStk = createNativeStackNavigator();
const HomeStk = createNativeStackNavigator();
const NotesStk = createNativeStackNavigator();
const SettingsStk = createNativeStackNavigator();
const RootStk = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <AuthStk.Navigator
      initialRouteName={ROUTES_NAME.signin}
      screenOptions={{headerShown: false}}>
      <AuthStk.Screen name={ROUTES_NAME.signin} component={SigninScreen} />
      <AuthStk.Screen name={ROUTES_NAME.signup} component={SignupScreen} />
    </AuthStk.Navigator>
  );
};

const BooksStack = () => {
  const {screenOptions} = useScreenOptions();

  return (
    <BooksStk.Navigator
      initialRouteName={ROUTES_NAME.books}
      screenOptions={screenOptions}>
      <BooksStk.Screen
        name={ROUTES_NAME.books}
        component={BooksScreen}
        options={{
          title: SCREEN_TITLES.books,
        }}
      />
      <BooksStk.Screen
        name={ROUTES_NAME.book_detail}
        component={BookDetailScreen}
        options={{
          title: SCREEN_TITLES.book_detail,
        }}
      />
      <BooksStk.Screen
        name={ROUTES_NAME.add_edit_book}
        component={AddEditBookScreen}
        options={{
          title: SCREEN_TITLES.edit_book,
        }}
      />
    </BooksStk.Navigator>
  );
};

const FavStack = () => {
  const {screenOptions} = useScreenOptions();

  return (
    <FavStk.Navigator
      initialRouteName={ROUTES_NAME.favourities}
      screenOptions={screenOptions}>
      <FavStk.Screen
        name={ROUTES_NAME.favourities}
        component={FavScreen}
        options={{
          title: SCREEN_TITLES.favourities,
        }}
      />
    </FavStk.Navigator>
  );
};

const HomeStack = () => {
  const {screenOptions} = useScreenOptions();

  return (
    <HomeStk.Navigator
      initialRouteName={ROUTES_NAME.home}
      screenOptions={screenOptions}>
      <HomeStk.Screen
        name={ROUTES_NAME.home}
        component={HomeScreen}
        options={{title: SCREEN_TITLES.home}}
      />
    </HomeStk.Navigator>
  );
};

const NotesStack = () => {
  const {screenOptions} = useScreenOptions();
  const {notes} = ROUTES_NAME;

  return (
    <NotesStk.Navigator initialRouteName={notes} screenOptions={screenOptions}>
      <NotesStk.Screen
        name={notes}
        component={NotesScreen}
        options={{
          title: SCREEN_TITLES.notes,
        }}
      />
      <NotesStk.Screen
        name={ROUTES_NAME.note_detail}
        component={NoteDetailScreen}
        options={{
          title: SCREEN_TITLES.note_detail,
        }}
      />
      <NotesStk.Screen
        name={ROUTES_NAME.add_edit_note}
        component={AddEditNoteScreen}
        options={{
          title: SCREEN_TITLES.edit_note,
        }}
      />
    </NotesStk.Navigator>
  );
};

const SettingsStack = () => {
  const {screenOptions} = useScreenOptions(false);

  return (
    <SettingsStk.Navigator
      initialRouteName={ROUTES_NAME.settings}
      screenOptions={screenOptions}>
      <SettingsStk.Screen
        name={ROUTES_NAME.settings}
        component={SettingsScreen}
        options={{title: SCREEN_TITLES.settings}}
      />
    </SettingsStk.Navigator>
  );
};

const RootNavigator = ({user}) => {
  const {auth, tab} = NAVIGATORS_NAME;
  let appScreens =
    undefined !== user && user !== null
      ? [{name: tab, component: AppTab}]
      : [{name: auth, component: AuthStack}];

  return (
    <RootStk.Navigator>
      {appScreens.map(({name, component}, index) => (
        <RootStk.Screen
          key={index}
          name={name}
          component={component}
          options={{headerShown: false}}
        />
      ))}
    </RootStk.Navigator>
  );
};

export {
  AuthStack,
  BooksStack,
  FavStack,
  HomeStack,
  NotesStack,
  SettingsStack,
  RootNavigator,
};
