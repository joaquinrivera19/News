import React from 'react'
import {StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../context/userProvider';

const Paragraph = (props: any) => {
  const {dataStore}: any = useUserContext();
  return (
    <View>
      <Text
        style={[
          styles.paragraph,
          props.size == 'x-large' && (styles.xLarge, {fontSize: 36 + (dataStore.fontSize)}),
          props.size == 'large' && (styles.large, {fontSize: 24 + (dataStore.fontSize)}),
          props.size == 'medium' && (styles.medium, {fontSize: 20 + (dataStore.fontSize)}),
          props.size == 'small' && (styles.small, {fontSize: 13 + (dataStore.fontSize)}),
          props.theme == 'dark' && styles.dark,
          props.theme == 'light' && styles.light,
          props.align == 'left' && styles.left,
          props.align == 'center' && styles.center,
          props.align == 'right' && styles.right,
          //(props.rtl && styles.rtl) || styles.ltr,
          props.overflow && styles.overflow,
        ]}
        numberOfLines={props.maxLines}
        ellipsizeMode='tail'>
        {props.text}
      </Text>
    </View>
  );
};

Paragraph.defaultProps = {
  text: "",
  size: 'medium',
  align: 'center',
  theme: 'dark',
  rtl: true,
  maxLines: 0,
  overflow: false
};

export default Paragraph;

const styles = StyleSheet.create({
  paragraph: {
    position: 'relative',
    fontWeight: 'normal',
  },
  small: {
    lineHeight: 15,
  },
  medium: {
    lineHeight: 24,
  },
  large: {
    lineHeight: 32,
  },
  xLarge: {
    lineHeight: 48,
  },
  dark: {
    color: '#000',
  },
  light: {
    color: '#000',
  },
  left: {
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 4,
  },
  rtl: {
    writingDirection: 'rtl',
  },
  ltr: {
    writingDirection: 'ltr',
  },
  overflow: {
    overflow: 'hidden',
  },
});
