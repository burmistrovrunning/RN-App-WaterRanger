import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import ResponsiveImage from 'react-native-responsive-image';
import { styles as addStyles } from '../../../styles/scenes/Add';

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
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/phragmites.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs.Phragmites}
                  </View>
                </View>
              </View>
              <View style={[addStyles.observationDataCol, addStyles.InvasiveSpeciesCol]}>
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/loosestrife.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs.Loosestrife}
                  </View>
                </View>
              </View>
              <View style={addStyles.observationDataCol}>
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/zebra-mussels.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs['Zebra Mussels']}
                  </View>
                </View>
              </View>
              <View style={addStyles.observationDataCol}>
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/other-invasive.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs['Other Invasive']}
                  </View>
                </View>
              </View>
              <View style={addStyles.observationDataCol}>
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/eurasian-milfoil.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs['Eurasian Milfoil']}
                  </View>
                </View>
              </View>
              <View style={addStyles.observationDataCol}>
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/european-frog-bit.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs['European Frog-bit']}
                  </View>
                </View>
              </View>
              <View style={addStyles.observationDataCol}>
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/european-water-chestnut.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs['European Water Chestnut']}
                  </View>
                </View>
              </View>
              <View style={addStyles.observationDataCol}>
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/yellow-iris.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs['Yellow Iris']}
                  </View>
                </View>
              </View>
              <View style={addStyles.observationDataCol}>
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/yellow-floating-heart.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs['Yellow Floating Heart']}
                  </View>
                </View>
              </View>
              <View style={addStyles.observationDataCol}>
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/bloody-red-shrimp.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs['Bloody Red Shrimp']}
                  </View>
                </View>
              </View>
              <View style={addStyles.observationDataCol}>
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/rusty-crayfish.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs['Rusty Crayfish']}
                  </View>
                </View>
              </View>
              <View style={addStyles.observationDataCol}>
                <View style={addStyles.invasiveSpeciesCol}>
                  <ResponsiveImage source={require('../../../images/obsimages/spiny-waterfleas.jpg')} initWidth="160" initHeight="160" />
                  <View style={addStyles.observationDataCheckbox}>
                    {inputs['Spiny Waterfleas']}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default InvasiveSpeciesDataTemplate;
