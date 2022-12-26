import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../context/userProvider';

const Title = (props: any) => {
  const {dataStore}: any = useUserContext();
  return (
    <View>
      <Text
        style={[
          styles.title,
          props.size == 'x-large' && (styles.xLarge, {fontSize: 68 + (dataStore.fontSize)}),
          props.size == 'large' && (styles.large, {fontSize: 48 + (dataStore.fontSize)}),
          props.size == 'medium' && (styles.medium, {fontSize: 28 + (dataStore.fontSize)}),
          props.size == 'small' && (styles.small, {fontSize: 20 + (dataStore.fontSize)}),
          props.size == 'x-small' && (styles.xSmall, {fontSize: 16 + (dataStore.fontSize)}),
          props.theme == 'dark' && styles.dark,
          props.theme == 'light' && styles.light,
          props.align == 'left' && styles.left,
          props.align == 'center' && styles.center,
          props.align == 'right' && styles.right,
          //(props.rtl && styles.rtl) || styles.ltr,
          props.overflow && styles.overflow,
          {color: props.color},
        ]}
        numberOfLines={props.maxLines}
        ellipsizeMode="tail">
        {props.title}
      </Text>
    </View>
  );
};

Title.defaultProps = {
  title: '',
  size: 'large',
  align: 'center',
  theme: 'dark',
  rtl: true,
  maxLines: 0,
  overflow: true,
};
export default Title;

const styles = StyleSheet.create({
  title: {
    position: 'relative',
    fontWeight: '700',
    letterSpacing: 0.5,
    wordBreak: 'break-all',
  },
  small: {
    lineHeight: 22,
    fontWeight: '700',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 0,
  },
  xSmall: {
    lineHeight: 18,
    fontWeight: '700',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
  },
  medium: {
    lineHeight: 32,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 0,
    fontWeight: '700',
  },
  large: {
    lineHeight: 56,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 32,
    marginLeft: 0,
  },
  xLarge: {
    lineHeight: 80,
    //maxWidth: 50,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 56,
    marginLeft: 0,
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
