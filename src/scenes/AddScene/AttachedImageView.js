import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import BaseScene from '../BaseScene';
import { imagePicker } from '../../services';
import { styles as addStyles } from '../../styles/scenes/Add';

export class AttachedImageView extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null
    };
  }
  onChoosePicture = async () => {
    try {
      const res = await imagePicker.show();
      this.setState({ avatarSource: res.source });
    } catch (err) {
      console.log('Choose picture err', err);
    }
  };
  getImage() {
    return this.state.avatarSource;
  }
  resetImage() {
    this.setState({ avatarSource: null });
  }
  render() {
    return (
      <View style={addStyles.imageUploadContainer}>
        <View>
          <Image source={this.state.avatarSource} style={addStyles.uploadImage} />
        </View>
        <View style={addStyles.imageButtonContainer}>
          <TouchableHighlight style={addStyles.imageButton} onPress={this.onChoosePicture}>
            <Text style={addStyles.imageButtonText}>Choose Image</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
