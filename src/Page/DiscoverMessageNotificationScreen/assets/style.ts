import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

export default EStyleSheet.create({
  // 局部变量
  $white: '#fff',
  //
  wrapper: {
    flex: 1
  },
  contentWrapper: {
    flex: 1,
    marginTop: pxToDp(16)
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
  },
  // comment
  commentItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pxToDp(32),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(40),
    backgroundColor: '$white',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: 'rgb(234,234,234)'
  },
  commentItemLeft: {
    flexDirection: 'row'
  },
  commentItemImage: {
    marginRight: pxToDp(32)
  },
  headPicture: {
    width: pxToDp(94),
    height: pxToDp(94),
    borderRadius: pxToDp(60),
    resizeMode: 'cover'
  },
  commentItemMiddle: {
    flexDirection: 'column'
  },
  commentItemMiddleTitle: {
    color: 'rgb(56,66,105)',
    fontSize: pxToDp(30),
    marginBottom: pxToDp(20)
  },
  commentItemMiddleContent: {
    color: 'rgb(51,51,51)',
    fontSize: pxToDp(26),
    fontWeight: '500',
    marginBottom: pxToDp(23)
  },
  commentItemMiddleTime: {
    color: 'rgb(153,153,153)',
    fontSize: pxToDp(26),
    fontWeight: '500'
  },
  commentItemRight: {
    width: pxToDp(130),
    height: pxToDp(130),
    borderRadius: pxToDp(10)
  },
  commentItemRightContent: {
    fontSize: pxToDp(26),
    color: 'rgb(153,153,153)',
    fontWeight: '500'
  },
  likeIcon: {
    width: pxToDp(26),
    height: pxToDp(26),
    marginBottom: pxToDp(23)
  }
});
