import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

export const imagePicker = {
  show() {
    return new Promise((resolve, reject) => {
      ImagePicker.showImagePicker({}, async (response) => {
        const result = {
          source: null,
          type: null,
          message: '',
        };
        if (response.didCancel) {
          result.type = 'UserCancel';
          result.message = 'User cancelled image picker';
        } else if (response.error) {
          return reject({
            type: 'Error',
            message: response.error,
          });
        } else {
          const uri = response.uri.replace('', '');
          console.log('uri', uri);
          const newUri = await ImageResizer.createResizedImage(uri, 1024, 1024, 'JPEG', 80);
          console.log('newUri', newUri);
          result.source = { uri: newUri, isStatic: true };
        }
        return resolve(result);
      });
    });
  },
};
