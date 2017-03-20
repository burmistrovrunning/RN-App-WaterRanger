import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import ResponsiveImage from 'react-native-responsive-image';
import { styles as addStyles } from '../../../styles/scenes/Add';

class WildlifeDataTemplate extends Component {

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

    return (
      <View>
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
            <Text style={addStyles.formCollapsibleButtonText}>{label.toUpperCase()}</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed}>
          <View style={[addStyles.formCollapsibleContainer, addStyles.observationDataContainer]}>
            <View style={addStyles.observationDataRow}>
              <View style={addStyles.observationDataCol}>
                <ResponsiveImage source={require('../../../images/obsimages/mammal.jpg')} initWidth="150" initHeight="150" />
                {inputs.Mammal}
              </View>
              <View style={addStyles.observationDataCol}>
                <ResponsiveImage source={require('../../../images/obsimages/reptile.jpg')} initWidth="150" initHeight="150" />
                {inputs.Reptile}
              </View>
              <View style={addStyles.observationDataCol}>
                <ResponsiveImage source={require('../../../images/obsimages/amphibian.jpg')} initWidth="150" initHeight="150" />
                {inputs.Amphibian}
              </View>
              <View style={addStyles.observationDataCol}>
                <ResponsiveImage source={require('../../../images/obsimages/fish.jpg')} initWidth="150" initHeight="150" />
                {inputs.Fish}
              </View>
              <View style={addStyles.observationDataCol}>
                <ResponsiveImage source={require('../../../images/obsimages/plant.jpg')} initWidth="150" initHeight="150" />
                {inputs.Plant}
              </View>
              <View style={addStyles.observationDataCol}>
                <ResponsiveImage source={require('../../../images/obsimages/insect.jpg')} initWidth="150" initHeight="150" />
                {inputs.Insect}
              </View>
              <View style={addStyles.observationDataCol}>
                <ResponsiveImage source={require('../../../images/obsimages/bird.jpg')} initWidth="150" initHeight="150" />
                {inputs.Bird}
              </View>
              <View style={addStyles.observationDataCol}>
                <ResponsiveImage source={require('../../../images/obsimages/species-at-risk.jpg')} initWidth="150" initHeight="150" />
                {inputs['Species at risk']}
              </View>
              <View style={addStyles.observationDataCol}>
                <ResponsiveImage source={require('../../../images/obsimages/crustacean.jpg')} initWidth="150" initHeight="150" />
                {inputs.Crustacean}
              </View>
              <View style={addStyles.observationDataCol}>
                <ResponsiveImage source={require('../../../images/obsimages/fungi.jpg')} initWidth="150" initHeight="150" />
                {inputs.Fungi}
              </View>
            </View>
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default WildlifeDataTemplate;
