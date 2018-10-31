import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

const common = {
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContentWrapper: {
    flexDirection: 'column',
    justifyContent: 'center'
  }
};

export default EStyleSheet.create({
  // 局部变量
  $white: '#fff',
  $gray: 'rgb(153,153,153)',
  $bold: 'rgb(51,51,51)',
  //
  commonFR: {
    flexDirection: 'row'
  },
  container: {
    // flex: 1
  },
  // entrys
  entrysWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  entrysItemContainer: {
    ...common.itemWrapper,
    width: pxToDp(353),
    height: pxToDp(165),
    backgroundColor: '#fff',
    borderRadius: pxToDp(10),
    marginTop: pxToDp(16),
    marginBottom: pxToDp(20)
  },
  entrysImageWrapper: {
    width: pxToDp(150),
    height: pxToDp(120),
    marginTop: pxToDp(18),
    marginRight: pxToDp(10)
  },
  entrysItemContentWrapper: common.itemContentWrapper,
  entrysItemContentTitle: {
    fontSize: pxToDp(30),
    fontWeight: 'bold',
    color: '$bold',
    marginBottom: pxToDp(10)
  },
  entrysItemContentDesc: {
    fontSize: pxToDp(22),
    fontWeight: '500',
    color: '$gray'
  },
  // list
  listWrapper: {
    paddingHorizontal: pxToDp(30),
    paddingTop: pxToDp(36),
    paddingBottom: pxToDp(44),
    backgroundColor: '$white'
  },
  listTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  likeWrapper: {
    paddingLeft: pxToDp(20),
    height: pxToDp(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  likeDesc: {
    color: 'rgb(153,153,153)',
    fontWeight: '500',
    fontSize: pxToDp(24),
    marginRight: pxToDp(21)
  },
  arrowRightImage: {
    width: pxToDp(11),
    height: pxToDp(19)
  },
  listTitle: {
    fontSize: pxToDp(30),
    fontWeight: 'bold',
    color: 'rgb(102,102,102)',
    marginBottom: pxToDp(43)
  },
  listItemContainer: {
    ...common.itemWrapper,
    justifyContent: 'flex-start',
    paddingBottom: pxToDp(29),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#E8E6E6'
  },
  listItemImageContainer: {
    width: pxToDp(165),
    height: pxToDp(120),
    marginRight: pxToDp(33)
  },
  listItemContentWrapper: common.itemContentWrapper,
  listItemTitle: {
    fontSize: pxToDp(28),
    fontWeight: 'bold',
    color: '$bold',
    marginBottom: pxToDp(32)
  },
  listItemDesc: {
    fontSize: pxToDp(26),
    fontWeight: '500',
    color: '$gray'
  },
  // more
  moreWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pxToDp(30)
    // marginBottom: pxToDp(33)
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
  advertBox: {
    width: pxToDp(81),
    height: pxToDp(35),
    lineHeight: pxToDp(35),
    color: '#666',
    fontSize: pxToDp(25),
    textAlign: 'center',
    borderWidth: pxToDp(1),
    borderColor: '#959595',
    borderRadius: pxToDp(3)
  },
  // banner图
  bannerBox: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bannerImageBox: {
    width: '95%'
  },
  bannerImage: {
    width: '100%',
    height: pxToDp(250)
  }
});
