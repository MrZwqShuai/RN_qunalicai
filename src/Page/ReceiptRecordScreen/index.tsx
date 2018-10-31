import * as React from 'react';
import { View, Text } from 'react-native';
import Picker from 'react-native-picker';
import { ScrollableTabView, DefaultTabBar } from '~components/ScrollTabView';
import Touch from '~components/QNTouch';
import QNHeader from '~components/QNHeader';
import QNRefreshModel from '~components/QNRefreshModel';
import QNAlert from '~components/QNAlert';
import { inject, observer } from 'mobx-react';
import Card from './components/card';
import CustomPlaceholder from './components/custom-placeholder';
import styles from './styles';
import { pxToDp } from '~utils';

@inject('ReceiptRecordStore')
@observer
export default class ReceiptRecordScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.ReceiptRecordStore.clearTabs();
    this.props.ReceiptRecordStore.getReceiptRecord(0);
    this.props.ReceiptRecordStore.getPlatFormName();
    this.screenListen = this.props.navigation.addListener('didFocus', obj => {
      if (this.props.ReceiptRecordStore.refresh) {
        this.props.ReceiptRecordStore.getReceiptRecord(0);
        this.props.ReceiptRecordStore.getPlatFormName();
        this.props.ReceiptRecordStore.setRefresh(false);
      }
    });
  }
  componentWillUnmount() {
    this.screenListen.remove();
    Picker.isPickerShow(status => {
      if (status) {
        Picker.hide();
      }
    });
  }
  _onChangeTab = index => {
    Picker.isPickerShow(status => {
      if (status) {
        Picker.hide();
      }
    });
    this.props.ReceiptRecordStore.setTabIndex(index);
    const tab = this.props.ReceiptRecordStore.tabs[index];
    if (!tab.status) {
      this.props.ReceiptRecordStore.getReceiptRecord(0);
    }
  };
  _handleEditOnPress = item => {
    const { id, platformID } = item;
    this.props.navigation.navigate('FillReceiptForm', {
      id,
      platformID,
      isEdit: 2
    });
  };
  _handleDelOnPress = item => {
    const that = this;
    this.QNAlert.init({
      isConfirm: true,
      content: '确认删除回执单吗？',
      handleConfirm: () => {
        that.props.ReceiptRecordStore.delHzdData({ id: item.id });
      }
    });
  };

  _renderRow = item => {
    return (
      <Card
        data={item}
        onEditPress={this._handleEditOnPress}
        onDelPress={this._handleDelOnPress}
      />
    );
  };
  _renderFooter = () => {
    const { tabs, tabIndex } = this.props.ReceiptRecordStore;
    if (tabs[tabIndex].list.length && tabs[tabIndex].list.length >= 4) {
      return <Text style={styles.noMore}>没有更多了哦</Text>;
    } else {
      return null;
    }
  };
  _loadMore = () => {
    const { tabIndex } = this.props.ReceiptRecordStore;
    if (!this.props.ReceiptRecordStore.tabs[tabIndex].isLast) {
      this.props.ReceiptRecordStore.getReceiptRecord(1);
    }
  };
  _updateList = () => {
    this.props.ReceiptRecordStore.getReceiptRecord(2);
  };
  _handleSubmit = () => {
    const { navigate } = this.props.navigation;
    const { pingtaiName } = this.props.ReceiptRecordStore;
    const list = pingtaiName.map(item => {
      return item.platform;
    });
    this.props.ReceiptRecordStore.getBindCardInfo().then(data => {
      if (data) {
        Picker.init({
          pickerData: list,
          selectedValue: [list[0]],
          pickerConfirmBtnText: '确认',
          pickerCancelBtnText: '取消',
          pickerTitleText: '选择平台',
          onPickerConfirm: name => {
            const { ID } = pingtaiName.find(u => u.platform == name);
            navigate('FillReceiptForm', {
              platformID: ID,
              isEdit: 1
            });
          }
        });
        Picker.show();
      } else {
        navigate('Account');
      }
    });
  };
  render() {
    const { tabs, isReady } = this.props.ReceiptRecordStore;
    const {
      _renderRow,
      _renderFooter,
      _loadMore,
      _updateList,
      _handleSubmit
    } = this;
    return (
      <View style={styles.container}>
        <QNAlert ref={r => (this.QNAlert = r)} />
        <QNHeader title="回单记录" backIcon />
        <ScrollableTabView
          initialPage={0}
          onChangeTab={({ i }) => {
            this._onChangeTab(i);
          }}
          renderTabBar={() => <DefaultTabBar />}>
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
                    heightForIndexPath={pxToDp(330)}
                    dataSource={item.list}
                    renderFooter={_renderFooter}
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
        <Touch style={styles.submitBtnContainer} onPress={_handleSubmit}>
          <Text style={styles.submitBtnText}>提交投资回单</Text>
        </Touch>
      </View>
    );
  }
}
