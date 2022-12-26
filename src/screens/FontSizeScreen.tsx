import React, { useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {Slider} from '@miblanchard/react-native-slider';
import {useUserContext} from '../context/userProvider';

//Components
import ListGroup from '../components/ListGroup';
import ListItem from '../components/ListItem';

const CustomThumb = () => {
  return <View style={styles.markSliderActive} />;
};

const FontSizeScreen = () => {
  const {dataStore, setStoreData}: any = useUserContext();
  const [dataFontSize, setDataFontSize] = useState(dataStore.fontSize);
  const sizes = [-8, -4, 0, 4, 8, 12, 16];

  const handleAction = (event: any) => {
    const data = {
      ...dataStore,
      fontSizeSystem: event,
      fontSize: 0,
    };
    setDataFontSize(0)
    setStoreData(data);
  };

  const onValueChange = (value: any) => {
    const data = {
      ...dataStore,
      fontSize: value[0],
    };
    setDataFontSize(value[0])
    setStoreData(data);
  };

  return (
    <View style={styles.settingsWrapper}>
      <ListGroup>
        <ListItem
          label="Use System Text Size"
          switch
          lastItem
          onActionFather={handleAction}
          value={dataStore.fontSizeSystem}
        />
        <Text
          style={[
            styles.settingsBody,
            {fontSize: 18 + (dataFontSize)},
          ]}>
          We'll adjust font sizes in the app to match your reading preferences.
          Just drag the slider.
        </Text>
      </ListGroup>
      <Text
        style={[
          styles.settingsBody,
          {fontSize: 18 + (dataFontSize)},
        ]}>
        Drag the slider below
      </Text>
      <View
        style={[
          styles.sliderSize,
          dataStore.fontSizeSystem
            ? {backgroundColor: '#eaeaea'}
            : {backgroundColor: 'white'},
        ]}>
        <Slider
          disabled={dataStore.fontSizeSystem}
          value={dataFontSize}
          minimumValue={-8}
          maximumValue={16}
          step={4}
          trackMarks={sizes}
          thumbTintColor="#fff"
          trackStyle={styles.trackSlider}
          minimumTrackTintColor="#E1E1E1"
          maximumTrackTintColor="#E1E1E1"
          thumbStyle={styles.thumbSlider}
          renderTrackMarkComponent={CustomThumb}
          onValueChange={value => onValueChange(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsWrapper: {
    position: 'relative',
    paddingVertical: 20,
    backgroundColor: '#F5F5F5',
  },
  settingsBody: {
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
    //lineHeight: 24,
    alignSelf: 'center',
    maxWidth: 375,
    fontWeight: '600',
  },
  sliderSize: {
    borderColor: '#E1E1E1',
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  thumbSlider: {
    elevation: 8,
    width: 30,
    height: 30,
    borderRadius: 100,
    shadowColor: 'black',
    borderColor: '#F5F5F5',
    borderWidth: 1,
  },
  trackSlider: {
    height: 2,
    backgroundColor: '#E1E1E1',
  },
  markSliderActive: {
    width: 2,
    height: 16,
    left: 20,
    backgroundColor: '#E1E1E1',
  },
});

export default FontSizeScreen;
