import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { styles as addStyles } from '../../../styles/scenes/Add';

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
    console.log('Ice watch:', inputs.iceWatch);
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
