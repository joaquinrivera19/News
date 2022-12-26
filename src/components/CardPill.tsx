import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Label from './Label';
import Paragraph from './Paragraph';
import Title from './Title';
import moment from 'moment';
import {ImageBackground} from 'react-native';
import {useUserContext} from '../context/userProvider';

const CardPill = ({item}: any) => {
  const {customersMetadata, isLoading}: any = useUserContext();
  return (
    <View style={styles.cardPillExtend}>
      <View>
        <ImageBackground
          source={{
            uri: item.optimizedPoster
              ? item.optimizedPoster
              : customersMetadata.config.assets.placeholderPortrait,
          }}
          resizeMode="cover"
          style={styles.posterImage}
          defaultSource={require('../assets/placeholderPortraitNative.jpg')}
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

      <View style={styles.contentPill}>
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

export default CardPill;

const styles = StyleSheet.create({
  cardPillExtend: {
    //overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    backgroundColor: 'white',

    borderColor: '#f2eeee',
    borderWidth: 1,
    borderRadius: 5,

    //Sombreado
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  contentPill: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 10,
    flex: 1,
    //backgroundColor:'red'
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rtl: {
    writingDirection: 'rtl',
  },
  ltr: {
    writingDirection: 'ltr',
  },

  posterImage: {
    //backgroundColor:'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 76,
    //height: 152,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  iconPlay: {
    opacity: 1,
    //backgroundColor: 'red',
    padding: 5,
    margin: 10,
    overflow: 'hidden',
    width: 40,
    height: 40,
  },
});
