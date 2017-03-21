import React, { Component } from 'react';
import { Animated, Platform, View } from 'react-native';
import Keyboard from 'Keyboard';

export class KeyboardSpacing extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      keyboardHeight: new Animated.Value(0),
      keyboardShown: false,
    };
  }

  componentWillMount() {
    this.subscriptions = [];
    if (Platform.OS === 'ios') {
      this.subscriptions = [
        Keyboard.addListener('keyboardWillHide', event => this.onKeyboardUpdated(event, false)),
        Keyboard.addListener('keyboardWillShow', event => this.onKeyboardUpdated(event, true)),
      ];
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(sub => sub.remove());
  }

  onKeyboardUpdated = (event, type) => {
    const toValue = !type ? 0 : event.endCoordinates.height;
    Animated.timing(
      this.state.keyboardHeight, {
        toValue,
        duration: 150,
      }
    ).start();
    this.setState({ keyboardShown: type });
    if (this.props.onKeyboardUpdated) {
      this.props.onKeyboardUpdated(toValue);
    }
  };

  render() {
    if (!this.props.hide) {
      return (
        <Animated.View style={{ height: this.state.keyboardHeight, backgroundColor: 'white' }} />
      );
    }
    return <View />;
  }
}