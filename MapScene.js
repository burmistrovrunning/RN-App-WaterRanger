import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class MyScene extends Component {
  getDefaultProps() {
    return {
      title: 'MyScene'
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text>Hi! My name is {this.props.title}.</Text>
        <Text>Hi! My name is {this.props.title}.</Text>
        <Text>Hi! My name is {this.props.title}.</Text>
        <Text>Hi! My name is {this.props.title}.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 80
  },
});
