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
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import t from 'tcomb-form-native';
import { KeyboardSpacing } from '../../components';
import BaseScene from '../BaseScene';
import { AddIssueForm, AddObservationForm, getIssue, getObservation } from './forms';
import { markerSelector } from '../../redux/selectors';
import { uploadForm, storeFailedForm, localStorage, imagePicker } from '../../services';
import { styles } from '../../styles/common';
import { styles as addStyles } from '../../styles/scenes/Add';

function observationDataTemplate(locals) {
  const inputs = locals.inputs;
  const inputCheckboxes = Object.keys(inputs).map(key => (
    <View key={key} style={addStyles.observationDataCol}>
      {inputs[key]}
    </View>
  ));
  return (
    <View style={addStyles.observationDataContainer}>
      <View style={addStyles.observationDataHeading}>
        <Text style={addStyles.headingLabel}>{locals.label}</Text>
      </View>
      <View style={addStyles.observationDataRow}>
        {inputCheckboxes}
      </View>
    </View>
  );
}

const { Form } = t.form;
const Item = Picker.Item;
const options = {
  i18n: {
    optional: '',
    required: ' *'
  },
  fields: {
    notes: {
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 150
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 150
          }
        }
      }
    },
    category: {
      nullOption: {
        value: '',
        text: 'Choose Issue category'
      }
    },
    wildlife: {
      label: 'Add wildlife',
      template: observationDataTemplate
    },
    invasiveSpecies: {
      template: observationDataTemplate
    },
    ph: {
      label: 'pH (0-14)'
    },
    waterTemp: {
      label: 'Water Temperature â„ƒ'
    },
    airTemp: {
      label: 'Air Temperature â„ƒ'
    },
    disolvedOyxgen: {
      label: 'Disolved Oxygen (mg/L)'
    },
    eColi: {
      label: 'E.coli per 100mL'
    },
    otherColiform: {
      label: 'Other Coliform per 100mL'
    },
    conductivity: {
      label: 'Conductivity (uS/cm)'
    },
    alkalinity: {
      label: 'Alkalinity (mg/L)'
    },
    hardness: {
      label: 'Hardness (mg/L)'
    },
    turbidity: {
      label: 'Turbidity (JTU)'
    },
    kjeldahlNitrogen: {
      label: 'Total Kjeldahl Nitrogen (Âµg/L)'
    },
    phosphorus: {
      label: 'Total Phosphorus (Âµg/L)'
    },
    salinity: {
      label: 'Salinity (ppt)'
    },
    phosphates: {
      label: 'Phosphates total (mg/L)'
    },
    secchiDepth: {
      label: 'Secchi Depth (m)'
    },
    nitrites: {
      label: 'Nitrites (mg/L)'
    },
    nitrates: {
      label: 'Nitrates (mg/L)'
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
      groups: [],
      avatarSource: null,
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
  }

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
          <Text style={styles.headerTwo}>Select Group</Text>
          {component}
        </View>
      );
    }
    return (<View />);
  }
  render() {
    const { marker, form, avatarSource } = this.state;
    let defaultValue = {};
    let fieldOptions = null;
    if (marker && marker.id !== '-1' && marker.id !== 'gpsLocationMarker') {
      fieldOptions = {
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
      fieldOptions = {
        bodyOfWater: { editable: true },
        locationName: { hidden: false },
        locationDescription: {
          hidden: false,
          multiline: true,
          stylesheet: {
            ...Form.stylesheet,
            textbox: {
              ...Form.stylesheet.textbox,
              normal: {
                ...Form.stylesheet.textbox.normal,
                height: 150
              },
              error: {
                ...Form.stylesheet.textbox.error,
                height: 150
              }
            }
          }
        }
      };
      defaultValue = {
        bodyOfWater: '',
        locationName: '',
        locationDescription: ''
      };
    }
    // Is this the best way to add to the form options object?
    options.fields = { ...options.fields, ...fieldOptions };
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
        <ScrollView ref={ref => this.scrollView = ref} keyboardDismissMode="on-drag" keyboardShouldPersistTaps="never">
          <View style={addStyles.addScrollContainer}>
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
            {this.renderGroups()}
            <View style={styles.formContainer}>
              <Form
                ref={ref => this.formView = ref}
                type={formType}
                value={defaultValue}
                options={options}
              />
              <View style={addStyles.imageUploadContainer}>
                <View>
                  <Image source={avatarSource} style={addStyles.uploadImage} />
                </View>
                <View style={addStyles.imageButtonContainer}>
                  <TouchableHighlight style={addStyles.imageButton} onPress={this.onChoosePicture}>
                    <Text style={addStyles.imageButtonText}>Choose Image</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <TouchableHighlight style={styles.button} onPress={this.onSubmit} underlayColor="#99d9f4">
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableHighlight>
            </View>
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
