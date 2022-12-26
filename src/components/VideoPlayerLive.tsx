import React, {useEffect, useState} from 'react';
import {StyleSheet, View, useWindowDimensions, Modal} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import CWebView from './CWebView';
import Orientation from 'react-native-orientation-locker';

const VideoPlayerLive = ({item, live, isPCH}: any) => {
  const {height, width} = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const {top} = useSafeAreaInsets();

  useEffect(() => {
    if (!isNative) {
      if (isPCH == 'landscape') {
        setModalVisible(true);
        Orientation.lockToLandscape();
      }

      if (isPCH == 'portrait' || isPCH == 'none') {
        setModalVisible(false);
        Orientation.lockToPortrait();
      }
    } else {
      if (isPCH == 'landscape') {
        Orientation.lockToLandscape();
      }

      if (isPCH == 'portrait' || isPCH == 'none') {
        Orientation.lockToPortrait();
      }
    }
  }, [isPCH]);

  const onMessage = (data?: any) => {
    //console.log(data.nativeEvent.data); // fullscreenBeforeEnter

    if (modalVisible) {
      setModalVisible(false);
      Orientation.lockToPortrait();
      setIsNative(false);
    } else {
      setModalVisible(true);
      Orientation.unlockAllOrientations();
      setIsNative(true);
    }
  };

  return (
    <View style={styles.mainPlayerView}>
      {!modalVisible ? (
        <View
          style={{
            width: '100%',
            backgroundColor: 'gray',
            height: height / 3,
          }}>
          <CWebView
            item={item}
            live={live}
            onMessage={onMessage}
            isModal={modalVisible}
          />
        </View>
      ) : (
        <Modal
          visible={modalVisible} //modalVisible
          animationType="fade"
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right',
          ]}
          style={{
            width: width,
            backgroundColor: 'gray',
            height: '100%',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#0b0b0b',
              width: width,
              height: '100%',
              /* justifyContent: 'center', */
              /* alignItems: 'center', */
            }}>
            <CWebView
              item={item}
              live={live}
              onMessage={onMessage}
              isModal={modalVisible}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default VideoPlayerLive;

const styles = StyleSheet.create({
  mainPlayerView: {
    flex: 1,
  },
});
