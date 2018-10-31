import * as React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { observable, action, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import Button from '~components/QNYButton';
import Toast from '~components/NewToast';
import TextInput from '~components/QNF/TextInput';
import Touch from '~components/QNTouch';
import { fetchLogin } from '~apis';
import { validateByType } from '~utils';
import style from '../assets/style';

class UILogin {
  @observable
  params = {
    phone: '',
    password: ''
  };

  @observable
  disabled = true;

  @action
  updateParams(key, value) {
    this.params[key] = value;
    this.disabled = !Object.values(toJS(this.params)).every(item => !!item);
  }
}

let loginState;

@inject('RootStore')
@observer
class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    loginState = new UILogin();
  }

  /**
   * Login
   */
  _onChangeText = (key, v) => {
    loginState.updateParams(key, v);
  };

  _handleGoForgetPassword = () => {
    this.props.navigation.navigate('ForgetPassword');
  };

  _handleLogin = async () => {
    if (this._checkSubmit()) {
      const ret = await fetchLogin(toJS(loginState.params));
      if (ret) {
        Toast.show('登录成功');
        await AsyncStorage.setItem('userId', ret.uuid);
        this.props.RootStore.setUserId(ret.uuid);
        const timer = setTimeout(() => {
          clearTimeout(timer);
          this.props.navigation.goBack(null);
        }, 500);
      }
    }
  };

  _checkSubmit = () => {
    const { phone, password } = toJS(loginState.params);
    const validatePhone = validateByType('phone', phone);
    const validatePassword = validateByType('password', password);
    if (!validatePhone.ret) {
      Toast.show(validatePhone.message);
      return false;
    }
    if (!validatePassword.ret) {
      Toast.show(validatePhone.message);
      return false;
    }
    return true;
  };

  render() {
    const { _onChangeText, _handleGoForgetPassword, _handleLogin } = this;

    return (
      <React.Fragment>
        <View style={style.subBox}>
          <TextInput
            maxLength={11}
            keyboardType="numeric"
            iconType="phone"
            placeholder="请输入您的手机号码"
            onChangeText={v => _onChangeText('phone', v)}
            containerStyle={style.textContainerStyle}
          />
          <TextInput
            iconType="lock"
            maxLength={16}
            placeholder="请输入密码"
            type="password"
            onChangeText={v => _onChangeText('password', v)}
            containerStyle={style.textContainerStyle}
          />
        </View>
        <Button
          title="登录"
          style={style.loginBBox}
          onPress={_handleLogin}
          disabled={loginState.disabled}
        />
        <View style={style.tipBox}>
          <Touch onPress={_handleGoForgetPassword}>
            <Text style={style.tipText}>忘记密码？</Text>
          </Touch>
        </View>
      </React.Fragment>
    );
  }
}

export default withNavigation(Login);
