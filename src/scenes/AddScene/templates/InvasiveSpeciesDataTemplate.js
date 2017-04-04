import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import ResponsiveImage from 'react-native-responsive-image';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../config.json';
import { styles as addStyles } from '../../../styles/scenes/Add';

const Icon = createIconSetFromFontello(fontelloConfig, 'water-rangers-icons');

class InvasiveSpeciesDataTemplate extends Component {

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
      <View style={addStyles.formCollapsibleWrapper}>
        <TouchableHighlight onPress={this._toggleExpanded} underlayColor="#edede5">
          <View style={[addStyles.formCollapsibleButton]}>
            <Icon name={activeState === true ? 'minus' : 'plus'} style={addStyles.formCollapsibleButtonIcon} />
            <Text style={addStyles.formCollapsibleButtonText}>{label.toUpperCase()}</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed}>
          <View style={[addStyles.formCollapsibleContainer, addStyles.observationDataContainer]}>
            <View style={addStyles.observationDataRow}>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/phragmites.jpg')} initWidth="130" initHeight="130" />
                {inputs.Phragmites}
              </View>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/loosestrife.jpg')} initWidth="130" initHeight="130" />
                {inputs.Loosestrife}
              </View>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/zebra-mussels.jpg')} initWidth="130" initHeight="130" />
                {inputs['Zebra Mussels']}
              </View>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/other-invasive.jpg')} initWidth="130" initHeight="130" />
                {inputs['Other Invasive']}
              </View>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/eurasian-milfoil.jpg')} initWidth="130" initHeight="130" />
                {inputs['Eurasian Milfoil']}
              </View>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/european-frog-bit.jpg')} initWidth="130" initHeight="130" />
                {inputs['European Frog-bit']}
              </View>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/european-water-chestnut.jpg')} initWidth="130" initHeight="130" />
                {inputs['European Water Chestnut']}
              </View>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/yellow-iris.jpg')} initWidth="130" initHeight="130" />
                {inputs['Yellow Iris']}
              </View>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/yellow-floating-heart.jpg')} initWidth="130" initHeight="130" />
                {inputs['Yellow Floating Heart']}
              </View>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/bloody-red-shrimp.jpg')} initWidth="130" initHeight="130" />
                {inputs['Bloody Red Shrimp']}
              </View>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/rusty-crayfish.jpg')} initWidth="130" initHeight="130" />
                {inputs['Rusty Crayfish']}
              </View>
              <View style={addStyles.invasiveSpeciesCol}>
                <ResponsiveImage source={require('../../../images/obsimages/spiny-waterfleas.jpg')} initWidth="130" initHeight="130" />
                {inputs['Spiny Waterfleas']}
              </View>
            </View>
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default InvasiveSpeciesDataTemplate;
