import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useUserContext} from '../context/userProvider';
/* Screen */
import ArticleScreen from '../screens/ArticleScreen';
import SettingScreen from '../screens/SettingsScreen';
import ContainerScreen from '../screens/ContainerScreen';
import FontSizeScreen from '../screens/FontSizeScreen';
import QuietTimeScreen from '../screens/QuietTimeScreen';
import WebViewScreen from '../screens/WebViewScreen';
import Header from '../components/Header';
//import {Platform} from 'react-native';
//import DeviceInfo from 'react-native-device-info';
import 'react-native-gesture-handler';

export type RootStackParams = {
  ContainerScreen: undefined;
  SettingScreen: undefined;
  QuietTimeScreen: undefined;
  FontSizeScreen: undefined;
  WebViewScreen: undefined;
  ArticleScreen: {
    id: any;
    type: any;
  };
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const {customersMetadata, isLoading}: any = useUserContext();

  const SettingsHeader = {
    headerShown: true,
    headerStyle: {
      backgroundColor:
        !isLoading && customersMetadata.config.theme.colorPalette.dark.primary,
    },
    headerTintColor: '#fff',
    cardStyle: {
      backgroundColor: '#F5F5F5',
    },
  };

  return (
    <Stack.Navigator
      initialRouteName="ContainerScreen"
      screenOptions={{
        gestureEnabled: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
        cardStyle: {
          backgroundColor: 'white',
        },
        //headerShown: false, // mostrar o quitar menu

        animationEnabled: false,
      }}>
      <Stack.Screen
        name="ContainerScreen"
        options={{
          title: 'ContainerScreentttt',
          headerShown: true,
          headerTitle: () => <Header />,
        }}
        component={ContainerScreen}
      />

      <Stack.Screen
        name="ArticleScreen"
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: () => <Header />,
        }}
        component={ArticleScreen}
      />
      <Stack.Screen
        name="SettingScreen"
        options={{
          title: 'Settings',
          headerTitleAlign: 'center',
          ...SettingsHeader,
        }}
        component={SettingScreen}
      />
      <Stack.Screen
        name="FontSizeScreen"
        options={{
          title: 'Font Size',
          headerTitleAlign: 'center',
          ...SettingsHeader,
        }}
        component={FontSizeScreen}
      />
      <Stack.Screen
        name="QuietTimeScreen"
        options={{
          title: 'Quiet Time',
          headerTitleAlign: 'center',
          ...SettingsHeader,
        }}
        component={QuietTimeScreen}
      />
      <Stack.Screen
        name="WebViewScreen"
        options={({route}) => ({
          title: route.params.title,
          headerTitleAlign: 'center',
          ...SettingsHeader,
        })}
        component={WebViewScreen}
      />
    </Stack.Navigator>
  );
};
