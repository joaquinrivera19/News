import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../context/userProvider';

interface listGroup {
  title?: string;
  children: React.ReactNode;
  firstGroup?: boolean;
}

const ListGroup = (props: listGroup) => {
  const {dataStore}: any = useUserContext();
  return (
    <View style={[styles.listGroup, props.firstGroup && styles.listFirstGroup]}>
      {props.title && <Text style={[styles.listTitle, {fontSize: 12 + (dataStore.fontSize)}]}>{props.title}</Text>}
      {props.children}
    </View>
  );
};

export default ListGroup;

const styles = StyleSheet.create({
  listGroup: {
    marginBottom: 24,
  },
  listFirstGroup: {
    marginTop: 24,
  },
  listTitle: {
    paddingLeft: 12,
    marginBottom: 8,
  },
});
