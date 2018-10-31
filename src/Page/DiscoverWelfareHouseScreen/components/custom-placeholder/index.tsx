import * as React from 'react';
import { Text, View } from 'react-native';
import Placeholder from 'rn-placeholder';
import EStylesheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';
const customPlaceholder = props => {
  let PlaceholderContent = [];
  for (var i = 0; i < props.lineNumber; i++) {
    PlaceholderContent.push(
      <View style={styles.wrap} key={i}>
        <View style={styles.welfareIcon} />
        <View style={styles.welfareContainer}>
          <View style={styles.welfareDetail}>
            <Text style={styles.title} />
            <Text style={styles.reward} />
          </View>
          <View style={styles.btnContainer} />
        </View>
      </View>
    );
  }
  return <View style={styles.listItemContainer}>{PlaceholderContent}</View>;
};

const styles = EStylesheet.create({
  $bg: '#eee',
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: pxToDp(32),
    paddingTop: pxToDp(43)
  },
  welfareIcon: {
    width: pxToDp(72),
    height: pxToDp(72),
    borderRadius: pxToDp(36),
    backgroundColor: '$bg',
    marginRight: pxToDp(35)
  },
  welfareContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E8E6E6',
    paddingBottom: pxToDp(40),
    borderBottomWidth: pxToDp(1)
  },
  welfareDetail: {
    width: pxToDp(378)
  },
  title: {
    width: pxToDp(100),
    height: pxToDp(34),
    backgroundColor: '$bg',
    marginBottom: pxToDp(8)
  },
  reward: {
    width: pxToDp(200),
    height: pxToDp(50),
    backgroundColor: '$bg'
  },
  btnContainer: {
    width: pxToDp(136),
    height: pxToDp(56),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$bg',
    borderRadius: pxToDp(28)
  }
});
export default Placeholder.connect(customPlaceholder);
