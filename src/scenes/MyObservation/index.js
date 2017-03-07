import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  ListView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { getFailedForms, uploadFailedForms } from '../../services';
import { styles } from '../../styles/common';
import { styles as addStyles } from '../../styles/scenes/Add';

export class MyObservationScene extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows([]);
    this.state = {
      formsToSubmit: [],
      isSubmitting: false
    };
    // this.loadData();
  }

  componentDidMount() {
    this.loadData();
  }

  // attempt to upload the first cached form in the list
  onTryAgain = async () => {
    const { formsToSubmit } = this.state;
    this.setState({ isSubmitting: true });
    const success = await uploadFailedForms(formsToSubmit);
    if (!success) {
      Alert.alert('Information', 'Please check out your network connection',
        [{ text: 'Okay' }], { cancelable: true }
      );
    }
    this.setState({ isSubmitting: false });
    await this.loadData();
  };

  async loadData() {
    const formsToSubmit = await getFailedForms();
    this.setState({
      formsToSubmit
    });
  }
  // remove a form once we have successfully re-uploaded it
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
    const dataSource = this.dataSource.cloneWithRows(this.state.formsToSubmit);
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Text>My Observations</Text>
        <Text>Awaiting Internet Connection</Text>
        <TouchableHighlight style={styles.button} onPress={this.onTryAgain} underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Try uploading again</Text>
        </TouchableHighlight>
        <ListView
          style={{ flex: 1 }}
          enableEmptySections={true}
          removeClippedSubviews={false}
          dataSource={dataSource}
          renderRow={rowData => <Text>{JSON.stringify(rowData)}</Text>}
        />
        {this.renderWaiting()}
      </View>
    );
  }
}
