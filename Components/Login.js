import React, {Component, PropTypes} from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import {
    ActivityIndicatorIOS,
    AppRegistry,
    Navigator,
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    AsyncStorage
} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var Gender = t.enums({M: 'Male', F: 'Female'});

var LoginForm = t.struct({email: t.String, password: t.String});

var options = {}

export default class LoginScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'error': ''
        };
    }

    render() {
        return (
            <View>
                
            </View>
        );

    }

    async login()
    {
        var value = this.refs.form.getValue();
        if (!value)
            return;

        GLOBAL = require('../Globals');
        return fetch(GLOBAL.BASE_URL + "auth/sign_in", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": value.email, "password": value.password})
        }).then(async(response) => {
            var accessToken = null;
            var client = null;
            var expiry = null;
            var tokenType = null;
            var uid = null;
            try {
                accessToken = response["headers"]["map"]["access-token"][0];
                client = response["headers"]["map"]["client"][0];
                expiry = response["headers"]["map"]["expiry"][0];
                tokenType = response["headers"]["map"]["token-type"][0];
                uid = response["headers"]["map"]["uid"][0];
            } catch (e) {}

            var error = false;
            if (response.status == 200) {
                if (accessToken != null) {
                    try {
                        var loginDetails = {
                            "access-token": accessToken,
                            "client": client,
                            "expiry": expiry,
                            "token-type": tokenType,
                            "uid": uid
                        };
                        let value = await AsyncStorage.setItem('accessToken', accessToken);
                        let value2 = await AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
                    } catch (e) {}
                    this.props.checkLogin();
                }
                error = "Please check your login and try again.";
            } else {
                error = "Please check your login and try again.";
            }

            if (error != null) {
                this.setState({"error": error});
            }

            console.log(response);
        }).catch((error) => {
            console.error(error);
            error = "Please check your connection and try again.";
            this.setState({"error": error});
        });
    }
}

var styles = require('../Styles/Styles');
