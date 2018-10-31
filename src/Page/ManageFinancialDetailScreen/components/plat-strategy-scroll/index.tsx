import * as React from 'react';
import { View, Text } from 'native-base';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PlatStrategyComponent from '../plat-strategy/index';
import PlatInformationComponent from '../plat-information/index';
import { PlatScheme, PlatformMes } from '../../shared/detail.model';

type Props = {
  getterSchemeInfo: PlatScheme[];
  getPlatFormMes: PlatformMes;
}

class PlatStrategyScrollComponent extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={{ marginTop: 10, }}>
        <Tabs tabBarUnderlineStyle={styles.strategyTabs}>
          <Tab heading="返利方案" tabStyle={styles.strategyTab} activeTabStyle={styles.strategyTab} textStyle={styles.strategyText} activeTextStyle={styles.strategyActiveText}>
            <PlatStrategyComponent
              getterSchemeInfo={this.props.getterSchemeInfo}
              getPlatFormMes={this.props.getPlatFormMes}
            />
          </Tab>
          <Tab heading="平台信息" tabStyle={styles.strategyTab} activeTabStyle={styles.strategyTab} textStyle={styles.strategyText} activeTextStyle={styles.strategyActiveText}>
            <PlatInformationComponent
              getPlatFormMes={this.props.getPlatFormMes}
            />
          </Tab>
        </Tabs>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  strategyTabs: {
    // backgroundColor: '#ff8225',
    borderColor: '#ff8225',
    borderBottomWidth: 1.5
  },
  strategyText: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'normal'
  },
  strategyActiveText: {
    color: '#ff8225',
    fontWeight: 'normal'
  },
  strategyTab: {
    backfaceVisibility: 'hidden',
    backgroundColor: '#fff'
  }
})
export default PlatStrategyScrollComponent;