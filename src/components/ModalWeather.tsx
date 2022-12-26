import React, {useState} from 'react';
import {Modal, StyleSheet, View, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';
import {useUserContext} from '../context/userProvider';

const ModalWeather = ({status}: any) => {
  const {customersMetadata, isLoading}: any = useUserContext();
  const [modalWeatherVisible, setModalWeatherVisible] = useState(false);

  const _onMessage = (event: any) => {
    if (event.nativeEvent.data === 'renderLoading') {
      setModalWeatherVisible(true);
    }
  };

  return (
    <Modal
      style={{
        height: '100%',
      }}
      animationType="slide"
      visible={true}>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color="black" size={20} />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: '#002a8b'}}>
          <TouchableOpacity
            style={styles.greenbox}
            onPress={() => status(false)}>
            <Icon
              name="arrow-back-outline"
              color="white"
              size={35}
              style={styles.icon}
            />
          </TouchableOpacity>

          <View style={{flex: 1, backgroundColor: '#002a8b'}}>
            {!modalWeatherVisible && (
              <View style={styles.loadingIndicator}>
                <ActivityIndicator color="white" size={20} />
              </View>
            )}
            <WebView
              style={[
                modalWeatherVisible ? {opacity: 1} : {opacity: 0},
                {backgroundColor: '#002a8b'},
              ]}
              source={{
                uri: `${customersMetadata.config.template.coreComponents[0].platform.mobile.metadata.url}&locations=${customersMetadata.config.features.weather.locations[0].city};${customersMetadata.config.features.weather.locations[0].lat},${customersMetadata.config.features.weather.locations[0].lon}`,
              }}
              onMessage={_onMessage}
            />
          </View>
        </View>
      )}
    </Modal>
  );
};

export default ModalWeather;

const styles = StyleSheet.create({
  greenbox: {
    position: 'relative',
    width: 70,
    height: 70,
    top: 20,
    //backgroundColor: '#62a60f',
    alignContent: 'flex-start',
  },
  icon: {
    margin: 15,
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'yellow'
  },
});
