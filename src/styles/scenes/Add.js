import EStyleSheet from 'react-native-extended-stylesheet';
import '../GlobalStyles';

export const styles = EStyleSheet.create({
  uploadImage: {
    width: 100,
    height: 100,
  },
  waitingContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

