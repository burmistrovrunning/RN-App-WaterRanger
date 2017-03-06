import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Platform,
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
      isSubmitting: false,
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
    this.setState({ form: 'observation' });
  };

  onChooseIssue = () => {
    this.setState({ form: 'issue' });
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
      if (marker.id !== '-1') {
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
      dictToSend.uid = `${new Date()}`;

      uploadForm(dictToSend).then(async (response) => {
        console.log('res', response);
        let error = false;
        if (response.status === 200 || response.status === 204) {
          // success, show some message and return?
          this.setState({ isSubmitting: false });
        } else {
          storeFailedForm(dictToSend);
          error = 'Please check your connection and try again.';
          console.log('Please check your connection and try again.');
          this.setState({ error, isSubmitting: false });
        }
      }).catch((e) => {
        console.log('err', e);
        storeFailedForm(dictToSend);
        const error = 'Please check your connection and try again.';
        console.log('Please check your connection and try again.');
        this.setState({ error, isSubmitting: false });
      });
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
    let defaultValue = {};

    if (marker && marker.id !== '-1') {
      options.fields.bodyOfWater = {
        editable: false
      };
      options.fields.locationName = {
        hidden: true
      };
      options.fields.locationDescription = {
        hidden: true
      };

      defaultValue = {
        bodyOfWater: marker.title || 'Not added',
        locationName: 'ignore',
        locationDescription: 'ignore'
      };
    }
    const formType = form === 'issue' ? AddIssueForm : AddObservationForm;
    return (
      <View style={styles.container}>
        <Text>Latitude {marker.latitude}</Text>
        <Text>Longitude {marker.longitude}</Text>
        <TouchableHighlight onPress={this.onChooseObservation}>
          <Text>Observation</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onChooseIssue}>
          <Text>Issue</Text>
        </TouchableHighlight>
        <ScrollView ref={ref => this.scrollView = ref}>
          <View style={styles.scrollContainer}>
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
