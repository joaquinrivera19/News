import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator, Text, Alert} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useFocusEffect} from '@react-navigation/native';
/* Hooks */
import {useSectionsData} from '../hooks/useSectionsData';
import {useUserContext} from '../context/userProvider';
/* Components */
import SectionFlatList from '../components/SectionFlatList';
/* Interfaces */
import {GetSectionsData} from '../interfaces/getSectionsDataInterfaces';

const Tab = createMaterialTopTabNavigator();

const ItemTab = (props: any) => {
  /*     console.log(props)
  console.log('route')
  console.log(props.nave.route.name) */

  const {isLoading, sectionsData, loadData} = useSectionsData(
    props.nave.route.name,
  );

  const [isMain, setIsMain] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      //Alert.alert('Screen is focused', props.nave.route.name);

      //console.log(props.headline)
      setIsMain(props.headline);

      //console.log(props.nave.route.name);

      //setIsLoading(true); // Comento esto para que no recarga cada vez
      loadData();

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        //Alert.alert('Screen is unfocused', props.nave.route.name);
      };
    }, []),
  );

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color="black" size={30} />
        </View>
      ) : (
        <SectionFlatList section={sectionsData.sections} main={isMain} />
      )}
    </View>
  );
};

export const TopTabNavigator = () => {
  const {customersMetadata, isLoading, dataStore}: any = useUserContext();

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color="black" size={30} />
        </View>
      ) : (
        <Tab.Navigator
          screenListeners={{
            state: (e: any) => {
              // Do something with the state
              //console.log('state changed', e.data.state.index);
            },
          }}
          style={{paddingTop: 5}}
          sceneContainerStyle={{
            backgroundColor: '#F7F7F7',
          }}
          screenOptions={{
            lazy: true,
            tabBarActiveTintColor: 'black',
            tabBarScrollEnabled: true,
            tabBarLabelStyle: {fontSize: 11 + (dataStore.fontSize), fontWeight: '600'}, //margin:0
            tabBarItemStyle: {width: 'auto'},
            tabBarStyle: {
              backgroundColor: 'white',
            },
            tabBarPressOpacity: 0.5,
            tabBarIndicatorStyle: {
              backgroundColor:
                !isLoading &&
                customersMetadata.config.theme.colorPalette.dark.primary,
            },
          }}>
          {customersMetadata.config.pages.map((item: any, i: any) => (
            <Tab.Screen
              key={i}
              name={item._id}
              children={props => (
                <ItemTab
                  id={item._id}
                  index={i}
                  nave={props}
                  headline={item.main}
                />
              )}
              options={{title: item.name}}
            />
          ))}
        </Tab.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
