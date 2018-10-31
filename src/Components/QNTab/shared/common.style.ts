import { pxToDp } from '~utils';
const activeDefaultTextStyle = { color: '#333', fontSize: pxToDp(42) };
const textDefaultStyle = { color: '#999', fontSize: pxToDp(30) };
const tabUnderlineDefaultStyle = {
  position: 'absolute',
  bottom: 0,
  width: pxToDp(44),
  height: pxToDp(6),
  alignSelf: 'center'
};
const tabBarDefaultStyle = {
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#fff'
};
export {
  textDefaultStyle,
  activeDefaultTextStyle,
  tabUnderlineDefaultStyle,
  tabBarDefaultStyle
};
