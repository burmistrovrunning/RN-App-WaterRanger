import React, {Component, PropTypes} from 'react';
import {
    Image,
    ActivityIndicatorIOS,
    AppRegistry,
    Navigator,
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    AsyncStorage,
    MapView,
    ScrollView
} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');

var imagePickerOptions = {
    title: 'Choose Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

var WildlifeType = t.enums({
    Mammal: 'Mammal',
    Reptile: 'Reptile',
    Amphibian: 'Amphibian',
    Fish: 'Fish',
    Plant: 'Plant',
    Insect: 'Insect',
    Bird: 'Bird',
    Species: 'Species at risk'
});

var InvasiveSpeciesType = t.enums({
    Phragmites: 'Phragmites',
    Loosestrife: 'Loosestrife',
    "Dog-Strangling Vine": 'Dog-Strangling Vine',
    "Introduced Honeysuckle": 'Introduced Honeysuckle',
    "Zebra Mussels": 'Zebra Mussels',
    "Other Invasive": 'Other Invasive',
    "Eurasian Milfoil": 'Eurasian Milfoil',
    Goldfish: 'Goldfish'
});

var AddObservationForm = t.struct({
    bodyOfWater: t.String,
    locationName: t.String,
    locationDescription: t.String,
    wildlife: t.list(WildlifeType),
    invasiveSpecies: t.list(InvasiveSpeciesType),
    waterQualityPh: t.Number,
    waterQualityWaterTemp: t.Number,
    waterQualityAirTemp: t.Number,
    waterQualityDissolvedOxygen: t.Number,
    waterQualityEColi: t.Number,
    waterQualityConductivity: t.Number,
    waterQualityAlkalinity: t.Number,
    waterQualityHardness: t.Number,
    waterQualityTurbidity: t.Number,
    waterQualityKjeldahlNitrogen: t.Number,
    waterQualityPhosphorus: t.Number,
    waterQualitySalinity: t.Number,
    waterQualityPhosphates: t.Number,
    waterQualitySecchiDepth: t.Number,
    waterQualityNitrites: t.Number,
    waterQualityNitrates: t.Number,
    iceWatch: t.Boolean,
    notes: t.String
});

var AddIssueForm = t.struct({
    bodyOfWater: t.String,
    locationName: t.String,
    locationDescription: t.String,
    category: t.String,
    date: t.Date,
    description: t.String,
    weather: t.String,
    seenBefore: t.String,
    notifiedAgencies: t.String,
    contactEmail: t.String,
    contactPhone: t.String
});

var options = {
    fields: {
        wildlife: {
            factory: t.form.select
        }
    }
};

export default class AddObservationScene extends Component {
    constructor(props) {
        super(props);
        console.log("IN CONSTRUCTOR" + props);
        this.state = {
            'form': 'observation',
            'marker': props.marker
        };
    }

    onChooseObservation()
    {
        this.setState({'form': 'observation'});
        console.log("Chosen observation");
    }

    onChooseIssue()
    {
        this.setState({'form': 'issue'});
    }

    render() {
        console.log(this.props);

        options = {
            fields: {
                wildlife: {
                    factory: t.form.select
                }
            }
        };

        var defaultValue = {};

        if (this.props.marker.key != '-1') {
            options["fields"]["bodyOfWater"] = {
                "hidden": true
            };
            options["fields"]["locationName"] = {
                "hidden": true
            };
            options["fields"]["locationDescription"] = {
                "hidden": true
            };

            defaultValue = {
                bodyOfWater: "ignore",
                locationName: "ignore",
                locationDescription: "ignore"
            };
        }
        console.log(options);

        var formComponent = this.state.form == 'issue'
            ? (<Form ref="form" type={AddIssueForm} value={defaultValue} options={options}/>)
            : (<Form ref="form" type={AddObservationForm} value={defaultValue} options={options}/>);

        return (
            <View style={styles.container}>
                <Text>Latitude {this.props.marker.latitude}</Text>
                <Text>Longitude {this.props.marker.longitude}</Text>
                <TouchableHighlight onPress={this.onChooseObservation.bind(this)}>
                    <Text>Observation</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onChooseIssue.bind(this)}>
                    <Text>Issue</Text>
                </TouchableHighlight>
                <ScrollView>
                    <View style={styles.scroll_container}>
                        {formComponent}

                        <TouchableHighlight style={styles.button} onPress={this.choosePicture.bind(this)} underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Choose Image</Text>
                        </TouchableHighlight>
                        <Image source={this.state.avatarSource} style={styles.uploadImage}/>
                        <TouchableHighlight style={styles.button} onPress={this.submit.bind(this)} underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableHighlight>

                    </View>
                </ScrollView>

            </View>
        );
    }

    choosePicture()
    {
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
                const source = {
                    uri: 'data:image/jpeg;base64,' + response.data,
                    isStatic: true
                };

                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = {
                        uri: response.uri.replace('file://', ''),
                        isStatic: true
                    };
                } else {
                    const source = {
                        uri: response.uri,
                        isStatic: true
                    };
                }

                var newState = this.state;
                newState['avatarSource'] = source;

                this.setState(newState);
            }
        });
    }

    takePicture() {
        this.camera.capture().then((data) => console.log(data)).catch(err => console.error(err));
    }

    async submit()
    {

        var value = this.refs.form.getValue();
        console.log("Here");
        if (!value)
            return;
        console.log("Here2");

        GLOBAL = require('../Globals');

        var url = GLOBAL.BASE_URL + "observations";
        var dictToSend = {};
        var dateString = new Date().toJSON();

        if (this.state.form == 'issue') {
            url = GLOBAL.BASE_URL + "issues";
            dictToSend = {
                "issues": [
                    {
                        "observed_on": dateString,
                        "group_tokens": "",
                        "category": "",
                        "notes": {
                            "details": "",
                            "weather": "",
                            "seen_before": "",
                            "notified_agencies": "no"
                        },
                        "contact_info": {
                            "email": value.contactEmail,
                            "phone": value.contactPhone
                        }
                    }
                ]
            };

        } else {
            url = GLOBAL.BASE_URL + "observations";
            dictToSend = {
                "observations": [
                    {
                        "observed_on": "2016-08-05:08:40:00",
                        "notes": "notes about description",
                        "group_tokens": "3",
                        "data": {
                            "wildlife": [""],
                            "invasive_species": [""],
                            "ph": "",
                            "water_temperature": "",
                            "air_temperature": "",
                            "oxygen": "",
                            "ecoli": "",
                            "conductivity": "",
                            "alkalinity": "",
                            "hardness": "",
                            "turbidity": "",
                            "total_kjeldahl_nitrogen": "",
                            "total_phosphorus": "",
                            "salinity": "",
                            "water_depth": "",
                            "ice": ""
                        }
                    }
                ]
            };
        }

        var dictKey = (this.state.form == 'issue')
            ? "issues"
            : "observations";
        if (this.props.marker.key != '-1') {
            dictToSend[dictKey][0]["location_id"] = this.props.marker.key;
        } else {
            dictToSend[dictKey][0]["location_attributes"] = {
                "lat": this.props.marker.latitude,
                "lng": this.props.marker.longitude,
                "body_of_water": value.bodyOfWater,
                "body_of_water": value.locationName,
                "body_of_water": value.locationDescription
            };
        }

        console.log(dictToSend);

        var TOKEN = await AsyncStorage.getItem("accessToken");
        var loginDetailsJSON = await AsyncStorage.getItem("loginDetails");
        var loginDetails = JSON.parse(loginDetailsJSON);

        var formsToSubmit = await AsyncStorage.getItem("formsToSubmit");
        if (formsToSubmit == null) {
            formsToSubmit = [];
        }
        formsToSubmit.concat(dictToSend);

        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Token': loginDetails["access-token"],
                'Client': loginDetails["client"],
                'Expiry': loginDetails["expiry"],
                'Token-Type': loginDetails["token-type"],
                'UID': loginDetails["uid"]
            },
            body: JSON.stringify(dictToSend)
        }).then(async(response) => {

            var error = false;
            if (response.status == 200) {
                if (accessToken != null) {}
            } else {}

            console.log(response);
        }).catch((error) => {
            console.error(error);
            error = "Please check your connection and try again.";
            this.setState({"error": error});
        });
    }
}

var styles = require('../Styles/Styles');
