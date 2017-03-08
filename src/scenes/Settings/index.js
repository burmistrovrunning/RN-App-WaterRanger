import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { localStorage } from '../../services';
import { styles } from '../../styles/common';

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
      <View style={styles.container}>
        <Text style={styles.headerOne}>My Settings</Text>
        <Text>
          Please visit app.waterrangers.ca on your computer to change your profile.
        </Text>
        <Text>Logged in as [USERNAME]</Text>
        <TouchableHighlight onPress={this.onLogout} style={styles.logOutButton}>
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

