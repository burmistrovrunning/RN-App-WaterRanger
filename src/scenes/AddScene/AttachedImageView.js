import React from 'react';
import {
  TouchableHighlight,
  View,
} from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import BaseScene from '../BaseScene';
import { imagePicker } from '../../services';
import { styles as addStyles } from '../../styles/scenes/Add';

const Icon = createIconSetFromFontello(fontelloConfig, 'water-rangers-icons');

export class AttachedImageView extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: []
    };
    this.isPlaceholder = true;
  }
  onChoosePicture = () => {
    setTimeout(async () => {
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
    }, 100);
  }
  getImage() {
    return this.state.avatarSource;
  }
  resetImage() {
    this.setState({ avatarSource: [] });
    this.isPlaceholder = true;
  }
  removeImage(index) {
    const avatarSource = this.state.avatarSource;
    avatarSource.splice(index, 1);
    if (avatarSource.length > 0) {
      this.setState({ avatarSource: [...avatarSource] });
    } else {
      this.resetImage();
    }
  }
  render() {
    let key = 0;
    return (
      <View style={addStyles.formImageUploadContainer}>
        {this.state.avatarSource.map((item, index) => {
          key += 1;
          return (
            <View
              key={key}
              style={addStyles.formImageUploadBlock}
            >
              <ResponsiveImage
                key={key}
                source={item}
                initWidth="165"
                initHeight="165"
                style={addStyles.formImageUploadPlaceHolder}
              />
              <TouchableHighlight
                style={addStyles.formImageUploadRemove}
                underlayColor="#edede5"
                onPress={() => this.removeImage(index)}
              >
                <Icon
                  name="close"
                  style={addStyles.formImageUploadRemoveIcon}
                />
              </TouchableHighlight>
            </View>
          );
        })}
        <TouchableHighlight
          style={addStyles.formImageUploadBlock}
          onPress={this.onChoosePicture}
          underlayColor="#edede5"
        >
          <ResponsiveImage
            source={require('../../images/camera-placeholder.jpg')}
            initWidth="165"
            initHeight="165"
            style={addStyles.formImageUploadPlaceHolder}
          />
        </TouchableHighlight>
      </View>
    );
  }
}
