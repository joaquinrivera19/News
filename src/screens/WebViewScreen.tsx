import React from 'react';
import {View, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = ({route}) => {
  const {uri, hideTop} = route.params;
  return (
    <View style={styles.webViewWrapper}>
      <WebView
        style={{marginTop: hideTop || 0}}
        source={{
          uri: uri,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  webViewWrapper: {
    flex: 1,
    position: 'relative',
    paddingVertical: 48,
  },
});

export default WebViewScreen;
