import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { IpipeChartInfo } from '../../shared/Invest.model';
import { pxToDp } from '~utils';

type Props = {
  info: IpipeChartInfo[];
}
export default class InvestTableComponent extends React.PureComponent<Props> {

  _keyExtractor = (item, index) => String(index);

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.investTable}>
        <FlatList
          data={this.props.info}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => {
            return (
              <View style={styles.headerContainer} key={item.fanli}>
                <Text style={[styles.headerTitle, styles.headerTitleRightBd]}>
                  {item.Platform}
                </Text>
                <Text style={[styles.headerTitle, styles.headerTitleRightBd]}>
                  {item.platNum}笔
                </Text>
                <Text style={[styles.headerTitle, styles.headerTitleRightBd]}>
                  {item.InvestmentMoney}万
                </Text>
                <Text style={[styles.headerTitle, styles.headerTitleRightBd]}>
                  {item.fanli}万
                </Text>
              </View>
            )
          }}
          ListEmptyComponent={this.renderEmptyComponent()}
          ListHeaderComponent={this.renderHeaderComponent()}
        />
        <Text style={styles.investExplain}>
        *只显示投资占比最多的前三家平台，剩余的投资归纳为其它。
        </Text>
      </View>
    )
  }

  renderEmptyComponent() {
    return (
      <View style={{ marginTop: 15 }}>
        <Text>
          暂无数据
        </Text>
      </View>
    )
  }

  renderHeaderComponent() {
    return (
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, ]}>平台名称</Text>
        <Text style={[styles.headerTitle, ]}>回单总数</Text>
        <Text style={[styles.headerTitle, ]}>投资总额</Text>
        <Text style={[styles.headerTitle,]}>返利总额</Text>
      </View>
    )
  }

}

const styles = EStyleSheet.create({
  investTable: {
    marginTop: pxToDp(15),
    paddingTop: pxToDp(43),
    paddingBottom: pxToDp(52),
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerTitle: {
    width: 86,
    height: 40,
    textAlign: 'center',
    fontSize: pxToDp(30),
    color: '#999999',
  },
  headerTitleRightBd: {
    color: '#333',
  },
  headerTitleToptBd: {
  },
  investExplain: {
    marginTop: pxToDp(75),
    fontSize: pxToDp(24),
    textAlign: 'center',
    color: '#999999'
  }
})