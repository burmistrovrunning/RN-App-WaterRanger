import React, { Component, PropTypes } from 'react';
import {ActivityIndicatorIOS, AppRegistry, Navigator, Text, TouchableHighlight, View, StyleSheet, AsyncStorage} from 'react-native';
import FormScene from './Components/Login';
import MapView from 'react-native-maps';
import MyTabBar from './index.ios.js'

export default class WaterRangers extends Component {
  render() {
    return (
      <MyTabBar />
      /*
      <Navigator
        initialRoute={{ title: 'Map', index: 0 }}
        renderScene={this.navigatorRenderScene}
      />
      */
    )
  }
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.title) {
      case 'Map':
        return (
          <MapScene
          navigator={_navigator}
          title={route.title}
          />
        );
      case 'second':
        return (<FormScene></FormScene>);
    }
}
}

class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

var markers = [
  {
    latitude: 52,
    longitude:0,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  }
];

/*
class AddObservationScene {
  static propTypes = {
    location: PropTypes.map.isRequired,
  }
  render() {
    <View>
    <Text>Location: {{location.title}} </Text>
    <TextInput
          style={{height: 40}}
          placeholder=""
          />
    </View>
  }
}
*/

class MapScene extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      locations: [],
    };
  }

  componentWillMount()
  {
    AsyncStorage.getItem("locations").then((value) =>
    {
      if (value == null)
      {
          var data = require('./locations.json');
          console.log(data);
          this.setState({"locations": data});
      }
      else
      {
        console.log(value);
          this.setState({"locations": value});
      }
      //loadLocations();
  }).done();
  }

  loadLocations()
  {

  }

  render() {

    var spinner = this.state.isLoading ?
  ( <ActivityIndicatorIOS
      size='large'/> ) :
  ( <View/>);

    console.log("Rendering with " + this.state.locations[0]);
    return (
      <View>
      <MapView
        style={styles.map}
        annotations={this.state.locations}
        showsUserLocation={false}
      >
      {this.state.locations.map(marker => (
    <MapView.Marker
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
  ))}
      </MapView>
      <Text>Current Scene: {this.props.title} </Text>
      <TouchableHighlight onPress={this.onShowForm.bind(this)}>
        <Text>Tap me to load the next scene</Text>
      </TouchableHighlight>
      {spinner}
      </View>
    );
  }

  // Function to call when a new scene should be displayed
  onForward()
  {
    const nextIndex = route.index + 1;
    this.props.navigator.push({
      title: 'Scene ' + nextIndex,
      index: nextIndex,
    });
  }

  onShowForm()
  {
    console.log("Hello2");
    //console.log("Hello" + props);
    this.props.navigator.push({
      title: 'second',
    });
  }

  // Function to call to go back to the previous scene
  onBack()
  {
    if (route.index > 0) {
      this.props.navigator.pop();
    }
  }
}

var styles = StyleSheet.create({
  map: {
    height: 150,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});


AppRegistry.registerComponent('WaterRangers', () => WaterRangers);
