import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SigninScreen,
  SignupScreen,
  BooksScreen,
  PagesScreen,
  FavScreen,
  HomeScreen,
  SettingsScreen,
} from '../screens';
import {NAVIGATORS_NAME, ROUTES_NAME, SCREEN_TITLES} from '../Utils';
import {useScreenOptions} from '../hooks';
import {AppTab} from '.';

const AuthStk = createNativeStackNavigator();
const BooksStk = createNativeStackNavigator();
const FavStk = createNativeStackNavigator();
const HomeStk = createNativeStackNavigator();
const PagesStk = createNativeStackNavigator();
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

const PagesStack = () => {
  const {screenOptions} = useScreenOptions();

  return (
    <PagesStk.Navigator
      initialRouteName={ROUTES_NAME.pages}
      screenOptions={screenOptions}>
      <PagesStk.Screen
        name={ROUTES_NAME.pages}
        component={PagesScreen}
        options={{
          title: SCREEN_TITLES.pages,
        }}
      />
    </PagesStk.Navigator>
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
  let appScreens = [{name: auth, component: AuthStack}];
  appScreens = user
    ? [{name: tab, component: AppTab}, ...appScreens]
    : [...appScreens, {name: tab, component: AppTab}];

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
  PagesStack,
  SettingsStack,
  RootNavigator,
};
