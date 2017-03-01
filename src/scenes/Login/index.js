import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  Image,
  StatusBar
} from 'react-native';
import t from 'tcomb-form-native';
import { localStorage } from '../../services';
import { styles as loginStyles } from '../../styles/scenes/Login';
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
      visible: false
    };
    this.formView = null;
  }
  onLogin = async () => {
    const value = this.formView.getValue();
    if (value) {
      return fetch(`${GLOBAL.BASE_URL}auth/sign_in`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: value.email, password: value.password })
      })
        .then(async (response) => {
          let accessToken = null;
          let client = null;
          let expiry = null;
          let tokenType = null;
          let uid = null;
          try {
            const { map } = response.headers;
            accessToken = map['access-token'][0];
            client = map.client[0];
            expiry = map.expiry[0];
            tokenType = map['token-type'][0];
            uid = map.uid[0];
          } catch (e) {
            console.log('err', e);
          }

          let error = false;
          if (response.status === 200) {
            if (accessToken != null) {
              try {
                const loginDetails = {
                  'access-token': accessToken,
                  'token-type': tokenType,
                  client,
                  expiry,
                  uid
                };
                await localStorage.set('accessToken', accessToken);
                await localStorage.set('loginDetails', JSON.stringify(loginDetails));
              } catch (e) {
                console.log('err', e);
              }
              // this.props.checkLogin();
            }
          } else {
            error = 'Please check your login and try again.';
          }

          if (error != null) {
            this.setState({ error });
          }
          console.log(response);
        }).catch((e) => {
          console.log('err', e);
          const error = 'Please check your connection and try again.';
          this.setState({ error });
        });
    }
  }

  render() {
    return (
      <View style={loginStyles.loginContainer}>
        <StatusBar barStyle={'light-content'} />
        <View style={loginStyles.loginLogoContainer}>
          <Image
            style={loginStyles.loginLogo}
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
      </View>
    );
  }
}
