import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Share,
  Alert,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import Label from './Label';
import moment from 'moment';
import {GetArticleByID} from '../interfaces/getArticleByIdInterfaces';

import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from './VideoPlayer';

import VideoPlayerLive from './VideoPlayerLive';
import Title from './Title';
import Paragraph from './Paragraph';

import {useDeviceOrientationChange} from 'react-native-orientation-locker';
import {useUserContext} from '../context/userProvider';

type Nav = {
  navigate: (value: string, {}) => void;
};

const CardDetail = (props: any) => {
  const [isPlay, setIsPlay] = useState(false);
  const item = props.item as GetArticleByID;
  const [modalVisible, setModalVisible] = useState(false);

  const {dataStore}: any = useUserContext();

  const plive = props.live;
  const esChannel = props.esChannel;

  const [isPCH, setIsPCH] = useState('none');

  const handleAction = (event:any) => {
    console.log('Child did:', event);
    setModalVisible(event)
  }

  /*   console.log(isPlay ? 'esta en play' : 'no esta en play')
  console.log(esChannel ? 'esta en esChannel' : 'no esta en esChannel') */

  const otro = useDeviceOrientationChange(o => {
    // Handle device orientation change
    console.log('Handle device orientation change ', o);

    if (o == 'LANDSCAPE-RIGHT' || o == 'LANDSCAPE-LEFT') {
      if (isPlay && esChannel) {
        //Esta en play y esta en channel
        console.log('Esta en play, es channel y esta en modo horizontal');

        setIsPCH('landscape');
      } else if(isPlay && props.isItemVisible) {
        console.log('Play&isItemVisible')
        setIsPCH('Play&isItemVisible');
      } else {
        setIsPCH('none');
      }
    } else {
      setIsPCH('portrait');
    }
  });

  const {width} = useWindowDimensions();

  const source = {
    html: item?.longDescription ? item?.longDescription : '',
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: item?.title + ' - ' + item?.description,
        url: item?.link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.imageBorder}>
          {isPlay ? (
            <View>
              {plive ? (
                <VideoPlayerLive item={item} live={plive} isPCH={isPCH} />
              ) : (
                <VideoPlayer item={item} live={plive} isPCH={isPCH} onActionFather={handleAction}/>
              )}
            </View>
          ) : (
            <ImageBackground
              source={{uri: item?.poster}}
              resizeMode="cover"
              style={styles.posterImage}
              defaultSource={require('../assets/imagen_default_card.png')}
              onError={({nativeEvent: {error}}) => console.log(error)}>
              <View style={styles.viewImg}>
                {item?.description && (
                  <View style={styles.viewImgIcon}>
                    <Icon
                      name="share-social"
                      size={20}
                      style={styles.iconImg}
                      onPress={onShare}></Icon>
                  </View>
                )}
              </View>

              {item?.videoUrl ? (
                <TouchableOpacity
                  style={styles.viewPlay}
                  activeOpacity={0.5}
                  onPress={() => setIsPlay(true)}>
                  <Image
                    source={require('../assets/player.png')}
                    resizeMode={'cover'}
                    style={styles.iconPlay}
                    defaultSource={require('../assets/player.png')}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.viewPlay}></View>
              )}

              <View style={styles.viewHidden}></View>
            </ImageBackground>
          )}
        </View>

        {(!modalVisible && item?.description) && (
          <View style={styles.marginContainer}>
            {item.imageCaption && (
              <Text style={[styles.imageCaption, {fontSize: 13 + (dataStore.fontSize)}]}>{item.imageCaption}</Text>
            )}

            <Title
              //theme={props.theme}
              title={item?.title}
              size="small"
              //maxLines={3}
              align="left"
              //rtl={props.rtl}
            />

            <Paragraph
              //theme={props.theme}
              text={item?.description}
              size="small"
              //maxLines={3}
              align="left"
              //rtl={props.rtl}
            />

            {item.author && <Text style={[styles.author, {fontSize: 13 + (dataStore.fontSize)}]}>By {item.author}</Text>}

            <View style={styles.infoPill}>
              {item.dateUpdate && (
                <Label
                  text={
                    'Updated: ' +
                    moment(new Date(Number(item?.dateUpdate))).fromNow()
                  }
                  margin={{bottom: false}}
                  theme="light"
                  italic={false}
                  rtl={false}
                />
              )}

              <Label
                text={
                  'Posted: ' + moment(new Date(Number(item?.date))).fromNow()
                }
                margin={{bottom: false}}
                theme="light"
                italic={false}
                rtl={false}
              />
            </View>
          </View>
        )}
      </View>

      {(!modalVisible && item?.description) && (
        <View style={styles.containerBody}>
          <Text style={{fontSize: 16 + (dataStore.fontSize)}}>
            <RenderHtml contentWidth={width} source={source} />
          </Text>
        </View>
      )}
    </View>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  container: {
    //height: 350,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  containerBody: {
    //height: 350,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  imageBorder: {
    flex: 1,
    //overflow: 'hidden',
  },
  posterImage: {
    flex: 1,
    width: '100%',
    height: 200,
  },

  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  infoPill: {
    alignItems: 'flex-start',
    marginVertical: 15,
  },

  viewImg: {
    flex: 0.3,
    //backgroundColor: 'blue',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  viewImgIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b6374b',
    margin: 10,
    width: 40,
    height: 40,
    borderRadius: 1000,
  },
  iconImg: {
    color: 'white',
    backgroundColor: '#b6374b',
  },

  viewPlay: {
    flex: 0.4,
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlay: {
    opacity: 1,
    //backgroundColor:'red',
    padding: 5,
    margin: 10,
    overflow: 'hidden',
    width: 52,
    height: 52,
  },

  viewHidden: {
    flex: 0.3,
    //backgroundColor: 'green',
  },

  imageCaption: {
    lineHeight: 15,
    color: 'grey',
    marginBottom: 15,
  },

  author: {
    lineHeight: 15,
    color: 'black',
    marginTop: 15,
    fontWeight: '500',
  },
});
