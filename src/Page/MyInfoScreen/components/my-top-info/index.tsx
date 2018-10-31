import * as React from 'react';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { View, Text, Image } from 'react-native';
import { Button } from 'native-base';
import Touch from '~components/QNTouch';
import Toast from '~components/NewToast';
import styles from './style';
import QNAlert from '~components/QNAlert';
@inject('MyInfoStore', 'RootStore')
@observer
class MyTopInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleWithdrawClick = () => {
    const {
      user: { cardNo },
      balance
    } = this.props.MyInfoStore;
    const { isLogin } = this.props.RootStore;
    if (isLogin) {
      if (!cardNo) {
        this.props.navigation.navigate('Account');
      } else {
        const that = this;
        if (balance >= 10) {
          this.QNAlert.init({
            isConfirm: true,
            content:
              '下午三点半之前提现的用户，当天就能到账，超过三点半提现的用户将隔天到账；如遇到节假日，将顺延至工作日到账，望谅解。',
            handleConfirm: function() {
              that.props.MyInfoStore.handleWithDraw();
            }
          });
        } else {
          this.QNAlert.init({
            confirmText: '立即赚钱',
            content: '提现额度低于10元！ 不能提现！',
            handleConfirm: function() {
              that.props.navigation.navigate('ManageFinancial');
            }
          });
        }
      }
    } else {
      this.props.navigation.navigate('Login');
    }
  };
  _renderUserInfo = () => {
    const { headPicture, nickName, referrerCode } = this.props.MyInfoStore.user;
    const { isLogin } = this.props.RootStore;
    if (isLogin) {
      return (
        <View style={styles.userLeft}>
          <Image
            style={styles.avator}
            source={
              headPicture
                ? { uri: headPicture }
                : require('../../assets/images/noLoginAvator.png')
            }
          />
          <View style={styles.infoWrapper}>
            <Text style={styles.userName}>{nickName}</Text>
            <Text style={styles.inviteCode}>
              邀请码：
              {referrerCode}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.userLeft}>
          <Image
            style={styles.avator}
            source={require('../../assets/images/noLoginAvator.png')}
          />
          <View style={styles.infoWrapper}>
            <Text style={styles.loginText}>请点击登录</Text>
          </View>
        </View>
      );
    }
  };
  render() {
    const { _renderUserInfo, _handleWithdrawClick } = this;
    const { balance, lJProfit } = this.props.MyInfoStore;
    return (
      <View>
        <QNAlert ref={r => (this.QNAlert = r)} />
        <View style={styles.topWrapper}>
          <Touch
            style={styles.userInfo}
            onPress={() => this.props.navClick('UserCenter')}>
            {_renderUserInfo()}
            <Image
              style={styles.arrowIcon}
              source={require('../../assets/images/myinfo_arrow.png')}
            />
          </Touch>
          <View style={styles.accountWrapper}>
            <View style={styles.accountLeft}>
              <Text style={styles.accoutText}>账户余额</Text>
              <Text style={styles.accountNumer}>{balance}</Text>
              <View style={styles.accoutProfit}>
                <Text style={styles.profitDesc}>累计收益：</Text>
                <Text style={styles.profitNumber}>{lJProfit}</Text>
              </View>
            </View>
            <Button
              block
              rounded
              bordered
              style={styles.accountRight}
              onPress={_handleWithdrawClick}>
              <Text>提现</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
export default withNavigation(MyTopInfo);
