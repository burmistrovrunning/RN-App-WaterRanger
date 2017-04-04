import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
import { styles } from '../styles/tab/TabBottom';

const Icon = createIconSetFromFontello(fontelloConfig, 'water-rangers-icons');

const tabItems = [{
  label: (Platform.OS === 'ios') ? 'Map' : 'MAP',
  normalIcon: 'map',
  iconSize: 26
}, {
  label: (Platform.OS === 'ios') ? 'Add' : 'ADD',
  normalIcon: 'plus',
  iconSize: 26
}, {
  label: (Platform.OS === 'ios') ? 'Offline' : 'OFFLINE',
  normalIcon: 'upload',
  iconSize: 32
}, {
  label: (Platform.OS === 'ios') ? 'Settings' : 'SETTINGS',
  normalIcon: 'settings',
  iconSize: 26
}];
export class TabBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
    };
  }
  onTabPress = (activeItem) => {
    this.props.resetScene(activeItem, this.state.activeItem);
    this.setState({ activeItem });
  };
  getTabIndex() {
    return this.state.activeItem;
  }
  updateTabIndex(activeItem) {
    if (activeItem > -1 && activeItem !== this.state.activeItem) {
      this.setState({ activeItem });
    }
  }
  renderTabItems() {
    const { activeItem } = this.state;
    return tabItems.map((tabItem, index) => {
      const iconName = tabItem.normalIcon;
      const iconSize = tabItem.iconSize;
      let labelColor = '#97acc3';
      if (activeItem === index) {
        labelColor = '#ffffff';
      }
      return (
        <TouchableOpacity
          key={tabItem.label}
          style={styles.tabContainer}
          onPress={() => this.onTabPress(index)}
        >
          <Icon
            name={iconName}
            style={[styles.tabIcon, { color: labelColor, fontSize: iconSize }]}
          />
          <Text style={[styles.tabLabel, { color: labelColor }]}>{tabItem.label}</Text>
        </TouchableOpacity>
      );
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderTabItems()}
      </View>
    );
  }
}
