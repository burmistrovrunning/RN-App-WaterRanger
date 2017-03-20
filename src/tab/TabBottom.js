import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/tab/TabBottom';

const tabItems = [{
  label: 'Map',
  normalIcon: 'ios-map-outline',
  focusIcon: 'ios-map',
}, {
  label: 'Add',
  normalIcon: 'ios-add-circle-outline',
  focusIcon: 'ios-add-circle',
}, {
  label: 'Offline',
  normalIcon: 'ios-cloud-upload-outline',
  focusIcon: 'ios-cloud-upload',
}, {
  label: 'Settings',
  normalIcon: 'ios-settings-outline',
  focusIcon: 'ios-settings',
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
      let iconName = tabItem.normalIcon;
      let labelColor = '#6b6b5a';
      if (activeItem === index) {
        iconName = tabItem.focusIcon;
        labelColor = '#1c3653';
      }
      return (
        <TouchableOpacity
          key={tabItem.label}
          style={styles.tabContainer}
          onPress={() => this.onTabPress(index)}
        >
          <Icon name={iconName} style={[styles.tabIcon, { color: labelColor }]} />
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
