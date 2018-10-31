import EStyleSheet from 'react-native-extended-stylesheet';
import {pxToDp} from "~utils"
import {PixelRatio} from "react-native"

export const styles = EStyleSheet.create({
  wrap: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#f8f8f8'
  },
  mainContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff'
  },
  noticeList: {
    marginRight: pxToDp(16),
    marginLeft: pxToDp(16)
  },
  noticeItem: {
    width: '100%'
  },
  titleDate: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(80),
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleDateText: {
    color: '#969696',
    fontSize: pxToDp(26)
  },
  noticeBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: pxToDp(272),
    borderRadius: pxToDp(16),
    backgroundColor: '#fff'
  },
  noticeItemMain: {
    flex: 1,
    paddingRight: pxToDp(36),
    paddingLeft: pxToDp(36),
  },
  noticeItemTitle: {
    width: pxToDp(532),
    flexDirection: 'row',
    alignItems: 'center',
    height: pxToDp(84),
  },
  noticeItemTitleText: {
    color: '#333',
    fontSize: pxToDp(30),
    fontWeight: 'bold',
  },
  noticeItemContent: {
    flex: 1
  },
  noticeItemContentText: {
    fontSize: pxToDp(26),
    lineHeight: pxToDp(40),
    color: '#666'
  },
  noticeItemSee: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: pxToDp(36),
    paddingLeft: pxToDp(36),
    height: pxToDp(80),
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#eaeaea'
  },
  noticeSeeText: {
    color: '#969696',
    fontSize: 13
  },
  arrowIcon: {
    width: 6,
    height: 16,
    resizeMode: 'contain'
  }
})
