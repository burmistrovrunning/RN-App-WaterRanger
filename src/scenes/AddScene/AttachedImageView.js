import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import BaseScene from '../BaseScene';
import { imagePicker } from '../../services';
import { styles as addStyles } from '../../styles/scenes/Add';


export class AttachedImageView extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: [require('../../images/camera-placeholder.jpg')]
    };
    this.isPlaceholder = true;
  }
  onChoosePicture = async () => {
    try {
      const res = await imagePicker.show();
      if (res.source) {
        if (this.isPlaceholder) {
          this.setState({ avatarSource: [res.source] });
          this.isPlaceholder = false;
        } else {
          const avatarSource = this.state.avatarSource.concat(res.source);
          this.setState({ avatarSource });
        }
      }
    } catch (err) {
      console.log('Choose picture err', err);
    }
  };
  getImage() {
    return this.state.avatarSource;
  }
  resetImage() {
    this.setState({ avatarSource: [require('../../images/camera-placeholder.jpg')] });
    this.isPlaceholder = true;
  }
  render() {
    let key = 0;
    return (
      <View style={[addStyles.formFieldset, addStyles.formImageUploadContainer]}>
        <View>
          {this.state.avatarSource.map((item) => {
            key += 1;
            return (
              <ResponsiveImage
                key={key}
                source={item}
                initWidth="150"
                initHeight="150"
                style={addStyles.formImageUploadPlaceHolder}
              />
            );
          })}
        </View>
        <View style={addStyles.formImageUploadButtonContainer}>
          <TouchableHighlight
            style={addStyles.formImageUploadButton}
            onPress={this.onChoosePicture}
            underlayColor="#edede5"
          >
            <Text style={addStyles.formImageUploadButtonText}>Choose Image</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
