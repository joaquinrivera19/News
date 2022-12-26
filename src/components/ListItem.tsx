import React from 'react';
import {StyleSheet, Text, Switch, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useUserContext} from '../context/userProvider';

interface listItem {
  label?: string;
  icon?: boolean;
  switch?: boolean;
  version?: string;
  lastItem?: boolean;
  onActionFather?: any;
  value?: boolean;
}

const ListItem = (props: listItem) => {
  const {dataStore}: any = useUserContext();

  const toggleSwitch = () => {
    props.onActionFather(props.value ? false : true)
  };

  return (
    <View style={[styles.listItem, props.lastItem ? styles.lastItem : null]}>
      <Text style={[styles.label, {fontSize: 16 + (dataStore.fontSize)}]}>{props.label}</Text>
      {props.icon && (
        <Icon
          name="chevron-forward-outline"
          size={20}
          style={styles.iconRight}
        />
      )}
      {props.switch && (
        <Switch
          style={{
            transform: [{scaleX: 1.2}, {scaleY: 1.2}],
          }}
          trackColor={{false: '#767577', true: '#002a8b'}}
          thumbColor={props.value ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={props.value}
        />
      )}
      {props.version && (
        <Text style={[styles.textLowerContrast, {fontSize: 18 + (dataStore.fontSize)}]}>
          {props.version}
        </Text>
      )}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderColor: '#E1E1E1',
    borderTopWidth: 1,
  },
  lastItem: {
    borderColor: '#E1E1E1',
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: '500',
    color: '#000',
  },
  textLowerContrast: {
    color: '#CBCBCB',
    fontWeight: 'bold',
    paddingRight: 8,
  },
  iconRight: {
    fontSize: 22,
    color: '#CBCBCB',
  },
});
