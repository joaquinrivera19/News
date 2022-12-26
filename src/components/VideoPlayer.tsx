import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CWebView from './CWebView';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import Orientation from 'react-native-orientation-locker';

const VideoPlayer = ({item, live, isPCH, onActionFather}: any) => {
  const {height} = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [isNative, setIsNative] = useState(false);

  const navigation = useNavigation();

  const clickButton = () => {
    setModalVisible(false);
    onActionFather(false);

    navigation.setOptions({
      // Activar cuando NO es pantalla completa
      headerShown: true,
      headerTitle: () => <Header />,
    });
  };

  useEffect(() => {
    if (!isNative) {
      if (isPCH == 'Play&isItemVisible') {
        navigation.setOptions({
          // Activar cuando es pantalla completa
          headerShown: false,
        });
        setModalVisible(true);
        onActionFather(true);
        Orientation.lockToLandscape();
      }

      if (isPCH == 'portrait' || isPCH == 'none') {
        navigation.setOptions({
          // Activar cuando NO es pantalla completa
          headerShown: true,
          headerTitle: () => <Header />,
        });
        setModalVisible(false);
        onActionFather(false);
        Orientation.lockToPortrait();
      }
    } else {
      if (isPCH == 'Play&isItemVisible') {
        Orientation.lockToLandscape();
      }

      if (isPCH == 'portrait' || isPCH == 'none') {
        Orientation.lockToPortrait();
      }
    }
  }, [isPCH]);

  const onMessage = (data?: any) => {
    //console.log(data.nativeEvent.data);

    if (!isNative) {
      if (
        isPCH == 'Play&isItemVisible' &&
        data.nativeEvent.data == 'fullscreenBeforeEnter'
      ) {
        navigation.setOptions({
          // Activar cuando NO es pantalla completa
          headerShown: true,
          headerTitle: () => <Header />,
        });
        //Orientation.lockToPortrait();
        setModalVisible(false);
        onActionFather(false);
        Orientation.lockToPortrait();
        setIsNative(false);
      }

      if (
        isPCH == 'Play&isItemVisible' &&
        data.nativeEvent.data == 'fullscreenExit'
      ) {
        navigation.setOptions({
          // Activar cuando NO es pantalla completa
          headerShown: true,
          headerTitle: () => <Header />,
        });
        //Orientation.lockToPortrait();
        setModalVisible(false);
        onActionFather(false);
        Orientation.lockToPortrait();
        setIsNative(false);
      }

      if (
        (isPCH == 'portrait' || isPCH == 'none') &&
        data.nativeEvent.data == 'fullscreenExit'
      ) {
        navigation.setOptions({
          // Activar cuando es pantalla completa
          headerShown: false,
        });
        //Orientation.lockToLandscape();
        setModalVisible(true);
        onActionFather(true);
        Orientation.unlockAllOrientations();
        setIsNative(true);
      }

      if (
        (isPCH == 'portrait' || isPCH == 'none') &&
        data.nativeEvent.data == 'fullscreenBeforeEnter'
      ) {
        navigation.setOptions({
          // Activar cuando es pantalla completa
          headerShown: false,
        });
        //Orientation.lockToLandscape();
        setModalVisible(true);
        onActionFather(true);
        Orientation.unlockAllOrientations();
        setIsNative(true);
      }
    } else {
      if (data.nativeEvent.data == 'fullscreenBeforeEnter') {
        navigation.setOptions({
          // Activar cuando es pantalla completa
          headerShown: false,
        });
        //Orientation.lockToLandscape();
        setModalVisible(true);
        onActionFather(true);
        Orientation.unlockAllOrientations();
        setIsNative(true);
      }

      if (data.nativeEvent.data == 'fullscreenExit') {
        navigation.setOptions({
          // Activar cuando NO es pantalla completa
          headerShown: true,
          headerTitle: () => <Header />,
        });
        //Orientation.lockToPortrait();
        setModalVisible(false);
        onActionFather(false);
        Orientation.lockToPortrait();
        setIsNative(false);
      }
    }
  };

  return (
    <View style={styles.mainPlayerView}>
      <View
        style={[
          styles.viewPlayer,
          modalVisible ? {height: height} : {height: 300},
        ]}>
        {modalVisible && (
          /*           <TouchableOpacity
            style={styles.greenbox}
            onPress={() => clickButton()}>
            <Icon
              name="arrow-back-outline"
              color="white"
              size={35}
              style={styles.icon}></Icon>
          </TouchableOpacity> */

          <></>
        )}

        <CWebView
          item={item}
          live={live}
          onMessage={onMessage}
          isModal={false}
        />
      </View>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  mainPlayerView: {
    flex: 1,
    position: 'relative',
  },
  viewPlayer: {
    width: '100%',
    backgroundColor: 'gray',
  },
  greenbox: {
    position: 'absolute',
    zIndex: 1,
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
});
