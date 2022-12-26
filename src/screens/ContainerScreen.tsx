import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {TopTabNavigator} from '../navigation/TopTabNavigator';
import Weather from '../components/Weather';

interface Props extends DrawerScreenProps<any, any> {}

const ContainerScreen = ({navigation}: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          name="menu-outline"
          color="black"
          size={30}
          style={styles.icon}
          onPress={() => navigation.toggleDrawer()}></Icon>
      ),

      headerRight: () => <Weather />,
    });
  }, []);

  return <TopTabNavigator />;
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
});

export default ContainerScreen;
