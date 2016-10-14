import React, {Component, PropTypes} from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import {
    ActivityIndicatorIOS,
    AppRegistry,
    ScrollView,
    Navigator,
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    AsyncStorage,
    TabBarIOS,
    Image
} from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import LoginScene from './Components/Login';
import SettingsScene from './Components/Settings';
import AddObservationScene from './Components/AddForm';
import MyObservationsScene from './Components/MyObservations';
import TabNavigator from 'react-native-tab-navigator';
import CookieManager from 'react-native-cookies';
import SvgUri from 'react-native-svg-uri';
import Icon from 'react-native-vector-icons/Ionicons';
import SuperCluster from 'supercluster';
import GeoViewport from 'geo-viewport';
var store = require('react-native-simple-store');
let id = 0;

const accessToken = 'pk.eyJ1Ijoid2F0ZXJyYW5nZXJzIiwiYSI6ImY4Mzc4MTZkZDZkN2Y4YzFhMjA2MzQ3NDAyZjM0MjI1In0.jA6aLxZWzUm8bSBbumka4Q';
Mapbox.setAccessToken(accessToken);

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

class NavBarDark extends Component {
  render() {
    return (
      <NavBar style={styles} statusBar={{ barStyle: 'light-content' }}>
        <NavTitle style={styles.title}>
            <View style={styles.logoContainer}>
                <SvgUri 
                    style={styles.logo} 
                    source={require('./Images/crossed-oars-white.svg')} 
                /> 
            </View>
        </NavTitle>
      </NavBar>
    )
  }
}


