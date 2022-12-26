import React, {useContext, createContext, useState, useEffect} from 'react';
import {useCustomersMetadata} from '../hooks/useCustomersMetadata';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userContext = createContext({});

export function useUserContext() {
  return useContext(userContext);
}

export function UserProvider(props: any) {
  const {isLoading, customersMetadata} = useCustomersMetadata();
  const [dataStore, setDataStore] = useState({
    fontSize: 0,
    fontSizeSystem: true,
    quietTime: true,
    quietTimeFromDate: new Date(),
    quietTimeToDate: new Date(),
  });

  useEffect(() => {
    getStoreData();
  }, []);

  const getStoreData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      if (jsonValue != null) {
        const value = JSON.parse(jsonValue);
        setDataStore(value)
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setStoreData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      setDataStore(value)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <userContext.Provider
      value={{isLoading, customersMetadata, dataStore, setStoreData}}>
      {props.children}
    </userContext.Provider>
  );
}
