import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabBottom } from './TabBottom';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});

export const TabView = ({ children, onTabRoute }) => (
  <View style={styles.container}>
    <View style={styles.container}>{children}</View>
    <TabBottom resetScene={onTabRoute} />
  </View>
);
