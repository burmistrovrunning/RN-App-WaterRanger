import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import t from 'tcomb-form-native';
import ImagePicker from 'react-native-image-picker';
import { AddIssueForm, AddObservationForm, getIssue, getObservation } from './forms';
import { markerSelector } from '../../redux/selectors';
import { uploadForm, storeFailedForm } from '../../services';
import { styles } from '../../styles/common';
import { styles as addStyles } from '../../styles/scenes/Add';

const { Form } = t.form;
Form.i18n = {
  optional: '',
  required: ' *' // inverting the behaviour: adding a postfix to the required fields
};
const options = {
  fields: {
    wildlife: {
      factory: t.form.select
    }
  }
};

export class _AddScene extends Component {
  constructor(props) {
    super(props);
    // const { state } = this.props.navigation;
    this.state = {
      form: 'observation',
      marker: props.marker,
      isSubmitting: false
    };
    this.formView = null;
    this.scrollView = null;
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.marker, nextProps.marker)) {
      this.setState({ marker: nextProps.marker });
      if (this.scrollView) {
        this.scrollView.scrollTo({ y: 0, animated: false });
      }
    }
  }

  onChooseObservation = () => {
    this.setState({form: 'observation'});
  };

  onChooseIssue = () => {
    this.setState({form: 'issue'});
  };

  onChoosePicture = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can display the image using either data...
        let avatarSource = {
          uri: `data:image/jpeg;base64,${response.data}`,
          isStatic: true
        };

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          avatarSource = {
            uri: response.uri.replace('file://', ''),
            isStatic: true
          };
        } else {
          avatarSource = {
            uri: response.uri,
            isStatic: true
          };
        }
        this.setState({ avatarSource });
      }
    });
  }

  onSubmit = async () => {
    const value = this.formView.getValue();
    const { marker } = this.state;
    this.setState({ isSubmitting: true });
    if (value) {
      const dictToSend = {};
      if (this.state.form === 'issue') {
        dictToSend.issues = [getIssue(this.formView)];
      } else {
        dictToSend.observations = [getObservation(this.formView)];
      }
      const dictKey = (this.state.form === 'issue')
        ? 'issues'
        : 'observations';
      if (marker.id !== '-1' && marker.id !== 'gpsLocationMarker') {
        dictToSend[dictKey][0].location_id = marker.id;
      } else {
        dictToSend[dictKey][0].location_attributes = {
          lat: marker.latitude,
          lng: marker.longitude,
          body_of_water: value.bodyOfWater,
          name: value.locationName,
          description: value.locationDescription
        };
      }
      dictToSend[dictKey][0].local_id = `${new Date().getTime()}`;
      dictToSend.uid = `${new Date()}`;
      let flagSuccess = false;
      try {
        const response = await uploadForm(dictToSend);
        if (response.status === 200 || response.status === 204) {
          flagSuccess = true;
          var successAlertMessage = 'Your ' + this.state.form + ' has been submitted to Water Rangers.';
          Alert.alert('Success!', successAlertMessage,
            [{ text: 'Continue' }], { cancelable: true }
          );
        }
      } catch (err) {
        console.log('err', err);
      }
      if (!flagSuccess) {
        await storeFailedForm(dictToSend);
        Alert.alert('No network access', 'It looks like you are offline so we have stored your form to be submitted later.',
          [{ text: 'Close' }], { cancelable: true }
        );
      }
      this.setState({ isSubmitting: false });
    }
  };
  renderWaiting() {
    if (this.state.isSubmitting) {
      return (
        <View style={addStyles.waitingContainer}>
          <ActivityIndicator
            animating={true}
            color="white"
            size="large"
          />
        </View>
      );
    }
    return <View />;
  }
  render() {
    const { marker, form, avatarSource } = this.state;
    const _ = require('lodash');
    let defaultValue = {};
    if (marker && marker.id !== '-1' && marker.id !== 'gpsLocationMarker') {
      options.fields = {
        bodyOfWater: { editable: false },
        locationName: { hidden: true },
        locationDescription: { hidden: true }
      };
      defaultValue = {
        bodyOfWater: marker.title || 'Not added',
        locationName: '',
        locationDescription: ''
      };
    } else {
      options.fields = {
        bodyOfWater: { editable: true },
        locationName: { hidden: false },
        locationDescription: { hidden: false }
      };
      defaultValue = {
        bodyOfWater: '',
        locationName: '',
        locationDescription: ''
      };
    }
    const formType = form === 'issue' ? AddIssueForm : AddObservationForm;
    return (
      <View style={addStyles.addSceneContainer}>
        <View style={addStyles.addSceneTabBarContainer}>
          <TouchableHighlight style={[addStyles.addSceneTabBarButton, this.state.form === 'observation' && addStyles.addSceneTabBarButtonActive]} onPress={this.onChooseObservation}>
            <Text style={[addStyles.addSceneTabBarText, this.state.form === 'observation' && addStyles.addSceneTabBarTextActive]}>Observation</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[addStyles.addSceneTabBarButton, this.state.form === 'issue' && addStyles.addSceneTabBarButtonActive]} onPress={this.onChooseIssue}>
            <Text style={[addStyles.addSceneTabBarText, this.state.form === 'issue' && addStyles.addSceneTabBarTextActive]}>Issue</Text>
          </TouchableHighlight>
        </View>
        <ScrollView ref={ref => this.scrollView = ref}>
          <View style={addStyles.addScrollContainer}>
            <Text style={styles.headerOne}>Add new {_.capitalize(this.state.form)}</Text>
            <View style={addStyles.addSceneLatLngContainer}>
              <View style={addStyles.addSceneLatLngBlock}>
                <Text style={addStyles.addSceneSmallTitle}>{'Latitude'.toUpperCase()}</Text>
                <Text>{marker.latitude}</Text>
              </View>
              <View style={addStyles.addSceneLatLngBlock}>
                <Text style={addStyles.addSceneSmallTitle}>{'Longitude'.toUpperCase()}</Text>
                <Text>{marker.longitude}</Text>
              </View>
            </View>
            <Form
              ref={ref => this.formView = ref}
              type={formType}
              value={defaultValue}
              options={options}
            />
            <TouchableHighlight style={styles.button} onPress={this.onChoosePicture} underlayColor="#99d9f4">
              <Text style={styles.buttonText}>Choose Image</Text>
            </TouchableHighlight>
            <Image source={avatarSource} style={addStyles.uploadImage} />
            <TouchableHighlight style={styles.button} onPress={this.onSubmit} underlayColor="#99d9f4">
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
        {this.renderWaiting()}
      </View>
    );
  }
}

const mapStateToProps = state => ({ ...markerSelector(state) });
export const AddScene = connect(mapStateToProps)(_AddScene);