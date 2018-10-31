import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

const common = {
  container: {
    flex: 1
  },
  horizontalPadding: {
    paddingLeft: pxToDp(31),
    paddingRight: pxToDp(31)
  }
};
export default EStyleSheet.create({
  container: common.container,
  headerRight: {
    fontWeight: '500',
    fontSize: pxToDp(28),
    color: '#333'
  },
  // navContainer
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: pxToDp(111),
    paddingHorizontal: pxToDp(33)
  },
  navItem: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center'
  },
  navTitleText: {
    marginRight: pxToDp(13),
    fontSize: pxToDp(30),
    color: '#999',
    lineHeight: pxToDp(32)
  },
  activeNavTitleText: {
    fontWeight: '500',
    color: '#333'
  },
  triangleIcon: {
    width: pxToDp(12),
    height: pxToDp(8)
  },
  // listItem
  listContainer: {
    ...common['container'],
    backgroundColor: '#f5f5f5'
  },
  projectWrapper: {
    marginTop: pxToDp(18),
    width: '100%',
    backgroundColor: '#fff'
  },
  projectHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: pxToDp(143),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#EAEAEA',
    ...common.horizontalPadding
  },
  projectHeadLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  projectHeadRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: pxToDp(153),
    height: pxToDp(54),
    backgroundColor: '#f5f5f5',
    borderRadius: pxToDp(27)
  },
  projectHeadRightStatus: {
    marginRight: pxToDp(5),
    color: '#a9a9a9',
    fontSize: pxToDp(22)
  },
  projectTrendIcon: {
    width: pxToDp(20),
    height: pxToDp(20)
  },
  projectLogo: {
    marginRight: pxToDp(25)
  },
  projectLogoIcon: {
    width: pxToDp(80),
    height: pxToDp(80),
    borderRadius: pxToDp(10),
    borderColor: '#000'
  },
  projectTop: {
    flexDirection: 'row',
    marginBottom: pxToDp(16)
  },
  projectName: {
    marginRight: pxToDp(21),
    fontSize: pxToDp(30),
    color: '#333'
  },
  projectBadgeIcon: {
    width: pxToDp(31),
    height: pxToDp(31),
    marginRight: pxToDp(9)
  },
  projectDesc: {
    fontSize: pxToDp(24),
    fontWeight: '500',
    color: '#a9a9a9'
  },
  projectDetail: {
    flexDirection: 'row',
    width: '100%',
    height: pxToDp(175),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  projectDetailItem: {},
  projectDetailItemK: {
    fontSize: pxToDp(36),
    color: '#333333'
  },
  projectDetailItemV: {
    marginTop: pxToDp(21),
    fontSize: pxToDp(20),
    color: '#A9A9A9'
  },
  projectBody: common.horizontalPadding,
  // footer
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
