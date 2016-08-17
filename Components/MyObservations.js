import React, { Component, PropTypes } from 'react';
import {ActivityIndicatorIOS, AppRegistry, Navigator, Text, TouchableHighlight, View, StyleSheet, AsyncStorage, MapView, ListView } from 'react-native';

export default class MyObservationsScene extends Component {
_onPressButton()
{

}

constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    'dataSource':ds.cloneWithRows(['Row1', 'Row2']),
  };
}

  render() {
    return (
      <View>
      <Text>My observations</Text>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <Text>{rowData}</Text>}
    />
    </View>
    );
  }
}
