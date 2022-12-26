import React, {useRef, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Animated, View} from 'react-native';
import {useNavigation, TabActions} from '@react-navigation/native';
/* Components */
import CardPill from './CardPill';
import Card from './Card';
import CardDetail from './CardDetail';
import Headline from './Headline';

type Nav = {
  navigate: (value: string, {}) => void;
};

const ArticleCardsList = ({item, customersMetadata, main, esChannel}: any) => {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}>
      {item.title === 'Channels' ? (
        <CardDetail item={item.items[0]} live={true} esChannel={esChannel} />
      ) : (
        <View>
          {/* {main && (
            <TouchableOpacity
              key={item.sectionId}
              activeOpacity={0.5}
              onPress={() => {
                const found = customersMetadata.config.pages.find((page:any) => page.name == item.title)
                const jumpToAction = TabActions.jumpTo(found._id);
                navigation.dispatch(jumpToAction);
              }}>
              <Headline item={item.title} />
            </TouchableOpacity>
          )} */}

          {item.items.map(
            (it: any, i: any) =>
              it.description && (
                <TouchableOpacity
                  key={it.id}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate('ArticleScreen', it);
                  }}>
                  {i == 0 ? <Card item={it} /> : <CardPill item={it} />}
                </TouchableOpacity>
              ),
          )}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default ArticleCardsList;
