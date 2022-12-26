import React, {useCallback} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Components
import ListGroup from '../components/ListGroup';
import ListItem from '../components/ListItem';

const SettingScreen = () => {
  const navigation = useNavigation<any>();

  const openAppSettings = useCallback(async () => {
    await Linking.openSettings();
  }, []);

  const openAppMail = useCallback(async (email: any, subject: any) => {
    await Linking.openURL(`mailto:${email}?cc=&subject=${subject}&body=`);
  }, []);

  const openAppCall = useCallback(async (nro: any) => {
    await Linking.openURL(`tel:${nro}`);
  }, []);

  return (
    <ScrollView style={styles.settingsWrapper}>
      {/* Options */}
      <ListGroup title="OPTIONS" firstGroup>
        <TouchableOpacity
          onPress={() => {
            Platform.OS == 'android'
              ? openAppSettings()
              : navigation.navigate('FontSizeScreen');
          }}>
          <ListItem label="Font Size" icon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('QuietTimeScreen');
          }}>
          <ListItem label="Quiet Time" icon lastItem />
        </TouchableOpacity>
      </ListGroup>
      {/* Push Notifications */}
      <ListGroup title="PUSH NOTIFICATIONS">
        <ListItem label="Enable Notifications" switch lastItem />
      </ListGroup>
      {/* Support */}
      <ListGroup title="SUPPORT">
        <TouchableOpacity
          onPress={() => {
            openAppMail('newsteam@kten.com', 'News Tip');
          }}>
          <ListItem label="Send us a news tip" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            openAppMail('newsteam@kten.com', 'Photo To Share');
          }}>
          <ListItem label="Share a photo" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            openAppCall('9034655836');
          }}>
          <ListItem label="Call us" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            openAppMail('newsteam@kten.com', 'Bug Report');
          }}>
          <ListItem label="Report a bug" lastItem />
        </TouchableOpacity>
      </ListGroup>
      {/* Information */}
      <ListGroup title="INFORMATION">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('WebViewScreen', {
              title: 'Privacy Policy',
              hideTop: -280,
              uri: 'https://www.kten.com/story/18990/privacy-policy',
            });
          }}>
          <ListItem label="Privacy Policy" icon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('WebViewScreen', {
              title: 'Terms of service',
              hideTop: -280,
              uri: 'https://www.kten.com/story/18991/terms-of-service',
            });
          }}>
          <ListItem label="Terms of Service" icon />
        </TouchableOpacity>
        <ListItem label="App Version" version="1.0.0" />
        <ListItem label="Frankly Version" version="1.0.0" />
        <ListItem label="Build Number" version="1.0.0" lastItem />
      </ListGroup>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settingsWrapper: {
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
});

export default SettingScreen;
