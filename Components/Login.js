import React, { Component, PropTypes } from 'react';
import {ActivityIndicatorIOS, AppRegistry, Navigator, Text, TouchableHighlight, View, StyleSheet, AsyncStorage, MapView } from 'react-native';
// import MapView from 'react-native-maps';
var t = require('tcomb-form-native');
var Form = t.form.Form;

var Gender = t.enums({
  M: 'Male',
  F: 'Female'
});

// here we are: define your domain model
var LoginForm = t.struct({
  email: t.String,              // a required string
  password: t.String,  // an optional string
});

var options = {}


export default class LoginScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'error':'',
    };
  }

  render() {
    return (
      <View>
      <Form
          ref="form"
          type={LoginForm}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.login.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
          <Text color="#ff0000">{this.state.error}</Text>
        </View>);

  }

  async login()
  {
    var value = this.refs.form.getValue();
    if (!value) return;

    GLOBAL = require('../Globals');
    return fetch(GLOBAL.BASE_URL + "auth/sign_in",
    {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": value.email,
      "password": value.password,
    })
  })
      .then(async (response) => {
        var accessToken = null;
        try {
            accessToken = response["headers"]["map"]["access-token"][0];
        } catch (e) {

        }

        var error = false;
        if (response.status == 200)
        {
          if (accessToken != null)
          {
            try {
              let value = await AsyncStorage.setItem('accessToken', accessToken);
            } catch (e) {

            }
            this.props.checkLogin();
          }
          error = "Please check your login and try again.";
        }
        else
        {
          error = "Please check your login and try again.";
        }

        if (error != null)
        {
          this.setState({"error":error});
        }

        console.log(response);
        })
      .catch((error) => {
        //console.error(error);
        error = "Please check your connection and try again.";
        this.setState({"error":error});
      });
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
