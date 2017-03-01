import React, { Component } from 'react';
import { ActivityIndicatorIOS, View } from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import store from 'react-native-simple-store';
import locations from '../../locations.json';
import GLOBAL from '../../Globals';
import { styles } from '../../styles/scenes/Map';

const accessToken = 'pk.eyJ1Ijoid2F0ZXJyYW5nZXJzIiwiYSI6ImY4Mzc4MTZkZDZkN2Y4YzFhMjA2MzQ3NDAyZjM0MjI1In0.jA6aLxZWzUm8bSBbumka4Q';
Mapbox.setAccessToken(accessToken);

export class MapScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      locations: [],
      newLocationMarkers: [],
      marker: [],
      center: {
        latitude: 45.4215, // Center of Ottawa
        longitude: -75.6972 // Center of Ottawa
      },
      zoom: 16,
      userTrackingMode: Mapbox.userTrackingMode.none
    };
  }
  componentWillMount() {
    // store.get('locations').then((value) => {
    //   if (value == null) {
    //     this.setState({ locations });
    //   } else {
    //     this.setState({ locations: value });
    //   }
    //   this.loadLocationsAsync();
    // }).done();
    // Icon.getImageSource('ios-add-circle-outline', 25, '#1c3653')
    //   .then(source => this.setState({ addIcon: source }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      center: {
        latitude: nextProps.geoLat,
        longitude: nextProps.geoLng
      }
    }, () => {
      // Is this the right place to do this?
      this._map.setCenterCoordinate(this.state.center.latitude, this.state.center.longitude);
    });
  }

  onRegionDidChange(location) {
    console.log('RegionDidChange: ', location);
  }
  onRegionWillChange(location) {
    console.log(location);
  }
  onUpdateUserLocation(location) {
    console.log(location);
  }
  onOpenAnnotation(annotation) {
    console.log(annotation);
    this.props.showForm(annotation);
  }
  onLongPress(location) {
    console.log(location);
  }
  onTap(location) {
    console.log(location);
  }
  onRightAnnotationTapped = (location) => {
    console.log('onRightAnnotationTapped: ', location);
    this.props.navigation.navigate('Add', { marker: location });
  };
  onFinishLoadingMap() {
    console.log('Map finished');
  }

  addNewMarker = (location) => {
    console.log('New marker at:', location);
    const newLocationToMake = {
      coordinates: [parseFloat(location.latitude), parseFloat(location.longitude)],
      type: 'point',
      title: 'Add new...',
      subtitle: '',
      id: '-1',
      rightCalloutAccessory: {
        source: this.state.addIcon,
        height: 25,
        width: 25
      }
    };
    this.setState({ newLocationMarkers: [newLocationToMake] });
    console.log(newLocationToMake);
  };

  loadLocationsAsync() {
    return fetch(`${GLOBAL.BASE_URL}locations`)
      .then(response => response.json())
      .then((responseJson) => {
        const currentLocations = [];
        for (let index = 0; index < responseJson.length; index += 1) {
          const location = responseJson[index];
          const locationTitle = location.body_of_water || location.name;
          const locationID = location.id.toString();
          const currentLocation = {
            coordinates: [parseFloat(location.lat), parseFloat(location.lng)],
            type: 'point',
            title: locationTitle,
            subtitle: '',
            id: locationID,
            rightCalloutAccessory: {
              source: this.state.addIcon,
              height: 25,
              width: 25
            }
          };
          currentLocations.push(currentLocation);
        }
        // const newLocationToMake = {
        //   coordinates: [52, 0],
        //   type: 'point',
        //   title: 'Add new...',
        //   subtitle: '',
        //   id: 'marker',
        //   rightCalloutAccessory: {
        //     source: this.state.addIcon,
        //     height: 25,
        //     width: 25
        //   }
        // };
        this.setState({
          locations: currentLocations,
          newLocationMarkers: this.state.newLocationMarkers
        });
        store.save(locations, currentLocations);
      }).catch((error) => {
        console.log('err', error);
      });
  }

  render() {
    const { isLoading } = this.state;
    const spinner = isLoading ? (<ActivityIndicatorIOS size="large" />) : (<View />);
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref => this._map = ref}
          contentInset={[0, 0, 0, 0]}
          style={styles.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={this.state.zoom}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={false}
          styleURL={Mapbox.mapStyles.outdoor}
          userTrackingMode={this.state.userTrackingMode}
          // annotations={this.state.locations.concat(this.state.newLocationMarkers)}
          annotationsAreImmutable
          onChangeUserTrackingMode={this.onChangeUserTrackingMode}
          onRegionDidChange={this.onRegionDidChange}
          onRegionWillChange={this.onRegionWillChange}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.addNewMarker}
          onTap={this.onTap}
          onFinishLoadingMap={this.onFinishLoadingMap}
        />
        {spinner}
      </View>
    );
  }
}
