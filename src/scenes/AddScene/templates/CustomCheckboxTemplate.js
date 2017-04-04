import React from 'react';
import {
  View,
  Text,
  Switch
} from 'react-native';
import { styles as addStyles } from '../../../styles/scenes/Add';

function CustomCheckboxTemplate(locals) {
  if (locals.hidden) {
    return null;
  }

  const stylesheet = locals.stylesheet;
  let controlLabelStyle = stylesheet.controlLabel.normal;
  let checkboxStyle = stylesheet.checkbox.normal;
  let helpBlockStyle = stylesheet.helpBlock.normal;
  const errorBlockStyle = stylesheet.errorBlock;

  const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  const error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

  if (locals.hasError) {
    controlLabelStyle = stylesheet.controlLabel.error;
    checkboxStyle = stylesheet.checkbox.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  return (
    <View style={addStyles.observationDataCheckbox}>
      {label}
      <Switch
        accessibilityLabel={locals.label}
        ref={ref => this.input = ref}
        disabled={locals.disabled}
        onTintColor="#246EC0"
        thumbTintColor="#ffffff"
        tintColor="#c3c3a9"
        style={checkboxStyle}
        onValueChange={(value) => { locals.onChange(value); }}
        value={locals.value}
      />
      {help}
      {error}
    </View>
  );
}

export default CustomCheckboxTemplate;
