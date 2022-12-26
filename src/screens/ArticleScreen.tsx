import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {RootStackParams} from '../navigation/StackNavigator';
/* Components */
import CardDetail from '../components/CardDetail';
/* Hooks */
import {useArticleById} from '../hooks/useArticleById';
import Weather from '../components/Weather';

interface Props extends StackScreenProps<RootStackParams, 'ArticleScreen'> {}
//interface Props extends DrawerScreenProps<any, any> {}

const ArticleScreen = ({route, navigation}: Props) => {
  const params = route.params;
  const {isLoading, articleByID} = useArticleById(params.id, params.type);
  const [isItemVisible, setItemVisible] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Weather />,
    });
  }, []);

  const handleScroll = (event: any) => {
    console.log(event.nativeEvent.contentOffset.y);

    if (event.nativeEvent.contentOffset.y <= 200){
      console.log('En foco')
      setItemVisible(true)
    } else {
      console.log('Perdio el foco')
      setItemVisible(false)
    }
   }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color="black" size={30} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
          <CardDetail item={articleByID} live={false} isItemVisible={isItemVisible}/>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
  },
});

export default ArticleScreen;
