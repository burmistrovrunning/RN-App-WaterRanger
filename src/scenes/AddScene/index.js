import React from 'react';
import {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import { AttachedImageView } from './AttachedImageView';
import { KeyboardScrollView } from '../../components';
import BaseScene from '../BaseScene';
import { getAddIssueForm, getAddObservationForm, getIssue, getObservation } from './forms';
import { markerSelector } from '../../redux/selectors';
import { MarkerActions } from '../../redux/actions';
import { uploadForm, storeFailedForm, localStorage } from '../../services';
import FormTemplateObservation from './templates/FormTemplateObservation';
import FormTemplateIssue from './templates/FormTemplateIssue';
import WildlifeDataTemplate from './templates/WildlifeDataTemplate';
import InvasiveSpeciesDataTemplate from './templates/InvasiveSpeciesDataTemplate';
import { styles } from '../../styles/common';
import { styles as addStyles } from '../../styles/scenes/Add';
import stylesheet from '../../styles/FormStyles';

const { Form } = t.form;
Form.stylesheet = stylesheet;

function formLayoutTemplateObservation(locals) {
  return <FormTemplateObservation locals={locals} />;
}

function formLayoutTemplateIssue(locals) {
  return <FormTemplateIssue locals={locals} />;
}

function wildlifeLayoutTemplate(locals) {
  return <WildlifeDataTemplate locals={locals} />;
}

function invasiveSpeciesLayoutTemplate(locals) {
  return <InvasiveSpeciesDataTemplate locals={locals} />;
}

export class _AddScene extends BaseScene {
  constructor(props) {
    super(props);
    // const { state } = this.props.navigation;
    this.state = {
      form: 'observation',
      isSubmitting: false,
      groups: [],
      keyboardHeight: new Animated.Value(0),
      currentDate: new Date()
    };
    this.formView = null;
    this.scrollView = null;
    this.attachImageRef = null;
    this.keyboardHeight = 0;
  }

  componentDidMount() {
    this.refreshData();
  }

  onRefreshLocation = () => {
    const { marker, location } = this.props;
    marker.latitude = location.latitude;
    marker.longitude = location.longitude;
    this.props.dispatch(MarkerActions.updateMarker(marker));
  };
  onChooseObservation = () => {
    this.setState({ form: 'observation' });
  };
  onChooseIssue = () => {
    this.setState({ form: 'issue' });
  };
  onSubmit = async () => {
    const value = this.formView.getValue();
    const { marker } = this.props;
    const { form } = this.state;
    const avatarSource = this.attachImageRef.getImage();
    if (value) {
      this.setState({ isSubmitting: true });
      const dictToSend = {};
      if (form === 'issue') {
        dictToSend.issues = [getIssue(this.formView, this.state.groups)];
      } else {
        dictToSend.observations = [getObservation(this.formView, this.state.groups)];
      }
      const dictKey = (form === 'issue')
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
      dictToSend[dictKey][0].imageFile = avatarSource;
      const response = await uploadForm(dictToSend);
      if (response.status === 200 || response.status === 204) {
        const ids = JSON.stringify(form === 'issue' ? response.jsonRes.issues : response.jsonRes.observations);
        const successAlertMessage = `Your ${this.state.form} has been submitted to Water Rangers. ${ids}`;
        Alert.alert('Success!', successAlertMessage,
          [{ text: 'Continue', onPress: () => this.props.resetScene('MapScene') }], { cancelable: true }
        );
      } else if (response.status === -1) {
        await storeFailedForm(dictToSend);
        Alert.alert('No network access', 'It looks like you are offline so we have stored your form to be submitted later.',
          [{ text: 'Close', onPress: () => this.props.resetScene('MyObservationScene') }], { cancelable: true }
        );
      } else {
        await storeFailedForm(dictToSend);
        Alert.alert('Server error returned', 'There was a problem submitting so we have stored your form to be submitted later.',
          [{ text: 'Close', onPress: () => this.props.resetScene('MyObservationScene') }], { cancelable: true }
        );
      }
      this.setState({ isSubmitting: false });
      this.attachImageRef.resetImage();
    }
    this.scrollView.getRef().scrollTo({ y: 0, animated: false });
  };
  refreshData() {
    setTimeout(async () => {
      const profile = JSON.parse(await localStorage.get('profile'));
      if (profile) {
        const { groups } = profile;
        if (groups) {
          this.setState({ groups });
        }
      }
      this.scrollView.getRef().scrollTo({ y: 0, animated: false });
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
  render() {
    const { marker } = this.props;
    const { form, currentDate } = this.state;
    const formTemplate = form === 'issue' ? formLayoutTemplateIssue : formLayoutTemplateObservation;
    const groupHelpText = form === 'issue' ? 'Choose a group to assign this issue to.' : 'Only assign an observation to a group if you have been trained by them!';
    const options = {
      i18n: {
        optional: '',
        required: ' *'
      },
      stylesheet,
      template: formTemplate,
      checkbox: {
        label: ''
      },
      fields: {
        notes: {
          multiline: true,
          placeholder: 'Enter additional information about the Observation here...',
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
        description: {
          multiline: true,
          placeholder: 'Enter additional information about the Issue here...',
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
        group: {
          nullOption: {
            value: '',
            text: 'Select Group...',
          },
          help: groupHelpText
        },
        category: {
          nullOption: {
            value: '',
            text: 'Select Issue category...'
          },
          help: 'Choose which category best matches your issue'
        },
        iceWatch: {
          label: 'Is the ice on or off the Water?',
          nullOption: {
            value: '',
            text: 'Select value...'
          }
        },
        date: {
          // config: {
          //   format: date => moment(currentDate).format('MM/DD/YYYY : HH:MM')
          // },
          maximumDate: currentDate
        },
        wildlife: {
          label: 'Add wildlife',
          tintColor: '#fff',
          onTintColor: '#246EC0',
          template: wildlifeLayoutTemplate
        },
        invasiveSpecies: {
          label: 'Add Invasive Species',
          tintColor: '#fff',
          onTintColor: '#246EC0',
          template: invasiveSpeciesLayoutTemplate
        },
        ph: {
          label: 'pH (0-14)'
        },
        waterTemp: {
          label: 'Water Temperature ℃'
        },
        airTemp: {
          label: 'Air Temperature ℃'
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
          label: 'Total Kjeldahl Nitrogen (µg/L)'
        },
        phosphorus: {
          label: 'Total Phosphorus (µg/L)'
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
        },
        weather: {
          placeholder: 'e.g. Was there a recent storm?'
        },
        seenBefore: {
          placeholder: 'eg. When or for how long?'
        },
        notifiedAgencies: {
          placeholder: "eg. I notified 'Example Agency' on March 22, 2016"
        }
      }
    };

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
        bodyOfWater: {
          editable: true,
          placeholder: 'e.g. Blue Lake'
        },
        locationName: {
          hidden: false,
          placeholder: 'e.g. Near City Name or BL613-1'
        },
        locationDescription: {
          hidden: false,
          placeholder: 'Provide details specific to this Location. For example: Is the water still? or moving? Is there a danger here?',
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

    options.fields = { ...options.fields, ...fieldOptions };
    const formType = form === 'issue' ? getAddIssueForm(this.state.groups) : getAddObservationForm(this.state.groups);
    return (
      <View style={addStyles.addSceneContainer}>
        <View style={addStyles.addSceneTabBarContainer}>
          <TouchableHighlight
            style={[
              addStyles.addSceneTabBarButton,
              addStyles.addSceneTabBarButtonLeft,
              form === 'observation' && addStyles.addSceneTabBarButtonLeftActive
            ]}
            onPress={this.onChooseObservation}
            underlayColor="#edede5"
          >
            <Text
              style={[addStyles.addSceneTabBarTextLeft, form === 'observation' && addStyles.addSceneTabBarTextActive]}
            >
              {'Observation'.toUpperCase()}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              addStyles.addSceneTabBarButton,
              addStyles.addSceneTabBarButtonRight,
              form === 'issue' && addStyles.addSceneTabBarButtonRightActive
            ]}
            onPress={this.onChooseIssue}
            underlayColor="#edede5"
          >
            <Text
              style={[addStyles.addSceneTabBarTextRight, form === 'issue' && addStyles.addSceneTabBarTextActive]}
            >
              {'Issue'.toUpperCase()}
            </Text>
          </TouchableHighlight>
        </View>
        <KeyboardScrollView
          ref={ref => this.scrollView = ref}
          keyboardDismissMode="on-drag"
          onScroll={this.onHandleScroll}
          keyboardShouldPersistTaps="never"
        >
          <Animated.View style={[addStyles.addScrollContainer, { top: this.state.keyboardHeight }]}>
            <View style={addStyles.addSceneLatLngContainer}>
              <View style={addStyles.addSceneLatLngBlock}>
                <Text style={addStyles.addSceneLatLngTitle}>{'Lat:'.toUpperCase()}</Text>
                <Text style={[addStyles.addSceneLatLngTitle, addStyles.addSceneLatLngValue]}>
                  {marker.latitude.toFixed(5)}
                </Text>
              </View>
              <View style={addStyles.addSceneLatLngBlock}>
                <Text style={addStyles.addSceneLatLngTitle}>{'Lng:'.toUpperCase()}</Text>
                <Text style={[addStyles.addSceneLatLngTitle, addStyles.addSceneLatLngValue]}>
                  {marker.longitude.toFixed(5)}
                </Text>
              </View>
              <View style={[addStyles.addSceneLatLngBlock, addStyles.addSceneLatLngRefreshBlock]}>
                <TouchableOpacity style={styles.findMeButton} onPress={this.onRefreshLocation}>
                  <Text style={styles.findMeButtonText}>{'Refresh'.toUpperCase()}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.formContainer}>
              <Form
                ref={ref => this.formView = ref}
                type={formType}
                value={defaultValue}
                options={options}
                onChange={this._onChange}
              />
              <AttachedImageView ref={ref => this.attachImageRef = ref} />
              <View style={addStyles.formSubmit}>
                <TouchableHighlight style={styles.button} onPress={this.onSubmit} underlayColor="#99d9f4">
                  <Text style={styles.buttonText}>{'Submit'.toUpperCase()}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Animated.View>
        </KeyboardScrollView>
        {this.renderWaiting()}
      </View>
    );
  }
}

const mapStateToProps = state => ({ ...markerSelector(state) });
export const AddScene = connect(mapStateToProps, null, null, { withRef: true })(_AddScene);
