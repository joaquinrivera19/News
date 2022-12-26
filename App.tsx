import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigation} from './src/navigation/DrawerNavigation';
import {UserProvider} from './src/context/userProvider';

import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation-locker';

const App = () => {

  useEffect(() => {
    Orientation.lockToPortrait();
    SplashScreen.hide();
  }, [])

  return (
    <UserProvider>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
