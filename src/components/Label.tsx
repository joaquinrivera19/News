import React from 'react'
import {StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../context/userProvider';

const Label = (props: any) => {
  const {customersMetadata, isLoading, dataStore}: any = useUserContext();
  const labelStyles = [
    styles.label,
    props.align == 'left' && styles.left,
    props.align == 'center' && styles.center,
    props.align == 'right' && styles.right,
    (props.rtl ? styles.rtl : styles.ltr),
    props.overflow && styles.overflow,
    props.italic && styles.italic,
    {color: !isLoading && customersMetadata.config.theme.colorPalette.dark.primary},
    {fontSize: 13 + (dataStore.fontSize)}
  ];
  return (
    <View>
      <Text style={labelStyles} numberOfLines={props.maxLines}>
        {props.text}
      </Text>
    </View>
  );
};

Label.defaultProps = {
  text: "",
  align: 'center',
  theme: 'dark',
  rtl: true,
  maxLines: 0,
  overflow: false,
};

export default Label;

const styles = StyleSheet.create({
  label: {
    position: 'relative',
    marginBottom: 5,
    fontWeight: 'normal',
    opacity: 0.7
  },
  dark: {
    color: '#C5263C',
  },
  italic: {
    fontStyle: 'italic',
  },
  light: {
    color: '#C5263C',
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
    marginBottom: 4,
    marginLeft: 0,
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
