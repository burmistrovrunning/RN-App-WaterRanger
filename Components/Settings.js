import React, { Component, PropTypes } from 'react';
import {ActivityIndicatorIOS, AppRegistry, Navigator, Text, TouchableHighlight, View, StyleSheet, AsyncStorage, MapView } from 'react-native';

export default class SettingsScene extends Component {

async logout()
{
  try {
    let value = await AsyncStorage.removeItem('accessToken');
  } catch (e) {

  }
  this.props.checkLogin();
}

  render() {
    return (
      <View>
      <Text>Most settings are not yet available on our mobile app. Please visit app.waterrangers.ca on your computer to change your profile.</Text>
      <Text>Logged in as [USERNAME]</Text>
      <TouchableHighlight onPress={this.logout.bind(this)}>
        <Text>LOGOUT</Text>
    </TouchableHighlight>
    </View>
    );
  }
}
