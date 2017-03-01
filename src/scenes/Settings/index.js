import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { localStorge } from '../../services';

export class SettingsScene extends Component {
  onLogout = async () => {
    try {
      await localStorge.remove('accessToken');
    } catch (e) {
      console.log('log out err', e);
    }
    this.props.checkLogin();
  };

  render() {
    return (
      <View>
        <Text>
          Most settings are not yet available on our mobile app.
          Please visit app.waterrangers.ca on your computer to change your profile.
        </Text>
        <Text>Logged in as [USERNAME]</Text>
        <TouchableHighlight onPress={this.onLogout}>
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

