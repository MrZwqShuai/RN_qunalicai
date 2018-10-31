import * as React from 'react';
import { FlatList, Image, Alert } from 'react-native';
import { Text } from 'react-native';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';
import strategy from '../../shared/strategy';
import { StrategyContent, StrategyContentString } from '../../shared/strategy';
import { PlatScheme, PlatformMes } from '../../shared/detail.model';

type Props = {
  getterSchemeInfo: PlatScheme[];
  getPlatFormMes: PlatformMes;
}

class PlatStrategyComponent extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.platStrategy}>
        <View>
          {
            this.renderListHeader()
          }
        </View>
        <View style={styles.platTable}>
          {this.renderListTable()}
        </View>
        {this.renderStrategyRules()}
        <Image source={require('../../assets/images/strategy.png')} style={styles.strategyProcess} />
        {this.renderRules(strategy.state)}
      </View>
    )
  }

  renderListTable() {
    return (
      <View>
        <FlatList
          // horizontal={true}
          style={styles.platTables}
          data={this.props.getterSchemeInfo}
          renderItem={({ item }: any) => {
            return (
              <View style={{ flexDirection: 'row', }}>
                <Text style={styles.item}>{item.LimitedDuration}</Text>
                <Text style={styles.item}>{item.EffectiveProject}</Text>
                <Text style={styles.item}>{item.InvestmentLimit}</Text>
                <Text style={styles.item}>{item.RebateImmediately}</Text>
                <Text style={styles.item}>{item.EffectiveProject}</Text>
              </View>
            )
          }}
        />
      </View>
    )
  }

  renderListHeader() {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderTitle}>
          投资期限
        </Text>
        <Text style={styles.listHeaderTitle}>
          有效项目
        </Text >
        <Text style={styles.listHeaderTitle}>
          投资金额
        </Text>
        <Text style={styles.listHeaderTitle}>
          返现金额
        </Text>
        <Text style={styles.listHeaderTitle}>
          总收益
        </Text>
      </View>
    )
  }

  renderStrategyRules() {
    const platFormMes = this.props.getPlatFormMes;
    if (platFormMes.tzgl) {
      strategy.gonglue.content = platFormMes.tzgl.split('；');
    }
    if (platFormMes.zyts) {
      strategy.lint.content = platFormMes.zyts.split('；');
    }
    return (
      <View style={styles.strategyRules}>
        <Text style={styles.strategyRulesTitle}>
          {strategy.title}
        </Text>
        {this.renderRules(strategy.gonglue)}
        {this.renderRules(strategy.lint)}
      </View>
    )
  }

  renderRules(strategyContent: StrategyContent | StrategyContentString) {
    function checkStyle() {
      return strategyContent.title === '重要提示:' ? styles.importantHints : styles.investStrategyTitle
    }
    function checkContentArray() {
      if (Array.isArray(strategyContent.content)) {
        return strategyContent.content.map((item: string, index: number) => {
          return (
            <Text key={index} style={checkStyle()}>
              {item}
            </Text>
          )
        })
      } else {
        return (
          <Text style={checkStyle()}>
            {strategyContent.content}
          </Text>
        )
      }
    }
    return (
      <View style={styles.strategyRuleDetail}>
        <Text style={[checkStyle(), { marginBottom: 10 }]}>
          {strategyContent.title}
        </Text>
        {checkContentArray()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  platStrategy:
    {
      width: '94%',
      paddingBottom: 30,
      alignSelf: 'center'
    },
  listHeader: {
    height: 35,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#f97041',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  listHeaderTitle: {
    width: 67.7,
    textAlign: 'center',
    fontSize: 12,
    color: '#fff'
  },
  platTable: {
    justifyContent: 'space-around',
  },
  platTables: {
  },
  item: {
    padding: 10,
    fontSize: 10,
    width: 67.7,
    height: 35,
    textAlign: 'center',
    borderWidth: .2,
    borderColor: '#ccc'
  },
  strategyRules: {
    marginTop: 20,
  },
  strategyRuleDetail: {
    marginTop: 10,
  },
  strategyRulesTitle: {
    fontSize: 13,
    color: '#666'
  },
  investStrategyTitle: {
    fontSize: 11,
    color: '#999',
  },
  importantHints: {
    fontSize: 11,
    color: '#f45324'
  },
  strategyProcess: {
    marginTop: 10,
    width: 337,
    height: 250
  }
})
export default PlatStrategyComponent;