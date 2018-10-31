import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default EStyleSheet.create({
  $red: '#FF4B17',
  $gray: '#999',
  $yellow: '#FFAD2C',
  //
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  //
  listWrapper: {
    flex: 1,
    marginHorizontal: pxToDp(6),
    marginTop: pxToDp(9)
  },
  listItemBox: {
    width: '100%',
    height: pxToDp(231),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: pxToDp(8),
    backgroundColor: '#fff'
  },
  listItemLeftBox: {
    alignItems: 'center'
  },
  listItemLT: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: pxToDp(35)
  },
  listItemLTU: {
    color: '$red',
    fontSize: pxToDp(43),
    fontWeight: 'bold'
    // marginLeft: pxToDp(18)
  },
  listItemLTT: {
    color: '$red',
    fontSize: pxToDp(51),
    fontWeight: 'bold'
  },
  listItemBT: {
    color: '$gray',
    fontSize: pxToDp(26),
    fontWeight: '500'
  },
  listItemMiddleBox: {
    width: pxToDp(337),
    marginLeft: pxToDp(56),
    marginRight: pxToDp(36)
  },
  listItemMiddleTT: {
    color: '#333',
    fontSize: pxToDp(32),
    fontWeight: 'bold',
    marginBottom: pxToDp(23)
  },
  listItemMiddleMT: {
    // width: '80%',
    lineHeight: pxToDp(35),
    color: '$gray',
    fontWeight: '500',
    fontSize: pxToDp(26),
    marginBottom: pxToDp(23)
  },
  listItemMiddleBT: {
    color: '$gray',
    fontWeight: '500',
    fontSize: pxToDp(26)
  },
  listItemRightText: {
    width: pxToDp(126),
    height: pxToDp(65),
    lineHeight: pxToDp(65),
    textAlign: 'center',
    fontSize: pxToDp(28),
    color: '$yellow',
    borderRadius: pxToDp(33),
    borderWidth: pxToDp(1),
    borderColor: '$yellow'
  },
  // more
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
  }
});
