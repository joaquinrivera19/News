import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useUserContext} from '../context/userProvider';
/* Components */
import ArticleCardsList from './ArticleCardsList';
/* Interfaces */
import Headline from './Headline';
import {TabActions, useNavigation} from '@react-navigation/native';

interface Props {
  section: any;
  main: any;
}

const components: any = {
  ArticleCardsList: ArticleCardsList,
};

export const DynamicComponente = ({
  section,
  customersMetadata,
  main,
  esChannel,
}: any) => {
  const navigation = useNavigation<any>();
  if (
    !section.header &&
    components[section.component] &&
    components[section.component].name === section.component
  ) {
    // console.log('section: ' + section.component);
    //console.log('components: ' + components[section.component].name)

    const Default = components[section.component];
    return (
      <Default
        item={section}
        customersMetadata={customersMetadata}
        main={main}
        esChannel={esChannel}
      />
    );
  } else {
    if (main && section.header) {
      return (
        <TouchableOpacity
          key={section.sectionId}
          activeOpacity={0.5}
          onPress={() => {
            const found = customersMetadata.config.pages.find(
              (page: any) => page.name === section.title,
            );

            const jumpToAction = TabActions.jumpTo(found._id);
            navigation.dispatch(jumpToAction);
          }}>
          <Headline item={section.title} />
        </TouchableOpacity>
      );
    } else {
      return (
        <ArticleCardsList
          item={section}
          customersMetadata={customersMetadata}
          main={main}
          esChannel={esChannel}
        />
      );
    }
  }
};

const SectionFlatList = ({section, main}: Props) => {
  const {customersMetadata, isLoading}: any = useUserContext();
  const [isItemVisible, setItemVisible] = useState(false);
  // const dataItem: any[] = section;
  const dataItem: any[] = [];
  const stickyHeadersIdx: number[] = [];
  //console.log(customersMetadata)

  section.map((s: any) => {
    if (s.title !== 'Channels') {
      dataItem.push({
        title: s.title,
        header: true,
        sectionId: s.sectionId,
        items: [],
      });
    }
    dataItem.push(s);
  });

  dataItem.map(item => {
    if (item.header) {
      stickyHeadersIdx.push(dataItem.indexOf(item));
    }
  });

  // console.log(
  //   '🚀 ~ file: SectionFlatList.tsx ~ line 67 ~ section.map ~ dataItem0',
  //   dataItem[0].title,
  // );
  // console.log(
  //   '🚀 ~ file: SectionFlatList.tsx ~ line 67 ~ section.map ~ dataItem1',
  //   dataItem[1].title,
  // );

  const onViewRef = React.useRef(async (i: any) => {
    const itemVisible = await i.viewableItems.find(
      (j: any) => j.item.title === 'Channels',
    );

    if (itemVisible === undefined) {
      console.log('NO es Channels');
      setItemVisible(false);
    } else {
      console.log('es Channels');
      setItemVisible(true);
    }
  });

  useEffect(() => {
    setItemVisible(isItemVisible);
  }, [isItemVisible]);

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 10});

  return (
    <View style={styles.container}>
      {!isLoading && (
        <FlatList
          data={dataItem}
          renderItem={({item}) => (
            <DynamicComponente
              section={item}
              customersMetadata={customersMetadata}
              main={main}
              esChannel={isItemVisible} // si es true es Channel sino no es Channel
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          stickyHeaderIndices={stickyHeadersIdx}
          // ListHeaderComponent={stickyHeader({item: {title: 'test'}})}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'yellow',
  },
});

export default SectionFlatList;
