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

class IceWatchTemplate extends Component {

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
            <Icon name={activeState === true ? 'minus' : 'plus'} style={addStyles.formCollapsibleButtonIcon} />
            <Text style={addStyles.formCollapsibleButtonText}>{'Ice Watch'.toUpperCase()}</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed}>
          <View style={[addStyles.formCollapsibleContainer]}>
            <View style={addStyles.singleDataCol}>
              {inputs.iceWatch}
            </View>
          </View>
        </Collapsible>
      </View>
    );
  }

}

export default IceWatchTemplate;
