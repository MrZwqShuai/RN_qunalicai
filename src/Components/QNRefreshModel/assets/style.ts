import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default EStyleSheet.create({
  wrap: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    paddingTop: pxToDp(300),
    // justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    height: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  imageBox: {
    width: 20,
    height: 20
  },
  refreshText: {
    marginLeft: pxToDp(20),
    color: '#666'
  },
  //
  moreWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pxToDp(42)
  },
  moreLine: {
    width: pxToDp(56),
    height: pxToDp(1),
    backgroundColor: 'rgb(191,187,187)'
  },
  moreText: {
    fontSize: pxToDp(24),
    color: 'rgb(191,187,187)',
    marginHorizontal: pxToDp(20)
  },
  //
  emptyImageBox: {
    width: pxToDp(500),
    height: pxToDp(300)
  },
  loadingText: {
    textAlign: 'center',
    fontSize: pxToDp(26),
    color: '#f5f5f5'
  },
  //
  footerBox: {
    marginBottom: pxToDp(40)
  }
});
