import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WebView from 'react-native-webview';
import ModalWeather from './ModalWeather';

const Weather = () => {
  const [modalVisibleee, setModalVisibleee] = useState(false);

  const _onMessage = (event: any) => {
    const res = JSON.parse(event.nativeEvent.data);
    if (res.message === 'ok') {
      setModalVisibleee(true);
    }
  };

  let jsCode = `

setTimeout(function() { 
  const img = document.querySelector('img');

  img.addEventListener('click', (event) => {
    window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : "ok"}))
  });

}, 2000);
true;
`;

  return (
    <View>
      <View style={styles.mainPlayerView}>
        <View
          style={{
            //backgroundColor: 'yellow',
            width: 80,
            height: 28,
          }}>
          <WebView
            injectedJavaScript={jsCode}
            javaScriptEnabledAndroid={true}
            onMessage={_onMessage}
            source={{
              uri: 'https://urchin-app-946ds.ondigitalocean.app/weather?secret=e2968b67-87eb-4744-adf0-3ef15f0aca49',
            }}
            style={{marginHorizontal: 10}}
          />
        </View>
      </View>

      {modalVisibleee && (
        <ModalWeather
          status={setModalVisibleee}
        />
      )}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  mainPlayerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red'
  },
});
