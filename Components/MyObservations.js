import React, {Component, PropTypes} from 'react';
import {
    ActivityIndicatorIOS,
    AppRegistry,
    Navigator,
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    AsyncStorage,
    MapView,
    ListView
} from 'react-native';

export default class MyObservationsScene extends Component {
    _onPressButton()
    {}

    constructor(props) {
        super(props);

        var formsToSubmit = AsyncStorage.getItem("formsToSubmit");
        if (formsToSubmit == null)
            formsToSubmit = [];

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            'dataSource': ds.cloneWithRows(formsToSubmit)
        };
    }

    render() {
        return (
            <View>
                <Text>My observations</Text>
                <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <Text>{rowData}</Text>}/>
            </View>
        );
    }
}

var styles = require('../Styles/Styles');
