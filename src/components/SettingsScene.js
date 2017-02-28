import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/Styles';

export default class SettingsScene extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Settings',
      icon: () => (
        <Icon name="ios-settings-outline" style={styles.tabIcon} />
      ),
    },
  };

  onLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
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

