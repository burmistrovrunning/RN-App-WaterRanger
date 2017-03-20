import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity
} from 'react-native';
import WaterQualityTestsTemplate from './WaterQualityTestsTemplate';
import { styles } from '../../../styles/common';
import { styles as addStyles } from '../../../styles/scenes/Add';

class FormTemplateIssue extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    const inputs = this.props.locals.inputs;
    return (
      <View style={addStyles.formWrapper}>
        <View style={addStyles.formFieldset}>
          <Text style={[styles.headerTwo]}>{'Location Details'.toUpperCase()}</Text>
          <View style={addStyles.formRow}>
            {inputs.bodyOfWater}
            {inputs.locationName}
            {inputs.locationDescription}
          </View>
        </View>
        <View style={addStyles.formFieldset}>
          {inputs.category}
        </View>
        <View style={addStyles.formFieldset}>
          {inputs.date}
        </View>
        <View style={addStyles.formFieldset}>
          {inputs.description}
          {inputs.weather}
          {inputs.seenBefore}
          {inputs.notifiedAgencies}
        </View>
        <View style={addStyles.formFieldset}>
          <Text style={[styles.headerTwo]}>{'Contact Details'.toUpperCase()}</Text>
          <Text>In case more information or clarification is needed regarding the issue. Your contact details are not publicly visible!</Text>
          {inputs.contactEmail}
          {inputs.contactPhone}
        </View>
      </View>
    )
  }

}

export default FormTemplateIssue;