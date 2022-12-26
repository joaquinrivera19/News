import React, {useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
/* Navigation */
import {StackNavigator} from './StackNavigator';
/* Screen */
import Header from '../components/Header';
import {useUserContext} from '../context/userProvider';
import {TabActions} from '@react-navigation/native';
import ModalWeather from '../components/ModalWeather';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const {width} = useWindowDimensions();
  const {customersMetadata, isLoading}: any = useUserContext();

  return (
    <Drawer.Navigator
      initialRouteName="StackNavigator"
      screenOptions={{
        //drawerType: width >= 768 ? 'permanent' : 'front',
        drawerStyle: {
          backgroundColor:
            !isLoading &&
            customersMetadata.config.theme.colorPalette.dark.primary,
        },
        headerShown: false,
        swipeEnabled: false, // Le deshabilito el swiper asi no trae problemas en la page de articulos
      }}
      drawerContent={props => <MenuInterno {...props} />}>
      <Drawer.Screen
        name="StackNavigator"
        /* options={{headerTitle: () => <Header />}} */
        component={StackNavigator}
      />
    </Drawer.Navigator>
  );
};

const MenuInterno = ({navigation}: DrawerContentComponentProps) => {
  const {customersMetadata, isLoading, dataStore}: any = useUserContext();
  const [modalVisibleee, setModalVisibleee] = useState(false);

  return (
    <DrawerContentScrollView>
      <View style={styles.menuContainer}>
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator color="black" size={30} />
          </View>
        ) : (
          <>
            {customersMetadata.config.pages.map((item: any, i: any) => {
              const jumpToAction = TabActions.jumpTo(item._id);

              return (
                <View key={i}>
                  <TouchableOpacity
                    style={styles.menuBoton}
                    onPress={() => {
                      item.layout.name == 'WEATHER_LAYOUT'
                        ? setModalVisibleee(true)
                        : navigation.dispatch(jumpToAction);
                      navigation.closeDrawer();
                    }}>
                    <Text style={[styles.menuTexto, {fontSize: 12 + (dataStore.fontSize)}]}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}

            <View style={styles.menuSettings}>
              <TouchableOpacity
                style={styles.menuBoton}
                onPress={() => navigation.navigate('SettingScreen')}>
                <Text style={[styles.menuTexto, {fontSize: 12 + (dataStore.fontSize)}]}>Settings</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {modalVisibleee && <ModalWeather status={setModalVisibleee} />}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    marginVertical: 30,
    marginHorizontal: 50,
  },
  menuBoton: {
    marginVertical: 12,
  },
  menuSettings: {
    marginTop: 8,
    borderTopColor: 'white',
    borderTopWidth: 1,
  },
  menuTexto: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  menuFijo: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
