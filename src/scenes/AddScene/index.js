import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import t from 'tcomb-form-native';
import ImagePicker from 'react-native-image-picker';
import { markerSelector } from '../../redux/selectors';
import { uploadForm, storeFailedForm } from '../../services';
import { styles } from '../../styles/common';
import { styles as addStyles } from '../../styles/scenes/Add';

const { Form } = t.form;
Form.i18n = {
  optional: '',
  required: ' *' // inverting the behaviour: adding a postfix to the required fields
};

const WildlifeType = t.enums({
  Mammal: 'Mammal',
  Reptile: 'Reptile',
  Amphibian: 'Amphibian',
  Fish: 'Fish',
  Plant: 'Plant',
  Insect: 'Insect',
  Bird: 'Bird',
  Species: 'Species at risk'
});

const InvasiveSpeciesType = t.enums({
  Phragmites: 'Phragmites',
  Loosestrife: 'Loosestrife',
  'Dog-Strangling Vine': 'Dog-Strangling Vine',
  'Introduced Honeysuckle': 'Introduced Honeysuckle',
  'Zebra Mussels': 'Zebra Mussels',
  'Other Invasive': 'Other Invasive',
  'Eurasian Milfoil': 'Eurasian Milfoil',
  Goldfish: 'Goldfish'
});

const AddObservationForm = t.struct({
  bodyOfWater: t.String,
  locationName: t.maybe(t.String),
  locationDescription: t.maybe(t.String),
  date: t.Date,
  wildlife: t.maybe(t.list(WildlifeType)),
  invasiveSpecies: t.maybe(t.list(InvasiveSpeciesType)),
  waterQualityPh: t.maybe(t.Number),
  waterQualityWaterTemp: t.maybe(t.Number),
  waterQualityAirTemp: t.maybe(t.Number),
  waterQualityDissolvedOxygen: t.maybe(t.Number),
  waterQualityEColi: t.maybe(t.Number),
  waterQualityConductivity: t.maybe(t.Number),
  waterQualityAlkalinity: t.maybe(t.Number),
  waterQualityHardness: t.maybe(t.Number),
  waterQualityTurbidity: t.maybe(t.Number),
  waterQualityKjeldahlNitrogen: t.maybe(t.Number),
  waterQualityPhosphorus: t.maybe(t.Number),
  waterQualitySalinity: t.maybe(t.Number),
  waterQualityPhosphates: t.maybe(t.Number),
  waterQualitySecchiDepth: t.maybe(t.Number),
  waterQualityNitrites: t.maybe(t.Number),
  waterQualityNitrates: t.maybe(t.Number),
  iceWatch: t.maybe(t.Boolean),
  notes: t.maybe(t.String)
});

const IssueType = t.enums({
  algae: 'Algae',
  water_quality: 'Water Quality',
  pollution: 'Pollution',
  shoreline: 'Shoreline',
  wildlife: 'Wildlife',
  other: 'Other'
});

const AddIssueForm = t.struct({
  bodyOfWater: t.String,
  locationName: t.maybe(t.String),
  locationDescription: t.maybe(t.String),
  date: t.Date,
  category: IssueType,
  description: t.maybe(t.String),
  weather: t.maybe(t.String),
  seenBefore: t.maybe(t.Boolean),
  notifiedAgencies: t.maybe(t.String),
  contactEmail: t.maybe(t.String),
  contactPhone: t.maybe(t.String)
});

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
      marker: props.marker
    };
    this.formView = null;
    console.log('props:', props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps:', nextProps);
    if (!isEqual(this.props.marker, nextProps.marker)) {
      this.setState({ marker: nextProps.marker });
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
    if (value) {
      let dictToSend = {};
      const dateString = new Date().toJSON();

      // these need to be populated from the form fully
      if (this.state.form === 'issue') {
        dictToSend = {
          issues: [{
            observed_on: dateString,
            group_tokens: '',
            category: value.category,
            notes: {
              details: '',
              weather: '',
              seen_before: '',
              notified_agencies: ''
            },
            contact_info: {
              email: value.contactEmail,
              phone: value.contactPhone
            }
          }]
        };
      } else {
        dictToSend = {
          observations: [
            {
              observed_on: dateString,
              notes: '',
              group_tokens: '3',
              data: {
                wildlife: [''],
                invasive_species: [''],
                ph: '',
                water_temperature: '',
                air_temperature: '',
                oxygen: '',
                ecoli: '',
                conductivity: '',
                alkalinity: '',
                hardness: '',
                turbidity: '',
                total_kjeldahl_nitrogen: '',
                total_phosphorus: '',
                salinity: '',
                water_depth: '',
                ice: ''
              }
            }
          ]
        };
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
        } else {
          storeFailedForm(dictToSend);
          error = 'Please check your connection and try again.';
          this.setState({ error });
        }
      }).catch((e) => {
        console.log('err', e);
        storeFailedForm(dictToSend);
        const error = 'Please check your connection and try again.';
        this.setState({ error });
      });
    }
  };

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
        <ScrollView>
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
      </View>
    );
  }
}

const mapStateToProps = state => ({ ...markerSelector(state) });
export const AddScene = connect(mapStateToProps)(_AddScene);
