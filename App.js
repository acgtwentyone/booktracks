import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import {
  NativeBaseProvider,
  useColorModeValue,
  extendTheme,
  StatusBar,
} from 'native-base';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootNavigator} from './app/navigation/StackNavigator';

const App = () => {
  const backgroundStyle = {
    backgroundColor: useColorModeValue(Colors.darker, Colors.lighter),
    flex: 1,
  };

  const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  };

  useEffect(() => {
    SplashScreen.hide();
    return () => {};
  }, []);

  SplashScreen.hide();

  const customTheme = extendTheme({config});

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <></>;
  }

  // Handle user state changes
  const onAuthStateChanged = u => {
    setUser(u);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar />
      <NativeBaseProvider theme={customTheme}>
        <NavigationContainer>
          <RootNavigator user={user} />
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

export default App;
