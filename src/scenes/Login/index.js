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
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import t from 'tcomb-form-native';
import _ from 'lodash';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import { KeyboardSpacing } from '../../components';
import { login, facebookLogin } from '../../services';
import { styles as loginStyles, height as deviceHeight } from '../../styles/scenes/Login';
import { styles } from '../../styles/common';
import '../../styles/FormStyles';

const Icon = createIconSetFromFontello(fontelloConfig, 'water-rangers-icons');
const { Form } = t.form;
const LoginForm = t.struct({ email: t.String, password: t.String });
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.backgroundColor = '#ffffff';
stylesheet.textbox.normal.borderColor = '#ffffff';
stylesheet.textbox.normal.height = 42;
stylesheet.textbox.error.backgroundColor = '#ffffff';
stylesheet.textbox.error.borderColor = '#a94442';
stylesheet.textbox.error.height = 42;

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
  stylesheet,
  auto: 'placeholders'
};
const defaultValue = {
  email: '',
  password: ''
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
  onChange = (value) => {
    if (value) {
      defaultValue.email = value.email;
      defaultValue.password = value.password;
    }
  };
  hideKeyboard = () => {
    Keyboard.dismiss();
  };
  handleFacebookLogin = async () => {
    LoginManager.logInWithReadPermissions(['email']).then(
      (result) => {
        if (result.isCancelled) {
          this.setState({ error: 'Login Cancelled' });
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              this.onLoginFacebook(data.accessToken.toString());
              this.setState({ error: '' });
            }
          );
        }
      },
      (error) => {
        this.setState({ error });
      }
    );
  }
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
          <View style={loginStyles.facebookLogin}>
            <Icon.Button name="logo-facebook" backgroundColor="#3b5998" onPress={this.handleFacebookLogin} iconStyle={loginStyles.facebookLoginButtonIcon}>
              <Text style={loginStyles.facebookLoginButtonText}>Login with Facebook</Text>
            </Icon.Button>
          </View>
          <Form
            ref={ref => this.formView = ref}
            value={defaultValue}
            type={LoginForm}
            options={options}
            onChange={this.onChange}
            style={loginStyles.loginFormContainer}
          />
          <TouchableHighlight style={styles.button} onPress={this.onLogin} underlayColor="#99d9f4">
            <Text style={styles.buttonText}>{'Login'.toUpperCase()}</Text>
          </TouchableHighlight>

          {/* this.renderWebView() */}
        </TouchableOpacity>
        <KeyboardSpacing onKeyboardUpdated={this.onKeyboardUpdated} />
      </View>
    );
  }
}
