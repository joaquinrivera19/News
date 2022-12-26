import React from 'react';
import {View, StyleSheet} from 'react-native';
import Title from './Title';
import {useUserContext} from '../context/userProvider';
import Icon from 'react-native-vector-icons/Ionicons';

const Headline = ({item}: any) => {
  const {customersMetadata, isLoading}: any = useUserContext();
  return (
    <View
      style={{
        paddingTop: 8,
        paddingHorizontal: 16,
        backgroundColor:
          !isLoading &&
          customersMetadata.config.theme.colorPalette.dark.primary,
        //marginTop: 16,
        flex: 1,
        flexDirection: 'row'
      }}>
      <View style={{flex: 1, marginBottom:8}}>
        <Title
          //theme={props.theme}
          title={item}
          size="x-small"
          maxLines={2}
          align="left"
          //rtl={props.rtl}
          //theme="dark"
          color={'#fff'}
        />
      </View>
      <View style={{flex: 1, alignItems:'flex-end', marginTop: -2}}>
        <Icon
          name="chevron-forward-outline"
          size={20}
          style={styles.iconImg}
          //onPress={onShare}
        ></Icon>
      </View>
    </View>
  );
};

export default Headline;

const styles = StyleSheet.create({
  iconImg: {
    color: 'white'
  },
});
