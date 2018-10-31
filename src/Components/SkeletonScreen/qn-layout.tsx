import * as React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
export default function createQNLayOutSkeletonScreen(SkeletonScreen) {

  return class extends React.PureComponent {
    render() {
      let props = {
        ...this.props,
        middle: true,
        bottom: true,
        top: true
      }
      const topleft = (
        <View style={styles.topleft}>
        </View>
      );
      const topright = (
        <View style={styles.topright}>
        </View>
      );
      const middle = (
        <View style={styles.middle}>
          <View style={styles.middleItem}></View>
          <View style={styles.middleItem}></View>
          <View style={styles.middleItem}></View>
        </View>
      );
      const bottom = (
        <View style={styles.bottom}>
        {/* <View style={styles.bottomLeft}></View> */}
        {/* <View style={styles.bottomRight}></View> */}
        </View>
      )
      return (
        this.props.isReady ? this.props.children : (
          <SkeletonScreen {...props}>
            <View style={styles.wrap}>
              <View style={styles.skeletonContianer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                  {topleft}
                  {topright}
                </View>
                {bottom}
                {middle}
              </View>
            </View>
          </SkeletonScreen>
        )
      )
    }
  }
}

const styles = EStyleSheet.create({
  wrap: {
    width: '100%',
    marginTop: pxToDp(16),
    backgroundColor: '#fff'
  },
  skeletonContianer: {
    marginLeft: pxToDp(20),
    marginRight: pxToDp(20),
    paddingTop: pxToDp(42),
  },
  topleft: {
    width: pxToDp(130),
    height: pxToDp(38),
    backgroundColor: '#eee'
  },
  topright: {
    width: pxToDp(92),
    height: pxToDp(38),
    backgroundColor: '#eee'
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: pxToDp(87),
    marginTop: 10,
  },
  middleItem: {
    width: '28%',
    height: pxToDp(30),
    backgroundColor: '#eee'
  },
  bottom: {
    width: '100%',
    height: pxToDp(38),
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#eee'
  },
  bottomLeft: {
    width: pxToDp(272),
    height: '100%',
    backgroundColor: '#eee'
  },
  bottomRight: {
    width: pxToDp(120),
    height: '100%',
    marginLeft: pxToDp(160),
    backgroundColor: '#eee'
  }
})