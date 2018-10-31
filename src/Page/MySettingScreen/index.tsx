import * as React from 'react';
import { observable, action, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, View } from 'native-base';
import QNForm from '~components/QNComForm';
import QNToast from '~components/QNToast';
import ButtonShadow from '~components/ButtonShadow';
import { fetchUserInfo } from '~apis';
import { DeviceStorage } from '~utils';

const style = EStyleSheet.create({
  buttonBox: {
    marginTop: '7rem'
  }
});

class UISetting {
  @observable
  config = [
    {
      type: 'text',
      desc: '绑定手机号码',
      param: 'phone',
      iconLeftName: 'phone'
    },
    {
      type: 'text',
      desc: '收款账号',
      param: 'bankNum',
      iconLeftName: 'cardNo',
      right: {
        icon: 'chevron-right',
        type: 'EvilIcons'
      }
    },
    {
      type: 'text',
      desc: '登录密码',
      param: 'password',
      iconLeftName: 'lock',
      right: {
        icon: 'chevron-right',
        type: 'EvilIcons'
      }
    }
  ];

  @action
  updateConfig(config) {
    this.config = config;
  }
}

const settingState = new UISetting();

@inject('RootStore')
@observer
export default class MySettingScreen extends React.Component {
  // LifeCycle
  componentWillMount() {
    this._fetchUser();
  }

  _goMyCard(type) {
    this.props.navigation.navigate('MyCard', {
      type
    });
  }
  _goModifyPassword = () => {
    this.props.navigation.navigate('ModifyPassword');
  };

  _fetchUser = async () => {
    const {
      user: { phoneNumber, cardNo, password }
    } = await fetchUserInfo();
    const config = settingState.config.slice(0);
    config[0].text = phoneNumber;
    config[1].text = cardNo ? '已绑定' : '未绑定';
    config[1].onPress = this._goMyCard.bind(this, cardNo ? 1 : 0);
    config[2].text = password ? '已设置' : '未设置';
    config[2].onPress = this._goModifyPassword;
    settingState.updateConfig(config);
  };

  _handleSubmit = () => {
    DeviceStorage.delete('isLogin');
    DeviceStorage.delete('userId');
    this.props.RootStore.setIsLogin(false);
    this.props.RootStore.setUserId(undefined);
    this.props.navigation.navigate('Home');
    QNToast.success('退出成功，即将导向首页');
  };

  render() {
    return (
      <Container>
        <QNForm inputList={toJS(settingState.config)} />
        <View style={style.buttonBox}>
          <ButtonShadow text="安全退出" onPress={this._handleSubmit} />
        </View>
      </Container>
    );
  }
}
