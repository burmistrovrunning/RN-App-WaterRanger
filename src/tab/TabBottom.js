import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/tab/TabBottom';

const tabItems = [{
  label: 'Map',
  normalIcon: 'ios-pin-outline',
  focusIcon: 'ios-pin',
}, {
  label: 'Add',
  normalIcon: 'ios-add-circle-outline',
  focusIcon: 'ios-add-circle',
}, {
  label: 'Observations',
  normalIcon: 'ios-search-outline',
  focusIcon: 'ios-search',
}, {
  label: 'Settings',
  normalIcon: 'ios-settings-outline',
  focusIcon: 'ios-settings-outline',
}];
export class TabBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0
    };
  }
  onTabPress = (activeItem) => {
    this.props.resetScene(activeItem, this.state.activeItem);
    this.setState({ activeItem });
  };
  renderTabItems() {
    const { activeItem } = this.state;
    return tabItems.map((tabItem, index) => {
      let iconName = tabItem.normalIcon;
      let labelColor = '#999';
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
          <Icon name={iconName} style={styles.tabIcon} />
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
