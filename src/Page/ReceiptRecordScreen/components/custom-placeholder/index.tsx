import * as React from 'react';
import { Text, View } from 'react-native';
import Placeholder from 'rn-placeholder';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp } from '~utils';

const customPlaceholder = props => {
  let PlaceholderContent = [];
  for (var i = 0; i < props.lineNumber; i++) {
    PlaceholderContent.push(
      <View key={i} style={styles.listItem}>
        <View style={styles.cardTop}>
          <View style={styles.cardLogo} />
          <View style={styles.investContainer}>
            <View style={styles.moneyNumer} />
            <View style={styles.moneyText} />
          </View>
          <View style={styles.rebateContainer}>
            <View style={styles.moneyNumer} />
            <View style={styles.moneyText} />
          </View>
          <View style={styles.statusIcon} />
        </View>
        <View style={styles.cardBottom}>
          <View style={styles.cardIntro}>
            <View style={styles.introText} />
            <View style={styles.introText} />
          </View>
          <View style={styles.btnContainer} />
        </View>
      </View>
    );
  }
  return <View style={styles.listItemContainer}>{PlaceholderContent}</View>;
};

const styles = EStyleSheet.create({
  $bg: '#eeeeee',
  listItemContainer: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listItem: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    height: pxToDp(330),
    margin: pxToDp(15),
    paddingLeft: pxToDp(17),
    paddingRight: pxToDp(15),
    borderRadius: pxToDp(10)
  },
  statusIcon: {
    position: 'absolute',
    width: pxToDp(110),
    height: pxToDp(110),
    borderRadius: pxToDp(55),
    borderColor: '$bg',
    borderWidth: pxToDp(1),
    top: pxToDp(-15),
    right: pxToDp(33)
  },
  cardTop: {
    paddingLeft: pxToDp(17),
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(40),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#EAEAEA'
  },
  cardLogo: {
    width: pxToDp(72),
    height: pxToDp(75),
    backgroundColor: '$bg'
  },
  investContainer: {
    marginLeft: pxToDp(60),
    marginRight: pxToDp(80)
  },
  moneyNumer: {
    width: pxToDp(60),
    height: pxToDp(28),
    backgroundColor: '$bg',
    marginBottom: pxToDp(15)
  },
  moneyText: {
    height: pxToDp(28),
    width: pxToDp(130),
    backgroundColor: '$bg'
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: pxToDp(40),
    paddingLeft: pxToDp(43)
  },
  introText: {
    width: pxToDp(250),
    height: pxToDp(28),
    backgroundColor: '$bg',
    marginBottom: pxToDp(26)
  },
  btnContainer: {
    width: pxToDp(126),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
    backgroundColor: '$bg',
    marginRight: pxToDp(30)
  }
});
export default Placeholder.connect(customPlaceholder);
