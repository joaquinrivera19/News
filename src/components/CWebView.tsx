import React, {useRef} from 'react';
import {StyleSheet, View, ActivityIndicator,useWindowDimensions} from 'react-native';
import {WebView} from 'react-native-webview';

const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator color="#009688" size={30} />
    </View>
  );
};

const CWebView = ({item, live, onMessage, isModal}: any) => {
  const webviewRef = useRef<any>();
  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        scalesPageToFit={false}
        mixedContentMode="compatibility"
        onMessage={onMessage}
        source={{
          uri: `https://snippet.univtec.com/player-mobile.html?stream=${
            item?.videoUrl
          }${live ? '&live=true' : ''}`,
        }}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicatorElement />}
        style={{width: width, backgroundColor: '#0b0b0b'}}
      />
    </View>
  );
};

export default CWebView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
