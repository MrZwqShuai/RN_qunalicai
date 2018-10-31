import { pxToDp } from '~utils';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

const styles = EStyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f8f8'
  },
  newsList: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerStyle: {
    flex: 1
  },
  backgroundFFF: {
    backgroundColor: '#fff'
  },
  paddingBottom20: {
    paddingBottom: 20
  },
  contentStyle: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hotComments: {},
  recentComments: {},
  commentTitle: {
    justifyContent: 'center',
    height: pxToDp(98),
    paddingLeft: pxToDp(32)
  },
  titleText: {
    fontSize: pxToDp(30),
    fontWeight: 'bold',
    color: '#333'
  },
  bgWhite: {
    backgroundColor: '#fff'
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: pxToDp(46),
    paddingLeft: pxToDp(32),
    paddingRight: pxToDp(13)
  },
  avatar: {
    marginRight: pxToDp(20)
  },
  avatarImg: {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: 30,
    resizeMode: 'contain'
  },
  commentContainer: {
    flex: 1
  },
  commentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  commentBaseInfo: {},
  nickName: {
    color: '#333',
    fontSize: pxToDp(26)
  },
  commentTime: {
    fontSize: pxToDp(22),
    color: '#93959e'
  },
  commentZan: {
    flexDirection: 'row'
  },
  zanIcon: {
    width: pxToDp(30),
    height: pxToDp(30),
    resizeMode: 'contain'
  },
  zanText: {
    fontSize: pxToDp(24),
    color: '#999',
    marginRight: 4,
    marginLeft: 3
  },
  commentContent: {
    marginTop: pxToDp(15)
  },
  commentContentText: {
    color: '#333',
    fontSize: pxToDp(28),
    lineHeight: pxToDp(36)
  },
  commentReply: {
    lineHeight: pxToDp(36),
    marginTop: 12,
    flexDirection: 'row'
  },
  replayContent: {
    flex: 1
  },
  commentReplier: {
    color: '#1c5e80',
    fontSize: 14
  },
  commentMore: {
    marginTop: 12,
    flexDirection: 'row'
  },
  commentArrow: {
    width: pxToDp(24),
    height: pxToDp(40),
    resizeMode: 'contain'
  },
  ml10: {
    marginLeft: pxToDp(10)
  },
  mr10: {
    marginRight: pxToDp(10)
  },
  fs14: {
    fontSize: pxToDp(28)
  },
  colorGray93: {
    color: '#93959e'
  },
  color333: {
    color: '#333'
  },
  colorC5: {
    color: '#c5c7d0'
  },
  commentLine: {
    marginTop: pxToDp(28),
    height: 1,
    backgroundColor: '#eaeaea'
  },
  bottomTools: {
    bottom: 0
  },
  bottomInput: {
    padding: pxToDp(10),
    paddingBottom: pxToDp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  replyInfo: {
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  textInput: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#333',
    minHeight: pxToDp(60),
    paddingBottom: pxToDp(10),
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#eaeaea'
  },
  textInputAndroid: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#333',
    minHeight: pxToDp(60),
    paddingTop: pxToDp(4),
    paddingBottom: pxToDp(4),
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#eaeaea'
  },
  buttonStyle: {
    height: pxToDp(60)
  },
  buttonText: {
    lineHeight: Platform.OS === 'ios' ? pxToDp(36) : pxToDp(60)
  },
  sendBtn: {
    height: pxToDp(60)
  },
  sendBtnText: {
    lineHeight: Platform.OS === 'ios' ? pxToDp(36) : pxToDp(60)
  }
});

export default styles;
