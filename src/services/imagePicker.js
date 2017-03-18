import ImagePicker from 'react-native-image-picker';

export const imagePicker = {
  show() {
    return new Promise((resolve, reject) => {
      ImagePicker.showImagePicker({}, (response) => {
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
          result.source = { uri, isStatic: true };
        }
        return resolve(result);
      });
    });
  },
};
