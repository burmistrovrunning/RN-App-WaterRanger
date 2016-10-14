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
import MyTabBar from './index.ios';
import NavBarDark from './index.ios';

export default class WaterRangers extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <NavBarDark/>
                <MyTabBar/>
            </View>
        )
    }
}

AppRegistry.registerComponent('WaterRangers', () => WaterRangers);

var styles = require('./Styles/Styles');