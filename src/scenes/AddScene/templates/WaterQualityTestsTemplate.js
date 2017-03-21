import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { styles as addStyles } from '../../../styles/scenes/Add';

class WaterQualityTestsTemplate extends Component {

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
    const inputs = this.props.locals;
    const activeState = this.state.isActive;
    return (
      <View style={addStyles.formCollapsibleWrapper}>
        <TouchableHighlight onPress={this._toggleExpanded} underlayColor="#edede5">
          <View style={[addStyles.formCollapsibleButton]}>
            <Text
              style={[
                addStyles.formCollapsibleButtonIcon,
                activeState && addStyles.formCollapsibleButtonActive
              ]}
            >
              {activeState === true ? '-' : '+'}
            </Text>
            <Text style={addStyles.formCollapsibleButtonText}>{'Water Quality Tests'.toUpperCase()}</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed}>
          <View style={[addStyles.formCollapsibleContainer, addStyles.waterTestsContainer]}>
            <View style={addStyles.waterTestsRow}>
              <View style={addStyles.waterTestsCol}>
                {inputs.ph}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.waterTemp}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.airTemp}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.dissolvedOxygen}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.eColi}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.otherColiform}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.totalColiform}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.conductivity}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.alkalinity}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.hardness}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.turbidity}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.kjeldahlNitrogen}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.phosphorus}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.salinity}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.salinity}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.secchiDepth}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.phosphates}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.nitrites}
              </View>
              <View style={addStyles.waterTestsCol}>
                {inputs.nitrates}
              </View>
            </View>
          </View>
        </Collapsible>
      </View>
    );
  }

}

export default WaterQualityTestsTemplate;
