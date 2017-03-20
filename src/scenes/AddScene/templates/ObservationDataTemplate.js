import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import ResponsiveImage from 'react-native-responsive-image';
import { styles } from '../../../styles/common';
import { styles as addStyles } from '../../../styles/scenes/Add';

class ObservationDataTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      isActive: false
    };
  }
  
  _toggleExpanded = () => {
    this.setState({ 
      collapsed: !this.state.collapsed,
      isActive: !this.state.isActive
    });
  }

  render () {
    const label = this.props.locals.label;
    const inputs = this.props.locals.inputs;
    const inputRef = this.props.locals.path[0];
    const activeState = this.state.isActive;

    const inputCheckboxes = Object.keys(inputs).map((key) => {
      const imageURI = '../../../images/obsimages/' + key.replace(/\s+/g, '-').toLowerCase() + '.jpg';
      return (
        <View key={key} style={addStyles.observationDataCol}>
          <View>
            {inputs[key]}
          </View>
        </View>
      )
    });

    return (
      <View>
        <TouchableHighlight onPress={this._toggleExpanded} underlayColor="#edede5">
          <View style={[addStyles.formCollapsibleButton]}>
            <Text 
              style={[addStyles.formCollapsibleButtonIcon, activeState && addStyles.formCollapsibleButtonActive]}
            >
              {activeState === true ? '-' : '+'}
            </Text>
            <Text style={addStyles.formCollapsibleButtonText}>{label.toUpperCase()}</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed}>
          <View style={[addStyles.formCollapsibleContainer, addStyles.observationDataContainer]}>
            <View style={addStyles.observationDataRow}>
              {inputCheckboxes}
            </View>
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default ObservationDataTemplate;