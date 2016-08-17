import React, { Component, PropTypes } from 'react';
import {ActivityIndicatorIOS, AppRegistry, ScrollView, Navigator, Text, TouchableHighlight, View, StyleSheet, AsyncStorage, TabBarIOS, Image } from 'react-native';
import LoginScene from './Components/Login';
import SettingsScene from './Components/Settings';
import AddObservationScene from './Components/FormComponents.js'
import MyObservationsScene from './Components/MyObservations.js'
import TabNavigator from 'react-native-tab-navigator';
import MapView from 'react-native-maps';
import CookieManager from 'react-native-cookies';

var store = require('react-native-simple-store');

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
          <MyTabBar />
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
      <MyTabBar />
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

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
const LOGIN_URL = "http://localhost:3000/login/";
const HOME_URL = "http://localhost:3000/";

class MyTabBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loadedCookie: false,
      selectedTab: '1',
      notifCount: 0,
      presses: 0,
    };
  }

  checkLogin()
  {
    AsyncStorage.getItem("accessToken").then((value) =>
    {
      let isAuthenticated;
      if (value == null)
      {
          isAuthenticated = false;
      }
      else
      {
        isAuthenticated = true;
      }

      this.setState({
        loggedIn: isAuthenticated,
        loadedCookie: true
      });

  }).done();
  }

  componentWillMount ()
  {
    this.checkLogin();
  }

  render()
  {
    if (this.state.loadedCookie) {
      if (this.state.loggedIn) {

    return (
     <TabNavigator>
  <TabNavigator.Item
    selected={this.state.selectedTab === '1'}
    title="Map"
    renderIcon={() => <Image source={require('./flux.png')} />}
    renderSelectedIcon={() => <Image source={require('./relay.png')} />}
    badgeText="1"
    onPress={() => this.setState({ selectedTab: '1' })}>
    <MapScene />
  </TabNavigator.Item>
  <TabNavigator.Item
    selected={this.state.selectedTab === '2'}
    title="Add New"
    renderIcon={() => <Image source={require('./flux.png')} />}
    renderSelectedIcon={() => <Image source={require('./relay.png')} />}
    onPress={() => this.setState({ selectedTab: '2' })}>
    <View style={styles.tabContent}>
       <AddObservationScene />
    </View>
  </TabNavigator.Item>
  <TabNavigator.Item
    selected={this.state.selectedTab === '3'}
    title="My Observations"
    renderIcon={() => <Image source={require('./flux.png')} />}
    renderSelectedIcon={() => <Image source={require('./relay.png')} />}
    onPress={() => this.setState({ selectedTab: '3' })}>
    <View style={styles.tabContent}>
      <ScrollView automaticallyAdjustContentInsets={true}>
       <MyObservationsScene />
       </ScrollView>
    </View>
  </TabNavigator.Item>
  <TabNavigator.Item
    selected={this.state.selectedTab === '4'}
    title="Settings"
    renderIcon={() => <Image source={require('./flux.png')} />}
    renderSelectedIcon={() => <Image source={require('./relay.png')} />}
    onPress={() => this.setState({ selectedTab: '4' })}>
    <View style={styles.tabContent}>
       <SettingsScene checkLogin={this.checkLogin.bind(this)}/>
    </View>
  </TabNavigator.Item>
</TabNavigator>
   );
 }
}

 return (<LoginScene checkLogin={this.checkLogin.bind(this)}/>);
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
    store.get("locations").then((value) =>
    {
      if (value == null)
      {
          var data = require('./locations.json');
          this.setState({"locations": data});
      }
      else
      {
          this.setState({"locations": value});
      }
      this.loadLocationsAsync();
  }).done();
  }

  loadLocationsAsync()
  {
    GLOBAL = require('./Globals');
    return fetch(GLOBAL.BASE_URL + "locations")
      .then((response) => response.json())
      .then((responseJson) => {

          var newLocations = [];
          var index = 0;
          for (var index=0;index<responseJson.length;index++)
          {
            var location = responseJson[index];
            newLocation = {"key":""+index, "title":location.name, "latlng":{"latitude":parseFloat(location.lat), "longitude":parseFloat(location.lng)}, "latitude":location.lat, "longitude":location.lng, "description":location.description};
            newLocations.push(newLocation);
          }
          this.setState({"locations": newLocations});
          store.save("locations", newLocations);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    var spinner = this.state.isLoading ?
  ( <ActivityIndicatorIOS
      size='large'/> ) :
  ( <View/>);

    return (
      <View>
      <MapView
        style={styles.map}
        annotations={this.state.locations}
        showsUserLocation={false}
      >
      {this.state.locations.map(marker => (
    <MapView.Marker
      key={marker.key}
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
    height:300,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
    flexDirection: 'column',
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
  tabContent: {
    paddingTop:20,
    flex: 1,
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});


AppRegistry.registerComponent('WaterRangers', () => WaterRangers);
