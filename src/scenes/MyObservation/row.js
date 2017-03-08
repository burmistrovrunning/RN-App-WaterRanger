import React, { Component } from 'react';
import { 
  View, 
  Text 
} from 'react-native';
import { styles } from '../../styles/common';
import { styles as addStyles } from '../../styles/scenes/Add';

var moment = require('moment');

class Row extends Component {
  render() {
    const obsTitle = this.props.observations[0].location_attributes.body_of_water;
    const obsDate = moment(this.props.observations[0].observed_on).format('MMMM Do YYYY, h:mm a').toUpperCase();
    return (
      <View style={addStyles.offlineListRowContainer}>
        <Text style={addStyles.offlineListTitle}>{obsTitle}</Text>
        <Text style={addStyles.offlineListDate}>{obsDate}</Text>
      </View>
    )
  }
}

export default Row;