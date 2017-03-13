import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { localStorage } from '../../services';
import { styles } from '../../styles/common';

export class SettingsScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: ''
    };
  }
  componentDidMount() {
    setTimeout(async () => {
      const profile = await localStorage.get('profile');
      console.log('profile', profile);
      this.setState({ profile });
    }, 100);
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

