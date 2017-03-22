import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { styles } from '../../../styles/common';
import { styles as addStyles } from '../../../styles/scenes/Add';

function FormTemplateIssue(props) {
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
        <Text style={styles.headerTwo}>{'Issue Details'.toUpperCase()}</Text>
        {inputs.category}
        {inputs.date}
        {inputs.description}
        {inputs.weather}
        {inputs.seenBefore}
        {inputs.notifiedAgencies}
      </View>
      <View style={addStyles.formFieldset}>
        <Text style={[styles.headerTwo]}>{'Contact Details'.toUpperCase()}</Text>
        <Text style={styles.helpText}>
          In case more information or clarification is needed regarding the issue.
          Your contact details are not publicly visible!
        </Text>
        {inputs.contactEmail}
        {inputs.contactPhone}
      </View>
    </View>
  );
}

export default FormTemplateIssue;
