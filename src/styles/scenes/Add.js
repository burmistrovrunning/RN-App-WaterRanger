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
  },
  addSceneContainer: {
    backgroundColor: '$colorWhite',
    flex: 1,
    justifyContent: 'center',
  },
  addScrollContainer: {
    flex: 1,
    padding: 10
  },
  addSceneTabBarContainer: {
    backgroundColor: '$colorLightGrey',
    borderBottomColor: '$lineColor',
    borderBottomWidth: 1,
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  addSceneTabBarButton: {
    backgroundColor: '$colorMidGrey',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    margin: 5,
    padding: 5
  },
  addSceneTabBarButtonActive: {
    backgroundColor: '$colorBrightBlue'
  },
  addSceneTabBarText: {
    color: '$colorDarkGrey',
    textAlign: 'center'
  },
  addSceneTabBarTextActive: {
    color: '$colorWhite'
  },
  addSceneLatLngContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addSceneLatLngBlock: {
    flex: 1,
    marginBottom: 15
  },
  addSceneSmallTitle: {
    color: '$colorMidGrey',
    fontSize: 12
  },
  // Offline page
  offlineFormsHeader: {
    marginBottom: 0,
    padding: 10
  },
  offlineFormsContainer: {
    borderTopColor: '$lineColor',
    borderTopWidth: 1,
    flex: 1
  },
  offlineFormsFooter: {
    borderTopColor: '$lineColor',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10
  },
  offlineListRowContainer: {
    padding: 10
  },
  offlineListTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  offlineListDate: {
    color: '$colorMidGrey',
    fontSize: 12
  },
  listSeparator: {
    backgroundColor: '$lineColor',
    height: 1
  }
});

