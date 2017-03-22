import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  WebView,
  Modal,
  Keyboard
} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import t from 'tcomb-form-native';
import { KeyboardSpacing } from '../../components';
import { login, facebookLogin } from '../../services';
import { styles as loginStyles, height as deviceHeight } from '../../styles/scenes/Login';
import { styles } from '../../styles/common';
import '../../styles/FormStyles';
import GLOBAL from '../../Globals';


const { Form } = t.form;
const LoginForm = t.struct({ email: t.String, password: t.String });
const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
    },
    password: {
      password: true,
      secureTextEntry: true
    }
  },
  auto: 'placeholders'
};
const defaultValue = {
  email: 'ollie@waterrangers.ca',
  password: '1q2w3e4r'
};
export class LoginScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      visible: false,
      webViewVisible: false,
      authUrl: '',
      keyboardHeight: 0,
    };
    this.formView = null;
  }

  onLoginFacebook = async (token) => {
    const error = await facebookLogin(token);
    if (error && error.length > 0) {
      alert(error);
      return this.setState({ error });
    }
    this.props.onLoginSuccess();
  };

  onLogin = async () => {
    const value = this.formView.getValue();
    const error = await login(value.email, value.password);
    if (error && error.length > 0) {
      return this.setState({ error });
    }
    this.props.onLoginSuccess();
  };
  onHandleWebViewChange = () => {

  };
  onKeyboardUpdated = keyboardHeight => this.setState({ keyboardHeight });
  hideKeyboard = () => {
    Keyboard.dismiss();
  };
  renderWebView() {
    const { webViewVisible } = this.state;
    if (webViewVisible) {
      return (
        <Modal
          animationType="slide"
          visible={webViewVisible}
          onRequestClose={res => console.info('OnRequestClose', res)}
        >
          <WebView
            onNavigationStateChange={this.onHandleWebViewChange}
            source={{ uri: this.state.authUrl }}
          />
        </Modal>
      );
    }
    return (<View />);
  }
  renderSocialLoginButton() {
    return (
      <TouchableHighlight style={styles.button} onPress={this.onLoginFacebook} underlayColor="#99d9f4">
        <Text style={styles.buttonText}>Login With Facebook</Text>
      </TouchableHighlight>
    );
  }
  render() {
    const { keyboardHeight } = this.state;
    const imageStyle = {
      width: (deviceHeight - keyboardHeight) / 4,
      height: (deviceHeight - keyboardHeight) / 4
    };
    return (
      <View style={loginStyles.container}>
        <TouchableOpacity
          style={loginStyles.loginContainer}
          onPress={this.hideKeyboard}
          activeOpacity={1}
        >
          <StatusBar barStyle={'light-content'} />
          <View style={[loginStyles.loginLogoContainer, imageStyle]}>
            <Image
              style={[loginStyles.loginLogo, imageStyle]}
              source={require('../../images/rangers-logo.png')}
            />
          </View>
          <View style={[styles.errorTextContainer, this.state.error ? {} : loginStyles.hidden]}>
            <Text style={styles.errorText}>{this.state.error}</Text>
          </View>
          <Form
            ref={ref => this.formView = ref}
            value={defaultValue}
            type={LoginForm}
            options={options}
            style={loginStyles.loginFormContainer}
          />
          <TouchableHighlight style={styles.button} onPress={this.onLogin} underlayColor="#99d9f4">
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>

          <LoginButton
            publishPermissions={['publish_actions']}
            onLoginFinished={(error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    this.onLoginFacebook(data.accessToken.toString());
                  }
                );
              }
            }}
            onLogoutFinished={() => alert("User logged out")}
          />

          {/* this.renderWebView() */}
        </TouchableOpacity>
        <KeyboardSpacing onKeyboardUpdated={this.onKeyboardUpdated} />
      </View>
    );
  }
}
