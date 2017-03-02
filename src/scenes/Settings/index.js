import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { localStorage } from '../../services';

export class SettingsScene extends Component {
  onLogout = async () => {
    try {
      await localStorage.remove('accessToken');
      this.props.onLogout();
    } catch (e) {
      console.log('log out err', e);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
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

