import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ListGroup from '../components/ListGroup';
import ListItem from '../components/ListItem';
import {useUserContext} from '../context/userProvider';


const QuietTimeScreen = () => {
  const {dataStore, setStoreData}: any = useUserContext();
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const handleAction = (event: any) => {
    const data = {
      ...dataStore,
      quietTime: event,
    };
    setStoreData(data);
  };

  const formatAMPM = (date: any) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  return (
    <View style={styles.settingsWrapper}>
      <DatePicker
        modal
        open={openFrom}
        date={new Date(dataStore.quietTimeFromDate)}
        mode="time"
        onConfirm={date => {
          setOpenFrom(false);
          const data = {
            ...dataStore,
            quietTimeFromDate: date,
          };
          setStoreData(data);
        }}
        onCancel={() => {
          setOpenFrom(false);
        }}
      />
      <DatePicker
        modal
        open={openTo}
        date={new Date(dataStore.quietTimeToDate)}
        mode="time"
        onConfirm={date => {
          setOpenTo(false);
          const data = {
            ...dataStore,
            quietTimeToDate: date,
          };
          setStoreData(data);
        }}
        onCancel={() => {
          setOpenTo(false);
        }}
      />
      <ListGroup>

      <ListItem
          label="Enabled"
          switch={true}
          onActionFather={handleAction}
          value={dataStore.quietTime}
        />
        <TouchableOpacity onPress={() => setOpenFrom(true)}>
          <ListItem label={`From ${formatAMPM(new Date(dataStore.quietTimeFromDate))}`} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpenTo(true)}>
          <ListItem label={`To ${formatAMPM(new Date(dataStore.quietTimeToDate))}`} lastItem />
        </TouchableOpacity>
      </ListGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsWrapper: {
    position: 'relative',
    paddingVertical: 48,
  },
});

export default QuietTimeScreen;
