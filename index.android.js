import React, {Component, PropTypes} from 'react';
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
import FormScene from './Components/Login';
import MapView from 'react-native-maps';
import MyTabBar from './index.ios.jsx'

export default class WaterRangers extends Component {
    render() {
        return (<MyTabBar/>)
    }
}

AppRegistry.registerComponent('WaterRangers', () => WaterRangers);
