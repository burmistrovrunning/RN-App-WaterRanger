import React from 'react';
import {
  Text,
  View
} from 'react-native';
import WaterQualityTestsTemplate from './WaterQualityTestsTemplate';
import IceWatchTemplate from './IceWatchTemplate';
import { styles } from '../../../styles/common';
import { styles as addStyles } from '../../../styles/scenes/Add';

function FormTemplateObservation(props) {
  const inputs = props.locals.inputs;
  return (
    <View style={addStyles.formWrapper}>
      <View style={addStyles.formFieldset}>
        <Text style={[styles.headerTwo]}>{'Location Details'.toUpperCase()}</Text>
        <View style={addStyles.formRow}>
          {inputs.bodyOfWater.props.options.editable &&
            <View>
              <Text style={styles.headerThree}>{"You're creating a brand new Location!"}</Text>
              <Text style={styles.helpText}>
                Add details below to provide others with information about this particular spot.
              </Text>
            </View>
          }
          {inputs.bodyOfWater}
          {inputs.locationName}
          {inputs.locationDescription}
        </View>
      </View>
      <View style={addStyles.formFieldset}>
        <Text style={styles.headerTwo}>{'Observation Details'.toUpperCase()}</Text>
        <View style={[addStyles.formRow, addStyles.datePickerView]}>
          {inputs.group}
          {inputs.date}
        </View>
      </View>
      <View style={addStyles.formCollapsible}>
        {inputs.wildlife}
        {inputs.invasiveSpecies}
        <WaterQualityTestsTemplate locals={inputs} />
        <IceWatchTemplate locals={inputs} />
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
