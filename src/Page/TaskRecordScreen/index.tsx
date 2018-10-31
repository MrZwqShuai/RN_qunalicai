import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import QNRefreshModel from '~components/QNRefreshModel';
import { inject, observer } from 'mobx-react';
import QNHeader from '~components/QNHeader';
import CustomPlaceholder from './components/custom-placeholder';
import styles from './assets/styles';
import { pxToDp } from '~utils';
@inject('WelfareCenterStore')
@observer
export default class DiscoverWelfareHouseScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.WelfareCenterStore.getRecordList(0);
  }
  _renderFooter = () => {
    if (this.props.WelfareCenterStore.recordList.length > 8) {
      return <Text style={styles.noMore}>没有更多记录了哦！</Text>;
    }
  };
  _loadMore = () => {
    return this.props.WelfareCenterStore.getRecordList(1);
  };
  _updateList = () => {
    this.props.WelfareCenterStore.getRecordList();
  };
  _renderRow = (item, index) => {
    return (
      <View style={styles.recordContainer}>
        <View
          style={[
            styles.recordDetail,
            index == this.props.WelfareCenterStore.recordList.length - 1
              ? styles.noBorder
              : ''
          ]}>
          <View style={styles.recordLeft}>
            <Text style={styles.recordTitle}>{item.task_name}</Text>
            <Text style={styles.recordTime}>{item.task_time}</Text>
          </View>
          <View style={styles.recordRight}>
            <Text
              style={[
                styles.recordMoney,
                item.task_name.indexOf('红包') > -1 ? styles.redfont : ''
              ]}>
              {item.task_desc}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const { isLast, recordList, isReady } = this.props.WelfareCenterStore;
    const { _renderRow, _renderFooter, _loadMore, _updateList } = this;
    return (
      <View style={styles.wrap}>
        <QNHeader title="任务记录" backIcon />
        <View style={styles.recordList}>
          <CustomPlaceholder onReady={isReady} lineNumber={7}>
            <QNRefreshModel
              list
              defaultPageType={2}
              heightForIndexPath={pxToDp(162)}
              dataSource={recordList}
              renderFooter={_renderFooter}
              renderRow={_renderRow}
              loadMore={_loadMore}
              isLast={isLast}
              onRefresh={_updateList}
            />
          </CustomPlaceholder>
        </View>
      </View>
    );
  }
}
