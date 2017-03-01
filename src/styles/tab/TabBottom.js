import EStyleSheet from 'react-native-extended-stylesheet';
import '../GlobalStyles';

export const styles = EStyleSheet.create({
  container: {
    height: 50,
    paddingVertical: 3,
    alignSelf: 'stretch',
    backgroundColor: '#F4F4F4',
    flexDirection: 'row'
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  tabLabel: {
    color: '#1c3653',
    fontSize: 12,
  },
  tabIcon: {
    color: '#4A729F',
    fontSize: 25,
    height: 25,
    marginTop: 0
  },
});
