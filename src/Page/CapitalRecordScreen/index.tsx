import * as React from 'react';
import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import QNHeader from '~components/QNHeader';
import QNRefreshModel from '~components/QNRefreshModel';
import { ScrollableTabView, DefaultTabBar } from '~components/ScrollTabView';
import RecordItem from './components/record-item';
import styles from './styles';
import { pxToDp } from '~utils';
import CustomPlaceholder from './components/custom-placeholder';

@inject('CapticalRecordStore')
@observer
export default class CapitalRecordScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.CapticalRecordStore.getCapticalRecord(0);
  }
  _onChangeTab = index => {
    this.props.CapticalRecordStore.setTabIndex(index);
    const tab = this.props.CapticalRecordStore.tabs[index];
    if (!tab.status) {
      this.props.CapticalRecordStore.getCapticalRecord(0);
    }
  };
  _renderRow = (item, index) => {
    const { tabs, tabIndex } = this.props.CapticalRecordStore;
    return (
      <RecordItem
        itemData={item}
        noBorder={tabs[tabIndex].list.length - 1 == index ? true : false}
      />
    );
  };
  _renderFooter = () => {
    const { tabs, tabIndex } = this.props.CapticalRecordStore;
    if (tabs[tabIndex].list.length && tabs[tabIndex].list.length >= 7) {
      return <Text style={styles.noMore}>没有更多记录了哦！</Text>;
    } else {
      return null;
    }
  };
  _loadMore = () => {
    const { tabIndex } = this.props.CapticalRecordStore;
    if (!this.props.CapticalRecordStore.tabs[tabIndex].isLast) {
      this.props.CapticalRecordStore.getCapticalRecord(1);
    }
  };
  _updateList = () => {
    this.props.CapticalRecordStore.getCapticalRecord(2);
  };
  render() {
    const { tabs, isReady } = this.props.CapticalRecordStore;
    const { _renderRow, _renderFooter, _loadMore, _updateList } = this;
    return (
      <View style={styles.container}>
        <QNHeader title="资金记录" backIcon border />
        <ScrollableTabView
          initialPage={0}
          onChangeTab={({ i }) => {
            this._onChangeTab(i);
          }}
          renderTabBar={() => (
            <DefaultTabBar
              inactiveTextStyle={{ fontSize: pxToDp(28) }}
              activeTextStyle={{ fontSize: pxToDp(34) }}
            />
          )}>
          {tabs.map((item, index) => {
            return (
              <View
                style={styles.listContainer}
                tabLabel={item.name}
                key={index}>
                <CustomPlaceholder onReady={isReady} lineNumber={7}>
                  <QNRefreshModel
                    list
                    defaultPageType={2}
                    dataSource={item.list}
                    renderFooter={_renderFooter}
                    heightForIndexPath={pxToDp(182)}
                    renderRow={_renderRow}
                    loadMore={_loadMore}
                    isLast={item.isLast}
                    onRefresh={_updateList}
                  />
                </CustomPlaceholder>
              </View>
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}
