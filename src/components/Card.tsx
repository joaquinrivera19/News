import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Label from './Label';
import moment from 'moment';
import {useUserContext} from '../context/userProvider';
import Title from './Title';
import Paragraph from './Paragraph';

const Card = ({item}: any) => {
  const {customersMetadata, isLoading}: any = useUserContext();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{
            uri: item.optimizedPoster
              ? item.optimizedPoster
              : customersMetadata.config.assets.placeholderLandscape,
          }}
          resizeMode="cover"
          style={styles.posterImage}
          defaultSource={require('../assets/placeholderLandscapeNative.jpg')}
          onError={({nativeEvent: {error}}) => console.log(error)}>
          {item?.videoUrl ? (
            <Image
              source={require('../assets/player.png')}
              resizeMode={'cover'}
              style={styles.iconPlay}
              defaultSource={require('../assets/player.png')}
            />
          ) : (
            <></>
          )}
        </ImageBackground>
      </View>

      <View style={styles.marginContainer}>
        <Title
          //theme={props.theme}
          title={item?.title}
          size="x-small"
          maxLines={3}
          align="left"
          //rtl={props.rtl}
        />

        <Paragraph
          //theme={props.theme}
          text={item?.description}
          size="small"
          maxLines={3}
          align="left"
          //rtl={props.rtl}
        />

        <View style={styles.infoPill}>
          <Label
            text={moment(new Date(Number(item?.date))).fromNow()}
            margin={{bottom: false}}
            theme="light"
            italic={false}
            rtl={false}
          />
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    //height: 350,
    overflow: 'hidden',
    backgroundColor: 'white',
    //marginVertical: 8,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    flex: 1,
    overflow: 'hidden',
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },

  posterImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'grey'
  },
  iconPlay: {
    opacity: 1,
    //backgroundColor: 'red',
    padding: 5,
    margin: 10,
    overflow: 'hidden',
    width: 52,
    height: 52,
  },
});
