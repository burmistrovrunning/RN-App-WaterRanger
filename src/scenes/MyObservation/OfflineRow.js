import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { styles as addStyles } from '../../styles/scenes/Add';

const moment = require('moment');

const OfflineRow = (props) => {
  const item = props.observations ? props.observations[0] : props.issues[0];
  const obsTitle = item.location_attributes.body_of_water;
  const obsDate = moment(item.observed_on).format('MMMM Do YYYY, h:mm a').toUpperCase();
  return (
    <View style={addStyles.offlineListRowContainer}>
      <Text style={addStyles.offlineListTitle}>{obsTitle}</Text>
      <Text style={addStyles.offlineListDate}>{obsDate}</Text>
    </View>
  );
};

export default OfflineRow;
