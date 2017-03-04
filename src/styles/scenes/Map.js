import EStyleSheet from 'react-native-extended-stylesheet';
import '../GlobalStyles';

export const styles = EStyleSheet.create({
  map: {
    flex: 1,
    margin: 0,
    borderWidth: 0,
    flexDirection: 'column'
  },
  removeContainer: {
    position: 'absolute',
    backgroundColor: '#EEE',
    borderRadius: 5,
    padding: 8,
    top: 10,
    right: 10,
  }
});

