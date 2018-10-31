import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  AsyncStorage
} from 'react-native';
import { inject, observer } from 'mobx-react';
import Tocuhable from '~components/Touchable';
import QNHeader from '~components/QNHeader';
import QNRefreshModel from '~components/QNRefreshModel';
import MyTopInfo from './components/my-top-info';
import ReceiptList from './components/receipt-list';
import CellList from './components/cell-list';
import styles from './assets/style';

@inject('MyInfoStore', 'RootStore')
@observer
class MyInfoScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.screenListen = this.props.navigation.addListener('didFocus', obj => {
      if (!this.props.RootStore.isLogin) {
        this.props.MyInfoStore.clearParams();
      } else {
        if (!this.props.MyInfoStore.invateCode) {
          this.props.MyInfoStore.initData();
        }
      }
    });
  }
  componentWillUnmount() {
    this.screenListen.remove();
  }
  _renderRight = () => {
    return (
      <Tocuhable onPress={() => this._handleNavigateClick('MySetting')}>
        <Image
          style={styles.setIcon}
          source={require('./assets/images/setting.png')}
        />
      </Tocuhable>
    );
  };
  _refreshData = () => {
    if (this.props.RootStore.isLogin) {
      return this.props.MyInfoStore.initData();
    }
  };
  _handleNavigateClick = nav => {
    const { navigation, RootStore } = this.props;
    if (RootStore.isLogin) {
      navigation.navigate(nav);
    } else {
      navigation.navigate('Login');
    }
  };
  render() {
    const { _renderRight, _handleNavigateClick, _refreshData } = this;
    return (
      <View style={styles.wrap}>
        <QNHeader title="我的" border HeaderRight={_renderRight} />
        <View style={styles.container}>
          <QNRefreshModel view onRefresh={_refreshData} defaultPageType={1}>
            <MyTopInfo navClick={_handleNavigateClick} />
            <ReceiptList navClick={_handleNavigateClick} />
            <CellList navClick={_handleNavigateClick} />
            <View style={styles.footer}>
              <View style={styles.line} />
              <Text style={styles.footerText}>天呐，你已经看到底部啦！</Text>
              <View style={styles.line} />
            </View>
          </QNRefreshModel>
        </View>
      </View>
    );
  }
}
export default MyInfoScreen;
