import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { styles as addStyles } from '../../styles/scenes/Add';

const moment = require('moment');

const OfflineRow = (props) => {
  const obsTitle = props.observations[0].location_attributes.body_of_water;
  const obsDate = moment(props.observations[0].observed_on).format('MMMM Do YYYY, h:mm a').toUpperCase();
  return (
    <View style={addStyles.offlineListRowContainer}>
      <Text style={addStyles.offlineListTitle}>{obsTitle}</Text>
      <Text style={addStyles.offlineListDate}>{obsDate}</Text>
    </View>
  );
};

export default OfflineRow;
