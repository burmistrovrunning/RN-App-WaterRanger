import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Linking
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { LoginManager } from 'react-native-fbsdk';

import _ from 'lodash';
import BaseScene from '../BaseScene';
import { localStorage } from '../../services';
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
      LoginManager.logOut();
      this.props.onLogout();
    } catch (e) {
      console.log('log out err', e);
    }
  };
  refreshData() {
    setTimeout(async () => {
      const profile = await localStorage.get('profile');
      this.setState({ userProfile: JSON.parse(profile) });
    }, 100);
  }
  openUrl(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  render() {
    return (
      <View style={styles.noPadContainer}>
        <Text style={[styles.headerOne, styles.fixedHeader]}>{'Settings'.toUpperCase()}</Text>
        <ScrollView style={styles.settingsWrapper}>
          <View style={styles.settingsContainer}>
            <Text style={styles.smallHeader}>NAME</Text>
            <Text>{_.get(this.state.userProfile, 'profile.full_name')}</Text>
          </View>
          <View style={styles.settingsContainer}>
            <Text style={styles.smallHeader}>EMAIL</Text>
            <Text>{_.get(this.state.userProfile, 'email')}</Text>
          </View>
          <View style={styles.settingsContainer}>
            <Hyperlink linkStyle={styles.linkColor} onPress={url => this.openUrl(url)}>
              <Text style={styles.helpText}>
                Please visit https://app.waterrangers.ca to change your profile.
              </Text>
            </Hyperlink>
          </View>
        </ScrollView>
        <View style={styles.settingsFooter}>
          <TouchableHighlight
            onPress={this.onLogout}
            style={[styles.button, styles.logOutButton]}
            underlayColor="#981818"
          >
            <Text style={styles.buttonText}>{'Logout'.toUpperCase()}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

