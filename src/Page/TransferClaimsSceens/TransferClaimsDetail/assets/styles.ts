// import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default EStyleSheet.create({
  container: { flex: 1, backgroundColor: 'red' },
  // header
  headerItemContainer: {
    flexDirection: 'row',
    paddingLeft: pxToDp(33),
    paddingRight: pxToDp(34),
    alignItems: 'center'
  },
  headerItemTitle: {
    fontSize: pxToDp(38),
    fontWeight: 'bold',
    color: '#fff'
  },
  headerContainer: {
    // paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingTop: 0,
    paddingBottom: pxToDp(40),
    height: pxToDp(173),
    backgroundColor: '#384269'
  },
  // scroll
  scrollBaseBackground: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollWrapper: {
    marginLeft: pxToDp(16),
    marginRight: pxToDp(14),
    marginTop: -pxToDp(49)
  },
  scrollExtraBlock: {
    width: '100%',
    opacity: 0
  }
});
