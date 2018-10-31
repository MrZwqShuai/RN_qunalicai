import * as React from 'react';
import { View, Image, Text, Platform } from 'react-native';
import { inject, observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import QNHeader from '~components/QNHeader';
import UploadAvator from './components/upload';
import Touch from '~components/QNTouch';
import styles from './assets/style';
import Picker from 'react-native-picker';

@inject('MyInfoStore')
@observer
class UserCenter extends React.Component {
  constructor(props) {
    super(props);
  }
  _uploadImg = () => {
    this._uploadRef._toggleActionSheet();
  };
  _navigateTo = link => {
    this.props.navigation.navigate(link);
  };
  _getAvatorData = val => {
    this.props.MyInfoStore.setPrams('headPicture', val);
  };
  _renderSex = () => {
    const { sex } = this.props.MyInfoStore.user;
    if (sex === 0 || sex === 1) {
      return (
        <View style={styles.cellItem}>
          <Text style={styles.cellLeft}>性别</Text>
          <View style={styles.cellRight}>
            <Text style={styles.cellValue}>{sex == 0 ? '男' : '女'}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <Touch
          style={styles.cellItem}
          onPress={() => {
            this.props.MyInfoStore.showSexPicker();
          }}>
          <Text style={styles.cellLeft}>性别</Text>
          <View style={styles.cellRight}>
            <Text style={styles.placeholer}>请选择</Text>
            <Image
              style={styles.arrowIcon}
              source={require('./assets/images/userCenter_arrow.png')}
            />
          </View>
        </Touch>
      );
    }
  };
  _renderBirthday = () => {
    const { birthday } = this.props.MyInfoStore.user;
    if (birthday) {
      return (
        <View style={styles.cellItem}>
          <Text style={styles.cellLeft}>生日</Text>
          <View style={styles.cellRight}>
            <Text style={styles.cellValue}>{birthday}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <Touch
          style={styles.cellItem}
          onPress={() => {
            this.props.MyInfoStore.showBirthdayPicker();
          }}>
          <Text style={styles.cellLeft}>生日</Text>
          <View style={styles.cellRight}>
            <Text style={styles.placeholer}>请选择</Text>
            <Image
              style={styles.arrowIcon}
              source={require('./assets/images/userCenter_arrow.png')}
            />
          </View>
        </Touch>
      );
    }
  };
  componentWillUnmount() {
    Picker.isPickerShow(status => {
      if (status) {
        Picker.hide();
      }
    });
  }
  render() {
    const { user, showSexPicker } = this.props.MyInfoStore;
    const { _renderBirthday, _renderSex } = this;
    return (
      <View style={styles.wrap}>
        <QNHeader title="个人中心" backIcon />
        <UploadAvator
          ref={r => (this._uploadRef = r)}
          getAvatorData={this._getAvatorData}
        />
        <View style={styles.container}>
          <Touch style={styles.cellItem} onPress={() => this._uploadImg()}>
            <Text style={styles.cellLeft}>头像</Text>
            <View style={styles.cellRight}>
              <Image
                style={styles.userIcon}
                source={
                  user.headPicture
                    ? { uri: user.headPicture }
                    : require('./assets/images/userCenter_avator.png')
                }
              />
              <Image
                style={styles.arrowIcon}
                source={require('./assets/images/userCenter_arrow.png')}
              />
            </View>
          </Touch>
          <Touch
            style={styles.cellItem}
            onPress={() => this._navigateTo('ModifyNickNameScreen')}>
            <Text style={styles.cellLeft}>昵称</Text>
            <View style={styles.cellRight}>
              <Text
                style={user.nickName ? styles.cellValue : styles.placeholer}>
                {user.nickName ? user.nickName : '请填写'}
              </Text>
              <Image
                style={styles.arrowIcon}
                source={require('./assets/images/userCenter_arrow.png')}
              />
            </View>
          </Touch>
          <View style={styles.cellItem}>
            <Text style={styles.cellLeft}>邀请码</Text>
            <View style={styles.cellRight}>
              <Text style={styles.cellValue}>{user.referrerCode}</Text>
            </View>
          </View>
          <View style={styles.cellItem}>
            <Text style={styles.cellLeft}>手机号</Text>
            <View style={styles.cellRight}>
              <Text style={styles.cellValue}>{user.phoneNumber}</Text>
            </View>
          </View>
          <Touch
            style={styles.cellItem}
            onPress={() => this._navigateTo('Account')}>
            <Text style={styles.cellLeft}>收款帐号</Text>
            <View style={styles.cellRight}>
              <Text style={user.cardNo ? styles.cellValue : styles.placeholer}>
                {user.cardNo ? '已绑定' : '立即绑定'}
              </Text>
              <Image
                style={styles.arrowIcon}
                source={require('./assets/images/userCenter_arrow.png')}
              />
            </View>
          </Touch>
          {_renderSex()}
          {_renderBirthday()}
        </View>
        <View style={styles.warn}>
          <Image
            style={styles.warnIcon}
            source={require('./assets/images/warnIcon.png')}
          />
          <Text style={styles.warnText}>
            绑定性别和生日后，平台会在生日当天送一份专属生日礼包，不可更改，请认真填写！
          </Text>
        </View>
      </View>
    );
  }
}

export default withNavigation(UserCenter);
