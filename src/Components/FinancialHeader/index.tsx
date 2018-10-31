import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { pxToDp, isIphoneX } from '~utils';
import HeaderLeft from '~components/HeaderLeft';

type Props = {
  title: string;
  headerStyle: object;
};
export default class FinancialHeaderComponent extends React.Component<Props> {
  static defaultProps = {
    title: '测试title',
    headerStyle: {
      paddingLeft: pxToDp(33)
    },
    handleTitleClick: () => {}
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={styles.container} />
        <View style={[styles.header, { ...this.props.headerStyle }]}>
          <HeaderLeft />
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.handleTitleClick();
            }}>
            <View style={styles.titleBtn}>
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    height: pxToDp(173),
    backgroundColor: '#384269',
    zIndex: -1
  },
  header: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    height: pxToDp(100),
    paddingLeft: pxToDp(33),
    paddingRight: pxToDp(34),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 99
  },
  titleBtn: {
    borderRadius: pxToDp(2)
  },
  title: {
    // marginLeft: pxToDp(30),
    fontSize: pxToDp(38),
    fontWeight: 'bold',
    color: '#fff'
  }
});