class MyScene extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onForward: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired
    }
    render() {
        return (
            <View>
                <MyTabBar/>
                <Text>Current Scene: {this.props.title}</Text>
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
        longitude: 0,
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
            presses: 0
        };
    }

    checkLogin()
    {
        AsyncStorage.getItem("accessToken").then((value) => {
            let isAuthenticated;
            if (value == null) {
                isAuthenticated = false;
            } else {
                isAuthenticated = true;
            }

            this.setState({loggedIn: isAuthenticated, loadedCookie: true});

        }).done();
    }

    componentWillMount()
    {
        this.checkLogin();
    }

    showForm(marker)
    {
        this.setState({selectedTab: '2', selectedMarker: marker});
        console.log("BOO");
        console.log(this.state);
    }

    render()
    {
        if (this.state.loadedCookie) {
            if (this.state.loggedIn) {

                return (
                    <TabNavigator tabBarStyle={styles.tabBar}>
                        <TabNavigator.Item 
                            selected={this.state.selectedTab === '1'} 
                            title="Map"
                            tabStyle={styles.tabStyle}
                            titleStyle={styles.tabTitleStyle}
                            selectedTitleStyle={styles.selectedTabTitleStyle}
                            renderIcon={() => <Icon name="ios-pin-outline" style={styles.tabIcon} />} 
                            renderSelectedIcon={() => <Icon name="ios-pin" style={styles.tabIconSelected} />} 
                            onPress={() => this.setState({selectedTab: '1'})}>
                            <MapScene showForm={this.showForm.bind(this)}/>
                        </TabNavigator.Item>
                        <TabNavigator.Item 
                            selected={this.state.selectedTab === '2'} 
                            title="Add New" 
                            tabStyle={styles.tabStyle}
                            titleStyle={styles.tabTitleStyle}
                            selectedTitleStyle={styles.selectedTabTitleStyle} 
                            renderIcon={() => <Icon name="ios-add-circle-outline" style={styles.tabIcon} />} 
                            renderSelectedIcon={() => <Icon name="ios-add-circle" style={styles.tabIconSelected} />} 
                            onPress={() => this.setState({selectedTab: '2'})}>
                            <View style={styles.tabContent}>
                                <AddObservationScene marker={this.state.selectedMarker}/>
                            </View>
                        </TabNavigator.Item>
                        <TabNavigator.Item 
                            selected={this.state.selectedTab === '3'} 
                            title="My Observations"
                            tabStyle={styles.tabStyle}
                            titleStyle={styles.tabTitleStyle}
                            selectedTitleStyle={styles.selectedTabTitleStyle} 
                            renderIcon={() => <Icon name="ios-search-outline" style={styles.tabIcon} />} 
                            renderSelectedIcon={() => <Icon name="ios-search" style={styles.tabIconSelected} />} 
                            onPress={() => this.setState({selectedTab: '3'})}>
                            <View style={styles.tabContent}>
                                <ScrollView automaticallyAdjustContentInsets={true}>
                                    <MyObservationsScene/>
                                </ScrollView>
                            </View>
                        </TabNavigator.Item>
                        <TabNavigator.Item 
                            selected={this.state.selectedTab === '4'} 
                            title="Settings"
                            tabStyle={styles.tabStyle}
                            titleStyle={styles.tabTitleStyle}
                            selectedTitleStyle={styles.selectedTabTitleStyle} 
                            renderIcon={() => <Icon name="ios-settings-outline" style={styles.tabIcon} />} 
                            renderSelectedIcon={() => <Icon name="ios-settings" style={styles.tabIconSelected} />} 
                            onPress={() => this.setState({selectedTab: '4'})}>
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
        longitude: 0,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
    }
];

var MyCallout = React.createClass({
    render: function() {
        let {place} = this.props;
        return <TouchableHighlight underlayColor="transparent" onPress={() => this.recordEvent('Marker::onCalloutPress')}>
            <View style={styles.marker}>
                <View style={styles.markerPointer}/>
                <View style={styles.markerContent}>
                    <Text style={styles.markerTitle}>{place.title}</Text>
                </View>
            </View>
        </TouchableHighlight>
    }
})

class MapScene extends Component {

    static propTypes = {
        navigator: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            locations: [],
            newLocationMarkers: [],
            center: {
              latitude: 45.4215,
              longitude: -75.6972
            },
            zoom: 10,
            userTrackingMode: Mapbox.userTrackingMode.follow
        };
    }

    componentWillMount() {
        store.get("locations").then((value) => {
            if (value == null) {
                var data = require('./locations.json');
                this.setState({"locations": data});
            } else {
                this.setState({"locations": value});
            }
            this.loadLocationsAsync();
        }).done();
    }

    loadLocationsAsync() {
        GLOBAL = require('./Globals');
        return fetch(GLOBAL.BASE_URL + "locations").then((response) => response.json()).then((responseJson) => {

            var newLocations = [];
            var index = 0;
            for (var index = 0; index < responseJson.length; index++) {
                var location = responseJson[index],
                    locationTitle;
                if (location.body_of_water === undefined || location.body_of_water === null) {
                    locationTitle = location.name
                } else {
                    locationTitle = location.body_of_water
                }
                newLocation = {
                    coordinates: [
                        parseFloat(location.lat),
                        parseFloat(location.lng)
                    ],
                    type: "point",
                    title: locationTitle,
                    subtitle: "",
                    id: "marker"+location.lat,
                    rightCalloutAccessory:{
                        url: 'https://cldup.com/9Lp0EaBw5s.png',
                        height: 25,
                        width: 25
                    }
                };
                newLocations.push(newLocation);
            }

            var newLocationToMake = {
                coordinates: [
                    52,
                    0
                ],
                type: "point",
                title: "Add new...",
                subtitle: "",
                id: "marker",
                rightCalloutAccessory:{
                    url: 'https://cldup.com/9Lp0EaBw5s.png',
                    height: 25,
                    width: 25
                }
            };
            this.setState({"locations": newLocations, "newLocationMarkers": this.state.newLocationMarkers});
            store.save("locations", newLocations);
        }).catch((error) => {
            console.error(error);
        });
    }

    onRegionChange(location) {
        this.setState({ currentZoom: location.zoom });
    }
    onRegionWillChange(location) {
        console.log(location);
    }
    onUpdateUserLocation(location) {
        console.log(location);
    }
    onOpenAnnotation(annotation) {
        console.log(annotation);
        //this.props.showForm(annotation);
    }
    onTap(location) {
        console.log(location);
    }
    onRightAnnotationTapped = (location) => {
        console.log('onRightAnnotationTapped', location);
        this.props.showForm(location);
    };
    addNewMarker = (location) => {
        var newLocationToMake = {
            coordinates: [
                parseFloat(location.latitude),
                parseFloat(location.longitude)
            ],
            type: "point",
            title: "Add new...",
            subtitle: "",
            id: "" + -1,
            rightCalloutAccessory:{
                url: 'https://cldup.com/9Lp0EaBw5s.png',
                height: 25,
                width: 25
            }
        };
        this.state["newLocationMarkers"] = [newLocationToMake];
        this.setState(this.state);
        console.log(newLocationToMake);
    };

    render() {

        var spinner = this.state.isLoading
            ? (<ActivityIndicatorIOS size='large'/>)
            : (<View/>);

        return (
            <View style={{flex: 2}}>
                <MapView
                  ref={map => { this._map = map; }}
                  style={styles.map}
                  initialCenterCoordinate={this.state.center}
                  initialZoomLevel={this.state.zoom}
                  initialDirection={0}
                  rotateEnabled={true}
                  scrollEnabled={true}
                  zoomEnabled={true}
                  showsUserLocation={true}
                  styleURL={Mapbox.mapStyles.outdoor}
                  userTrackingMode={this.state.userTrackingMode}
                  annotations={this.state.locations.concat(this.state.newLocationMarkers)}
                  annotationsAreImmutable
                  onChangeUserTrackingMode={this.onChangeUserTrackingMode}
                  onRegionDidChange={this.onRegionDidChange}
                  onRegionWillChange={this.onRegionWillChange}
                  onOpenAnnotation={this.onOpenAnnotation}
                  onRightAnnotationTapped={this.onRightAnnotationTapped}
                  onUpdateUserLocation={this.onUpdateUserLocation}
                  onLongPress={this.addNewMarker}
                  onTap={this.onTap}
                />
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
            index: nextIndex
        });
    }

    onShowForm()
    {
        console.log("Hello2");
        //console.log("Hello" + props);
        this.props.navigator.push({title: 'second'});
    }

    // Function to call to go back to the previous scene
    onBack()
    {
        if (route.index > 0) {
            this.props.navigator.pop();
        }
    }
}

AppRegistry.registerComponent('WaterRangers', () => WaterRangers);

var styles = require('./Styles/Styles');
