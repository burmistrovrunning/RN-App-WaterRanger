import React, { Component } from 'react';
import { ActivityIndicatorIOS, View } from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { locationSelector } from '../../redux/selectors';
import { MarkerActions } from '../../redux/actions';
import { getLocations } from '../../services';
import { styles } from '../../styles/scenes/Map';

const accessToken = 'pk.eyJ1Ijoid2F0ZXJyYW5nZXJzIiwiYSI6ImY4Mzc4MTZkZDZkN2Y4YzFhMjA2MzQ3NDAyZjM0MjI1In0.jA6aLxZWzUm8bSBbumka4Q';
Mapbox.setAccessToken(accessToken);

export class _MapScene extends Component {
  constructor(props) {
    super(props);
    console.log('location', props.location);
    this.state = {
      isLoading: false,
      locations: [],
      newMarkers: [],
      marker: [],
      center: {
        latitude: props.location.latitude,
        longitude: props.location.longitude
      },
      zoom: 16,
      userTrackingMode: Mapbox.userTrackingMode.none
    };
  }
  componentDidMount() {
    this.loadLocationsAsync();
    Icon.getImageSource('ios-add-circle-outline', 25, '#1c3653')
      .then(markerIcon => this.setState({ markerIcon }));
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.location, nextProps.location)) {
      this.setState({
        center: {
          latitude: nextProps.location.latitude,
          longitude: nextProps.location.longitude
        }
      }, () => {
        this.mapView.setCenterCoordinate(nextProps.location.latitude, nextProps.location.longitude);
      });
    }
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
    // this.props.showForm(annotation);
  }
  onLongPress(location) {
    console.log(location);
  }
  onTap(location) {
    console.log(location);
  }
  onRightAnnotationTapped = (location) => {
    this.props.dispatch(MarkerActions.updateMarker(location));
    this.props.resetScene('AddScene');
  };
  onFinishLoadingMap() {
    console.log('Map finished');
  }
  getCurrentLocationMarker = () => {
    const { latitude, longitude } = this.state.center;
    return [{
      coordinates: [parseFloat(latitude).toFixed(4), parseFloat(longitude).toFixed(4)],
      id: 'currentLocationMarker',
      type: 'point',
      annotationImage: {
        source: { uri: 'icon_location' },
        width: 20,
        height: 32,
      },
    }];
  };
  addNewMarker = ({ latitude, longitude }) => {
    const newMarker = {
      coordinates: [parseFloat(latitude).toFixed(4), parseFloat(longitude).toFixed(4)],
      type: 'point',
      title: 'Add new...',
      subtitle: '',
      id: '-1',
      rightCalloutAccessory: {
        source: this.state.markerIcon,
        height: 25,
        width: 25
      }
    };
    const newMarkers = this.state.newMarkers.concat([newMarker]);
    this.setState({ newMarkers });
  };
  loadLocationsAsync = async () => {
    const locations = await getLocations();
    locations.forEach((_location) => {
      const location = _location;
      location.rightCalloutAccessory = {
        source: this.state.markerIcon,
        height: 25,
        width: 25
      };
    });
    this.setState({ locations });
  };

  render() {
    const { isLoading, newMarkers, locations } = this.state;
    let annotations = locations.concat(newMarkers);
    annotations = annotations.concat(this.getCurrentLocationMarker());
    const spinner = isLoading ? (<ActivityIndicatorIOS size="large" />) : (<View />);
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <MapView
          ref={ref => this.mapView = ref}
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
          annotations={annotations}
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

const mapStateToProps = state => ({ ...locationSelector(state) });
export const MapScene = connect(mapStateToProps)(_MapScene);
