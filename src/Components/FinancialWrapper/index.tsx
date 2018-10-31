import * as React from 'react';
import FinancialHeaderComponent from '../FinancialHeader/index';
import { View, Text, ScrollView, Dimensions, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { pxToDp, isIphoneX } from '~utils';

type Props = {
  defaultChildren: JSX.Element;
};

export default class FinanicalWrapper extends React.Component<Props> {
  static defaultProps = {
    defaultChildren: (
      <View style={{ backgroundColor: '#fff', borderRadius: pxToDp(10) }}>
        <Text style={{ height: 150 }}>test</Text>
        <Text style={{ height: 150 }}>test</Text>
        <Text style={{ height: 150 }}>test</Text>
        <Text style={{ height: 150 }}>test</Text>
        <Text style={{ height: 150 }}>test</Text>
      </View>
    )
  };
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.backgroundColor
          // backgroundColor: 'red'
        }}>
        <View style={styles.headerContainer}>
          <FinancialHeaderComponent
            handleTitleClick={this.props.handleTitleClick}
            headerStyle={this.props.headerStyle}
            title={this.props.title}
          />
        </View>
        <ScrollView
          style={styles.scrollWrapper}
          showsVerticalScrollIndicator={false}>
          <View style={styles.scrollExtraBlock} />
          <View>
            {this.props.children
              ? this.props.children
              : this.props.defaultChildren}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    // backgroundColor: '#f5f5f5'
  },
  headerContainer: {
    // paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingTop: 0,
    paddingBottom: pxToDp(40),
    height: pxToDp(120),
    backgroundColor: '#384269'
  },
  scrollWrapper: {
    marginLeft: pxToDp(16),
    marginRight: pxToDp(14),
    marginTop: Platform.OS === 'ios' ? 10 : -10
  },
  scrollExtraBlock: {
    width: '100%',
    opacity: 0
  }
});
