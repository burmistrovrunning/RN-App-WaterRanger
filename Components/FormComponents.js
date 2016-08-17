import React, { Component, PropTypes } from 'react';
import {ActivityIndicatorIOS, AppRegistry, Navigator, Text, TouchableHighlight, View, StyleSheet, AsyncStorage, MapView } from 'react-native';
// import MapView from 'react-native-maps';
var t = require('tcomb-form-native');
var Form = t.form.Form;

var WildlifeType = t.enums({
  Mammal: 'Mammal',
  Reptile: 'Reptile',
  Amphibian: 'Amphibian',
  Fish: 'Fish',
  Plant: 'Plant',
  Insect: 'Insect',
  Bird: 'Bird',
  Species: 'Species at risk',
});

var InvasiveSpeciesType = t.enums({
  Phragmites: 'Phragmites',
  Loosestrife: 'Loosestrife',
  "Dog-Strangling Vine": 'Dog-Strangling Vine',
  "Introduced Honeysuckle": 'Introduced Honeysuckle',
  "Zebra Mussels": 'Zebra Mussels',
  "Other Invasive": 'Other Invasive',
  "Eurasian Milfoil": 'Eurasian Milfoil',
  Goldfish: 'Goldfish',
});

var AddObservationForm = t.struct({
  wildlife:t.list(WildlifeType),
  invasiveSpecies:t.list(InvasiveSpeciesType),
  waterQualityPh:t.Number,
  waterQualityWaterTemp:t.Number,
  waterQualityAirTemp:t.Number,
  waterQualityDissolvedOxygen:t.Number,
  waterQualityEColi:t.Number,
  waterQualityConductivity:t.Number,
  waterQualityAlkalinity:t.Number,
  waterQualityHardness:t.Number,
  waterQualityTurbidity:t.Number,
  waterQualityKjeldahlNitrogen:t.Number,
  waterQualityPhosphorus:t.Number,
  waterQualitySalinity:t.Number,
  waterQualityPhosphates:t.Number,
  waterQualitySecchiDepth:t.Number,
  waterQualityNitrites:t.Number,
  waterQualityNitrates:t.Number,
  iceWatch:t.Boolean,
  notes:t.String,
});

var AddIssueForm = t.struct({
  category:t.String,
  date:t.Date,
  description: t.String,
  weather:t.String,
  seenBefore:t.String,
  notifiedAgencies:t.String,
  contactEmail:t.String,
  contactPhone:t.String,
});

var options = {
  fields: {
    wildlife:{
      factory: t.form.select // <-- not t.form.select
    }
  }
};


export default class AddObservationScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'form':'issue',
    };
  }

  onChooseObservation()
  {
    this.setState({'form':'observation'});
    console.log("Chosen observation");
  }

  onChooseIssue()
  {
    this.setState({'form':'issue'});
  }

  render() {
    var formComponent = this.state.form == 'issue' ? (<Form
          ref="form"
          type={AddIssueForm}
          options={options}
        />) : (<Form
              ref="form"
              type={AddObservationForm}
              options={options}
            />);

            return (<View style={styles.container}>
              <TouchableHighlight onPress={this.onChooseObservation.bind(this)}>
                <Text>Observation</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.onChooseIssue.bind(this)}>
              <Text>Issue</Text>
          </TouchableHighlight>

              {formComponent}
              </View>);
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
