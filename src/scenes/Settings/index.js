import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  ScrollView
} from 'react-native';
import BaseScene from '../BaseScene';
import { localStorage } from '../../services';
import _ from 'lodash';
import { styles } from '../../styles/common';

export class SettingsScene extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: ''
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
      this.setState({ 
        userProfile: JSON.parse(profile)
      });
    }, 100);
  }
  render() {
    console.log('Profile', this.state.userProfile);
    return (
      <View style={styles.noPadContainer}>
        <Text style={[styles.headerOne, styles.fixedHeader]}>My Settings</Text>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.settingsContainer}>
            <Text style={styles.smallHeader}>NAME</Text>
            <Text>{_.get(this.state.userProfile, 'profile.full_name')}</Text>
          </View>
          <View style={styles.settingsContainer}>
            <Text style={styles.smallHeader}>EMAIL</Text>
            <Text>{_.get(this.state.userProfile, 'email')}</Text>
          </View>
          <View style={styles.settingsContainer}>
            <Text>Please visit app.waterrangers.ca on your computer to change your profile.</Text>
          </View>
          <View style={styles.settingsContainer}>
            <TouchableHighlight onPress={this.onLogout} style={[styles.button, styles.logOutButton]}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

