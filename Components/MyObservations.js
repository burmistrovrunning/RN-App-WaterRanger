import React, {Component, PropTypes} from 'react';
import {
    ActivityIndicatorIOS,
    AppRegistry,
    Navigator,
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    AsyncStorage,
    MapView,
    ListView
} from 'react-native';

var loadDataOnRender = true;

export default class MyObservationsScene extends Component {


    _onPressButton()
    {

    }

    async tryAgain()
    {
      formsToSubmit = this.state["formsToSubmit"];

      if (formsToSubmit != null && formsToSubmit.length > 0)
      {
        formToSubmit = formsToSubmit[0];

        GLOBAL = require('../Globals');
        var url = GLOBAL.BASE_URL + formToSubmit["issues"] != null ? "issues" : "observations";
        var TOKEN = await AsyncStorage.getItem("accessToken");
        var loginDetailsJSON = await AsyncStorage.getItem("loginDetails");
        var loginDetails = JSON.parse(loginDetailsJSON);

        fetch(url, {
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
            body: JSON.stringify(formToSubmit)
        }).then(async(response) => {

            var error = false;
            if (response.status == 200 || response.status == 204) {
              this.removeFormFromForms(formToSubmit);
            } else {

            }

            console.log(response);
        }).catch((error) => {
            console.error(error);
            error = "Please check your connection and try again.";
            this.setState({"error": error});
        });
      }
      }

      removeFromArray(array, value) {
          var idx = array.indexOf(value);
          if (idx !== -1) {
              array.splice(idx, 1);
              console.log("FOUND");
          }
          else {
            console.log("NOT FOUND");
          }
          return array;
      }

      async removeFormFromForms(dictToRemove)
      {
        formsToSubmit = this.state["formsToSubmit"];
        formsToSubmit = this.removeFromArray(formsToSubmit, dictToRemove);

        var newForms = JSON.stringify(formsToSubmit);
        console.log("New forms value: " + newForms);
        await AsyncStorage.setItem(GLOBAL.FORMS_TO_SUBMIT_KEY, newForms);
        this.loadData();
      }

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            'dataSource': ds.cloneWithRows([]),
            'formsToSubmit':[]
        };
        this.loadData();
      }

      componentDidMount()
      {
        this.loadData();
      }

    async loadData()
    {
        GLOBAL = require('../Globals');
        var formsToSubmitString = await AsyncStorage.getItem(GLOBAL.FORMS_TO_SUBMIT_KEY);
        var formsToSubmit = [];
        if (formsToSubmitString != null) {
          console.log("HERE:" + formsToSubmitString);
            formsToSubmit = JSON.parse(formsToSubmitString)
        }

        console.log("HERE234")
        this.setState({
            'dataSource': this.state.dataSource.cloneWithRows(formsToSubmit),
            'formsToSubmit':formsToSubmit
        });
    }

    render() {
      /*
        if (loadDataOnRender)
        {
          this.loadData();
          loadDataOnRender = false;
        }
        loadDataOnRender = true;
        */
        return (
            <View>
              <Text>My Observations</Text>
                <Text>Awaiting Internet Connection</Text>
                  <TouchableHighlight style={styles.button} onPress={this.tryAgain.bind(this)} underlayColor='#99d9f4'>
                      <Text style={styles.buttonText}>Try uploading again</Text>
                  </TouchableHighlight>
                  <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <Text>{JSON.stringify(rowData)}</Text>}/>
            </View>
        );
    }
}

var styles = require('../Styles/Styles');
