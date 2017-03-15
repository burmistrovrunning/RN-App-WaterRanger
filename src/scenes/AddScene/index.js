import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Picker,
} from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import t from 'tcomb-form-native';
import BaseScene from '../BaseScene';
import { AddIssueForm, AddObservationForm, getIssue, getObservation } from './forms';
import { markerSelector } from '../../redux/selectors';
import { KeyboardSpacing } from '../../components';
import { uploadForm, storeFailedForm, localStorage, imagePicker } from '../../services';
import { styles } from '../../styles/common';
import { styles as addStyles } from '../../styles/scenes/Add';

const { Form } = t.form;
const Item = Picker.Item;
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

export class _AddScene extends BaseScene {
  constructor(props) {
    super(props);
    // const { state } = this.props.navigation;
    this.state = {
      form: 'observation',
      marker: props.marker,
      isSubmitting: false,
      groupValue: 0,
      selectGroup: false,
      avatarSource: null,
      groups: []
    };
    this.formView = null;
    this.scrollView = null;
  }

  componentDidMount() {
    this.refreshData();
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

  onChoosePicture = async () => {
    try {
      const res = await imagePicker.show();
      this.setState({ avatarSource: res.source });
    } catch (err) {
      console.log('Choose picture err', err);
    }
  };

  onSubmit = async () => {
    const value = this.formView.getValue();
    const { marker, avatarSource } = this.state;
    if (value) {
      this.setState({ isSubmitting: true });
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
      dictToSend.imageFile = avatarSource;
      let flagSuccess = false;
      try {
        const response = await uploadForm(dictToSend);
        if (response.status === 200 || response.status === 204) {
          const jsonRes = await response.json();
          flagSuccess = true;
          const ids = JSON.stringify(jsonRes.observations);
          const successAlertMessage = `Your ${this.state.form} has been submitted to Water Rangers. ${ids}`;
          Alert.alert('Success!', successAlertMessage,
            [{ text: 'Continue', onPress: () => this.props.resetScene('MapScene') }], { cancelable: true }
          );
        }
      } catch (err) {
        console.log('err', err);
      }
      if (!flagSuccess) {
        await storeFailedForm(dictToSend);
        Alert.alert('No network access', 'It looks like you are offline so we have stored your form to be submitted later.',
          [{ text: 'Close', onPress: () => this.props.resetScene('MyObservationScene') }], { cancelable: true }
        );
      }
      this.setState({ isSubmitting: false, avatarSource: null });
    }
    this.scrollView.scrollTo({ y: 0, animated: false });
  };
  onGroupValueChange = groupValue => this.setState({ groupValue, selectGroup: false });
  onStartSelectGroup = () => {
    this.setState({ selectGroup: true });
  };
  refreshData() {
    setTimeout(async () => {
      const profile = JSON.parse(await localStorage.get('profile'));
      const { groups } = profile;
      this.setState({ groups, groupValue: groups[0].id });
      this.scrollView.scrollTo({ y: 0, animated: false });
    }, 100);
  }
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

  renderGroups() {
    const { form, selectGroup, groupValue, groups } = this.state;
    if (form === 'observation' && groups.length > 0) {
      console.log('groups', groups);
      let component = (
        <Picker
          selectedValue={groupValue}
          style={addStyles.picker}
          onValueChange={this.onGroupValueChange}
          mode="dialog"
        >
          {groups.map(group => (
            <Item label={group.name} key={group.id} value={group.id} />
          ))}
        </Picker>
      );
      if (Platform.OS === 'ios' && !selectGroup) {
        let groupName = '';
        groups.forEach((group) => {
          if (group.id === groupValue) {
            groupName = group.name;
          }
        });
        component = (
          <TouchableOpacity onPress={this.onStartSelectGroup}>
            <Text style={addStyles.groupItem}>{groupName}</Text>
          </TouchableOpacity>
        );
      }
      return (
        <View style={addStyles.groupSelectContainer}>
          <Text style={styles.headerOne}>Select Group</Text>
          {component}
        </View>
      );
    }
    return (<View />);
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
          <TouchableHighlight
            style={[addStyles.addSceneTabBarButton, form === 'observation' && addStyles.addSceneTabBarButtonActive]}
            onPress={this.onChooseObservation}
          >
            <Text
              style={[addStyles.addSceneTabBarText, form === 'observation' && addStyles.addSceneTabBarTextActive]}
            >
              Observation
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[addStyles.addSceneTabBarButton, form === 'issue' && addStyles.addSceneTabBarButtonActive]}
            onPress={this.onChooseIssue}
          >
            <Text
              style={[addStyles.addSceneTabBarText, form === 'issue' && addStyles.addSceneTabBarTextActive]}
            >
              Issue
            </Text>
          </TouchableHighlight>
        </View>
        {this.renderGroups()}
        <ScrollView ref={ref => this.scrollView = ref} keyboardDismissMode="on-drag" keyboardShouldPersistTaps="never">
          <View style={addStyles.addScrollContainer}>
            <Text style={styles.headerOne}>Add new {_.capitalize(this.state.form)}</Text>
            <View style={addStyles.addSceneLatLngContainer}>
              <View style={addStyles.addSceneLatLngBlock}>
                <Text style={addStyles.addSceneSmallTitle}>{'Latitude'.toUpperCase()}</Text>
                <Text>{marker.latitude.toFixed(5)}</Text>
              </View>
              <View style={addStyles.addSceneLatLngBlock}>
                <Text style={addStyles.addSceneSmallTitle}>{'Longitude'.toUpperCase()}</Text>
                <Text>{marker.longitude.toFixed(5)}</Text>
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
        <KeyboardSpacing />
      </View>
    );
  }
}

const mapStateToProps = state => ({ ...markerSelector(state) });
export const AddScene = connect(mapStateToProps, null, null, { withRef: true })(_AddScene);
