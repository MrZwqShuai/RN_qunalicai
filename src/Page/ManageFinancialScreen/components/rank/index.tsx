import * as React from 'react';
import { StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import { View } from 'native-base';
import { getRankList } from '~apis/index';

type Props = {};

type State = {};

class RankComponent extends React.PureComponent<Props> {
  idx: number = 0;

  _keyExtractor = (item, index) => String(index);

  constructor(props: Props) {
    super(props);
    this.state = {
      rankList: []
    };
  }

  render() {
    return (
      <View style={styles.rankContainer}>
        <View style={styles.rankTitleSection}>
          <Text style={styles.rankTitle}>2018年6月下半月排行榜</Text>
        </View>
        <View>
          <FlatList
            ListHeaderComponent={this.renderHeaderComponent()}
            data={this.state.rankList}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => {
              return (
                <View style={styles.rankListContent}>
                  <Text>{this.idx++ - 1}</Text>
                  <Text>{item.Platform}</Text>
                  <Text>{item.OnlineTime}</Text>
                  <Text>{item.platNum}</Text>
                  <Text>{item.InvestmentMoney}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }

  renderHeaderComponent() {
    return (
      <View style={styles.rankListHeader}>
        <Text style={styles.rankListHeaderTitle}>热度</Text>
        <Text>平台</Text>
        <Text>上线时间</Text>
        <Text>回单数</Text>
        <Text>成交额(万)</Text>
      </View>
    );
  }

  componentWillMount() {
    this.getRankList();
  }

  getRankList() {
    getRankList().then(data => {
      console.log(data, ' data ');
      this.setState({
        rankList: data.mapList
      });
    });
  }
}

const styles = StyleSheet.create({
  rankContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: '#fff'
  },
  rankTitleSection: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8'
  },
  rankTitle: {
    fontSize: 14,
    color: '#333'
  },
  rankListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e9e8ef'
  },
  rankListHeaderTitle: {
    fontSize: 15,
    color: '#999'
  },
  rankListContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e9e8ef'
  },
  rankListItem: {
    width: '20%'
  }
});

export default RankComponent;
