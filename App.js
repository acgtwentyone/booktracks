import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native';
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
import {storeObjData} from './app/data/AsyncStorageUtils';
import {useAlertError} from './app/hooks';

const App = () => {
  const subscriber = useRef(null);
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
    subscriber.current = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber;
  }, []);

  SplashScreen.hide();

  const customTheme = extendTheme({config});

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const {_alertError} = useAlertError();

  if (loading) {
    return <></>;
  }

  // Handle user state changes
  const onAuthStateChanged = u => {
    storeObjData('user', u, e => _alertError());
    setUser(u);
  };

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

export default React.memo(App);
