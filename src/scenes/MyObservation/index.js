import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  ListView
} from 'react-native';
import { uploadForm, removeFailedForm, getFailedForms } from '../../services';
import { styles } from '../../styles/common';

export class MyObservationScene extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      formsToSubmit: []
    };
    // this.loadData();
  }

  componentDidMount() {
    // this.loadData();
  }

  // attempt to upload the first cached form in the list
  onTryAgain = async () => {
    const { formsToSubmit } = this.state;
    if (formsToSubmit && formsToSubmit.length > 0) {
      const formToSubmit = formsToSubmit[0];
      uploadForm(formToSubmit).then(async (response) => {
        if (response.status === 200 || response.status === 204) {
          console.log('Finished uploading', response);
          this.removeForm(formToSubmit);
        } else {
          console.log('Finished uploading with failure', response);
        }
      }).catch((err) => {
        console.log('err on uploadForm', err);
        this.setState({ error: 'Please check your connection and try again.' });
      });
    }
  };

  async loadData() {
    const formsToSubmit = await getFailedForms();
    console.log('loadData', formsToSubmit);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(formsToSubmit),
      formsToSubmit
    });
  }
  // remove a form once we have successfully re-uploaded it
  async removeForm(dictToRemove) {
    await removeFailedForm(dictToRemove);
    this.loadData();
  }

  render() {
    return (
      <View>
        <Text>My Observations</Text>
        <Text>Awaiting Internet Connection</Text>
        <TouchableHighlight style={styles.button} onPress={this.onTryAgain} underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Try uploading again</Text>
        </TouchableHighlight>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={rowData => <Text>{JSON.stringify(rowData)}</Text>}
        />
      </View>
    );
  }
}
