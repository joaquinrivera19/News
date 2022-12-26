import React from 'react';
import {Image, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useUserContext} from '../context/userProvider';

const Header = () => {
  const {customersMetadata, isLoading}: any = useUserContext();

  return (
    <View style={styles.contenido}>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color="black" size={20} />
        </View>
      ) : (
        <Image
          source={{uri: customersMetadata?.config?.assets?.logo}}
          style={styles.img}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  img: {
    width: 107,
    height: 38,
    //backgroundColor: 'blue'
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'yellow'
  },
});

export default Header;
