import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../config.json';
import { styles as addStyles } from '../../../styles/scenes/Add';

const Icon = createIconSetFromFontello(fontelloConfig, 'water-rangers-icons');

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

  render() {
    const label = this.props.locals.label;
    const inputs = this.props.locals.inputs;
    const activeState = this.state.isActive;

    const inputCheckboxes = Object.keys(inputs).map(key =>
      <View key={key} style={addStyles.observationDataCol}>
        <View>
          {inputs[key]}
        </View>
      </View>
    );

    return (
      <View>
        <TouchableHighlight onPress={this._toggleExpanded} underlayColor="#edede5">
          <View style={[addStyles.formCollapsibleButton]}>
            <Icon name={activeState === true ? 'minus' : 'plus'} style={addStyles.formCollapsibleButtonIcon} />
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
