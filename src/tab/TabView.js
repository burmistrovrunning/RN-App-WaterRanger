import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TabBottom } from './TabBottom';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});

export class TabView extends Component {
  constructor(props) {
    super(props);
    this.tabBottomView = null;
    this.state = {
      visible: false
    };
  }
  getTabIndex() {
    return this.tabBottomView.getTabIndex();
  }
  updateTabIndex(index) {
    this.tabBottomView.updateTabIndex(index);
  }
  updateTabVisible(visible) {
    this.setState({ visible });
  }
  render() {
    const { children, onTabRoute } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.container}>
          <View style={styles.container}>{children}</View>
          { this.state.visible &&
            <TabBottom
              resetScene={onTabRoute}
              ref={ref => this.tabBottomView = ref}
            />
          }
        </View>
      );
    } else if (Platform.OS === 'android') {
      return (
        <View style={styles.container}>
          { this.state.visible &&
            <TabBottom
              resetScene={onTabRoute}
              ref={ref => this.tabBottomView = ref}
            />
          }
          <View style={styles.container}>{children}</View>
        </View>
      );
    }
  }
}
