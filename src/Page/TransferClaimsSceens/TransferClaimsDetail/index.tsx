import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ManageFinancialImpl } from './shared/detail.model';
import PlatBottomBarComponent from './components/plat-bottom-bar/index';
import styles from './assets/styles';
import HeaderLeft from '~components/HeaderLeft';
import PlatMessage from './components/plat-message/index';
import PlatBaseInfo from './components/plat-baseInfo/index';
import PlatTips from './components/plat-tips/index';
import PlatBadges from './components/plat-badges/index';

type Props = {
  ManageFinancialStore: ManageFinancialImpl;
};

@inject('ManageFinancialStore')
@observer
export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.scrollBaseBackground}>
          <View style={styles.headerContainer}>
            <View style={styles.headerItemContainer}>
              <HeaderLeft />
              <Text style={styles.headerItemTitle}>团购网</Text>
            </View>
          </View>
          <ScrollView
            style={styles.scrollWrapper}
            showsVerticalScrollIndicator={false}>
            <PlatMessage />
            <PlatBaseInfo />
            <PlatTips />
            <PlatBadges />
          </ScrollView>
        </View>
        <PlatBottomBarComponent />
      </View>
    );
  }
  componentWillMount() {}
}
