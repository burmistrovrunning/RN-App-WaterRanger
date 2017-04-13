import React, { Component } from 'react';
import ReactNative, { ScrollView, TextInput, Keyboard, UIManager } from 'react-native';

const TIMEOUT_VALUE = 250;
const EXTRA_HEIGHT = 150;

export class KeyboardScrollView extends Component {
  static defaultProps = {
    extraHeight: EXTRA_HEIGHT,
  };
  constructor(props) {
    super(props);
    this.state = {
      keyboardSpace: 0
    };
    this.keyboardWillShowEvent = null;
    this.keyboardWillHideEvent = null;
    this.position = { x: 0, y: 0 };
    this.defaultResetPosition = null;
    this.scrollView = null;
  }
  componentDidMount() {
    // Keyboard events
    this.keyboardWillShowEvent = Keyboard.addListener('keyboardWillShow', this.updateKeyboardSpace);
    this.keyboardWillHideEvent = Keyboard.addListener('keyboardWillHide', this.resetKeyboardSpace);
  }

  componentWillUnmount() {
    if (this.keyboardWillShowEvent) {
      this.keyboardWillShowEvent.remove();
    }
    if (this.keyboardWillHideEvent) {
      this.keyboardWillHideEvent.remove();
    }
  }
  getScrollResponder() {
    return this.scrollView.getScrollResponder();
  }
  getRef() {
    return this.scrollView;
  }
  updateKeyboardSpace = (frames) => {
    const keyboardSpace = frames.endCoordinates.height;
    this.setState({ keyboardSpace });
    // Automatically scroll to focused TextInput
    const currentlyFocusedField = TextInput.State.currentlyFocusedField();
    if (!currentlyFocusedField) {
      return;
    }
    UIManager.viewIsDescendantOf(
      currentlyFocusedField,
      this.getScrollResponder().getInnerViewNode(),
      (isAncestor) => {
        if (isAncestor) {
          // Check if the TextInput will be hidden by the keyboard
          UIManager.measureInWindow(currentlyFocusedField, (x, y, width, height) => {
            if (y + height > frames.endCoordinates.screenY - this.props.extraHeight) {
              this.scrollToFocusedInputWithNodeHandle(currentlyFocusedField);
            }
          });
        }
      }
    );
    if (!this.defaultResetPosition) {
      this.defaultResetPosition = this.position;
    }
  }

  resetKeyboardSpace = () => {
    const keyboardSpace = 0;
    this.setState({ keyboardSpace });
    // Reset scroll position after keyboard dismissal
    if (this.defaultResetPosition) {
      this.scrollToPosition(this.defaultResetPosition.x, this.defaultResetPosition.y, true);
      this.defaultResetPosition = null;
    }
  };
  scrollToPosition(x, y, animated = true) {
    this.getScrollResponder().scrollResponderScrollTo({ x, y, animated });
  }

  scrollToEnd(animated = true) {
    this.getScrollResponder().scrollResponderScrollToEnd({ animated });
  }

  /**
   * @param extraHeight: takes an extra height in consideration.
   */
  scrollToFocusedInput(reactNode, extraHeight = this.props.extraHeight) {
    setTimeout(() => {
      this.getScrollResponder().scrollResponderScrollNativeHandleToKeyboard(
        reactNode, extraHeight, true
      );
    }, TIMEOUT_VALUE);
  }

  scrollToFocusedInputWithNodeHandle(nodeID, extraHeight = this.props.extraHeight) {
    const reactNode = ReactNative.findNodeHandle(nodeID);
    this.scrollToFocusedInput(reactNode, extraHeight);
  }

  handleOnScroll(e) {
    this.position = e.nativeEvent.contentOffset;
    this.defaultResetPosition = null;
  }
  render() {
    return (
      <ScrollView
        ref={ref => this.scrollView = ref}
        keyboardDismissMode="on-drag"
        contentInset={{ bottom: this.state.keyboardSpace }}
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={0}
        {...this.props}
        onScroll={(e) => {
          this.handleOnScroll(e);
          if (this.props.onScroll) {
            this.props.onScroll(e);
          }
        }}
      >
        {this.props.children}
      </ScrollView>
    );
  }
}
