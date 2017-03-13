import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import BaseScene from '../BaseScene';
import { localStorage } from '../../services';
import { styles } from '../../styles/common';

export class SettingsScene extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      profile: ''
    };
  }
  componentDidMount() {
    this.refreshData();
  }
  onLogout = async () => {
    try {
      await localStorage.remove('accessToken');
      await localStorage.remove('profile');
      this.props.onLogout();
    } catch (e) {
      console.log('log out err', e);
    }
  };
  refreshData() {
    setTimeout(async () => {
      const profile = await localStorage.get('profile');
      this.setState({ profile });
    }, 100);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerOne}>My Settings</Text>
        <Text>
          Please visit app.waterrangers.ca on your computer to change your profile.
        </Text>
        <Text>Profile: {this.state.profile}</Text>
        <Text>Logged in as [USERNAME]</Text>
        <TouchableHighlight onPress={this.onLogout} style={styles.logOutButton}>
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

