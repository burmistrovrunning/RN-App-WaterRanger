import React from 'react';
import { Alert, View, TouchableOpacity, Text } from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import BaseScene from '../BaseScene';
import { locationSelector } from '../../redux/selectors';
import { MarkerActions } from '../../redux/actions';
import { getLocations, getClusters } from '../../services';
import { styles } from '../../styles/scenes/Map';

const accessToken = 'pk.eyJ1Ijoid2F0ZXJyYW5nZXJzIiwiYSI6ImY4Mzc4MTZkZDZkN2Y4YzFhMjA2MzQ3NDAyZjM0MjI1In0.jA6aLxZWzUm8bSBbumka4Q';
Mapbox.setAccessToken(accessToken);

export class _MapScene extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      locations: [],
      newMarkers: [],
      mapMarkers: [],
      center: {
        latitude: props.location.latitude,
        longitude: props.location.longitude
      },
      zoom: 16,
      flagRemove: false,
      deleteIcon: null,
      userTrackingMode: Mapbox.userTrackingMode.none
    };
    this.latClusteringZoom = -1;
    this.tapMaker = false;
  }
  componentDidMount() {
    this.refreshData();
    Icon.getImageSource('ios-add-circle-outline', 25, '#1c3653')
      .then(addIcon => this.setState({ addIcon }));
    Icon.getImageSource('ios-remove-circle-outline', 25, '#1c3653')
      .then(deleteIcon => this.setState({ deleteIcon }));
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

  onRegionDidChange = (location) => {
    if (location.zoomLevel.toFixed(0) !== this.latClusteringZoom) {
      const clusters = getClusters(this.state.locations, location.zoomLevel.toFixed(0));
      this.latClusteringZoom = location.zoomLevel.toFixed(0);
      const mapMarkers = this.convertClustersToMarkers(clusters);
      this.setState({ mapMarkers });
    }
  }
  onRegionWillChange(location) {
    console.log(location);
  }
  onUpdateUserLocation(location) {
    console.log(location);
  }
  onOpenAnnotation = (annotation) => {
    this.tapMaker = true;
    console.log('onOpenAnnotation', annotation, this.tapMaker);
    // this.props.showForm(annotation);
  }
  onLongPress(location) {
    console.log(location);
  }
  onTap(location) {
    console.log(location);
  }
  onRightAnnotationTapped = (marker) => {
    if (!this.state.flagRemove) {
      this.props.dispatch(MarkerActions.updateMarker(marker));
      return this.props.resetScene('AddScene');
    }
    Alert.alert('Information', `Do you want delete selected marker ${marker.title}`,
      [{ text: 'Cancel' }, { text: 'OK', onPress: () => this.removeMarker(marker) }],
      { cancelable: true }
    );
  };
  onFinishLoadingMap() {
    console.log('Map finished');
  }
  onUpdateRemoveStatus = () => {
    const { flagRemove } = this.state;
    this.setState({ flagRemove: !flagRemove });
    const mapMarkers = this.updateMarkerRightIcon(this.state.mapMarkers, !flagRemove);
    const newMarkers = this.updateMarkerRightIcon(this.state.newMarkers, !flagRemove);
    this.setState({ newMarkers, mapMarkers });
  };
  getCurrentLocationMarker = () => {
    const { latitude, longitude } = this.state.center;
    const lat = Number(parseFloat(latitude).toFixed(4));
    const lon = Number(parseFloat(longitude).toFixed(4));
    return [{
      coordinates: [lat, lon],
      id: 'currentLocationMarker',
      type: 'point',
      annotationImage: {
        source: { uri: 'my_location_icon' },
        width: 25,
        height: 25,
      },
    }];
  };
  getMarkerIndex(markers, marker) {
    let ret = -1;
    markers.forEach((_marker, idx) => {
      if (_marker.id === marker.id) {
        ret = idx;
        return ret;
      }
    });
    return ret;
  }
  updateMarkerRightIcon(markers, flagRemove) {
    return markers.map((marker) => {
      const ret = { ...marker };
      ret.rightCalloutAccessory = {
        source: flagRemove ? this.state.deleteIcon : this.state.addIcon,
        height: 25,
        width: 25
      };
      return ret;
    });
  }
  removeMarker = (marker) => {
    const { mapMarkers, newMarkers, locations } = this.state;
    let index = this.getMarkerIndex(mapMarkers, marker);
    if (index !== -1) {
      mapMarkers.splice(index, 1);
      const index1 = this.getMarkerIndex(locations, marker);
      if (index1 !== -1) {
        locations.splice(index1, 1);
      }
      return this.setState({ mapMarkers: [...mapMarkers], locations: [...locations] });
    }
    index = this.getMarkerIndex(newMarkers, marker);
    if (index !== -1) {
      newMarkers.splice(index, 1);
      return this.setState({ newMarkers: [...newMarkers] });
    }
  };
  addNewMarker = ({ latitude, longitude }) => {
    this.tapMaker = false;
    setTimeout(() => {
      if (!this.tapMaker) {
        const lat = Number(parseFloat(latitude).toFixed(4));
        const lon = Number(parseFloat(longitude).toFixed(4));
        const newMarker = {
          coordinates: [lat, lon],
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
        const newMarkers = this.state.newMarkers.concat([newMarker]);
        this.setState({ newMarkers, flagRemove: false });
      }
    }, 1000);
  };
  convertClustersToMarkers(clusters) {
    return clusters.map((cluster) => {
      const marker = cluster.properties;
      if (marker.cluster) {
        marker.type = 'point';
        marker.title = `${marker.point_count} items`;
        marker.id = `cluster${marker.cluster_id}`;
        marker.coordinates = [cluster.geometry.coordinates[1], cluster.geometry.coordinates[0]];
        marker.annotationImage = {
          source: { uri: 'icon_cluster' },
          width: 30,
          height: 30,
        };
      } else {
        marker.rightCalloutAccessory = {
          source: this.state.addIcon,
          height: 25,
          width: 25
        };
      }
      return marker;
    });
  }
  refreshData = () => {
    setTimeout(async () => {
      const locations = await getLocations();
      const clusters = getClusters(locations, this.state.zoom);
      const mapMarkers = this.convertClustersToMarkers(clusters);
      this.latClusteringZoom = this.state.zoom;
      this.setState({ locations, mapMarkers });
    }, 100);
  };
  renderRemoveView() {
    const backgroundColor = this.state.flagRemove ? '#888' : '#EEE';
    return (
      <TouchableOpacity
        style={[styles.removeContainer, { backgroundColor }]}
        onPress={this.onUpdateRemoveStatus}
      >
        <Text>Remove</Text>
      </TouchableOpacity>
    );
  }
  render() {
    const { newMarkers, mapMarkers } = this.state;
    let annotations = mapMarkers.concat(newMarkers);
    annotations = annotations.concat(this.getCurrentLocationMarker());
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
          onTap={this.addNewMarker}
          onFinishLoadingMap={this.onFinishLoadingMap}
        />
        {this.renderRemoveView()}
      </View>
    );
  }
}

const mapStateToProps = state => ({ ...locationSelector(state) });
export const MapScene = connect(mapStateToProps, null, null, { withRef: true })(_MapScene);
