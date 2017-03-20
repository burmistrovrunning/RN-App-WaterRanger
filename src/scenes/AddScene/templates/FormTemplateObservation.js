import React from 'react';
import {
  Text,
  View
} from 'react-native';
import WaterQualityTestsTemplate from './WaterQualityTestsTemplate';
import { styles } from '../../../styles/common';
import { styles as addStyles } from '../../../styles/scenes/Add';

function FormTemplateObservation(props) {
  const inputs = props.locals.inputs;
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
        <View style={[addStyles.formRow, addStyles.datePickerView]}>
          {inputs.date}
        </View>
      </View>
      <View style={addStyles.formCollapsible}>
        <View style={addStyles.formFieldset}>
          {inputs.wildlife}
        </View>
        <View style={addStyles.formFieldset}>
          {inputs.invasiveSpecies}
        </View>
        <View style={addStyles.formFieldset}>
          <WaterQualityTestsTemplate locals={inputs} />
        </View>
        <View style={addStyles.formFieldset}>
          {inputs.iceWatch}
        </View>
      </View>
      <View style={addStyles.formFieldset}>
        <View style={addStyles.formRow}>
          {inputs.notes}
        </View>
      </View>
    </View>
  );
}

export default FormTemplateObservation;
