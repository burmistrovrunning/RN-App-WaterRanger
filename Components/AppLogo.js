import React, {Component, PropTypes} from 'react';
import View from 'react-native';
import SvgUri from 'react-native-svg-uri';

export default class Title extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row', }}>
        <SvgUri width="23" height="19" source={require('./Images/crossed-oars-white.svg')} /> 
      </View>
    );
  }
}