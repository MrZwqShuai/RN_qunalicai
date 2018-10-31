import * as React from 'react';
import { AsyncStorage, View, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { observable, action, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { fetchRegister, fetchVerifyCode } from '~apis';
import Button from '~components/QNYButton';
import TextInput from '~components/QNF/TextInput';
import Toast from '~components/NewToast';
import style from '../assets/style';
import { validateByType } from '~utils';

class UIRegister {
  @observable
  params = {
    phone: '',
    yzm: '',
    password: '',
    referrerCode: ''
  };

  @observable
  disabled = true;

  @action
  updateParams(k, v) {
    this.params[k] = v;
    this.disabled = !Object.entries(toJS(this.params)).every(
      item =>
        (item[0] !== 'referrerCode' && item[1]) || item[0] === 'referrerCode'
    );
  }
}

let registerState;
@inject('RootStore')
@observer
class Register extends React.Component {
  constructor(props, context) {
    super(props, context);
    registerState = new UIRegister();
    this._verifyCodeTextInput = null;
  }

  _onChangeText = (k, v) => {
    registerState.updateParams(k, v);
  };

  _handleRegister = async () => {
    if (this._checkSubmit()) {
      const data = await fetchRegister(toJS(registerState.params));
      if (data) {
        Toast.show('注册成功');
        await AsyncStorage.setItem('userId', data.uuid);
        this.props.RootStore.setUserId(data.uuid);
        const timer = setTimeout(() => {
          clearTimeout(timer);
          this.props.navigation.goBack(null);
        }, 500);
      }
    }
  };

  _checkSubmit = () => {
    const { phone, password, yzm, referrerCode } = toJS(registerState.params);
    const validatePhone = validateByType('phone', phone);
    const validatePassword = validateByType('password', password);
    const validateVerifyCode = validateByType('verifyCode', yzm);
    const validateReferrerCode = validateByType('required', referrerCode);

    if (!validatePhone.ret) {
      // Toast Message
      Toast.show(validatePhone.message);
      return false;
    }
    if (!validatePassword.ret) {
      // Toast Message
      Toast.show(validatePassword.message);
      return false;
    }
    if (!validateVerifyCode.ret) {
      // Toast Message
      Toast.show(validateVerifyCode.message);
      return false;
    }
    return true;
  };

  _sendCode = async () => {
    const phone = registerState.params.phone;
    if (!phone) {
      return Toast.show('手机号不能为空');
    }

    if (!validateByType('phone', phone).ret) {
      return Toast.show('手机号的格式不正确');
    }
    const data = await fetchVerifyCode({
      phone
    });
    if (data) {
      this._verifyCodeTextInput.bootCountDown();
      Toast.show('验证码已发出');
    }
  };

  render() {
    const { _onChangeText, _handleRegister, _sendCode } = this;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.subBox}>
          <TextInput
            keyboardType="numeric"
            iconType="phone"
            maxLength={11}
            placeholder="请输入手机号码"
            onChangeText={v => _onChangeText('phone', v)}
            containerStyle={style.textContainerStyle}
          />
          <TextInput
            iconType="shield"
            keyboardType="numeric"
            placeholder="请输入验证码"
            maxLength={6}
            type="verifyCode"
            ref={r => (this._verifyCodeTextInput = r)}
            onSendCode={_sendCode}
            onChangeText={v => _onChangeText('yzm', v)}
            containerStyle={style.textContainerStyle}
          />
          <TextInput
            iconType="lock"
            placeholder="请输入6-16位密码"
            maxLength={16}
            type="password"
            onChangeText={v => _onChangeText('password', v)}
            containerStyle={style.textContainerStyle}
          />
          <TextInput
            iconType="email"
            keyboardType="numeric"
            placeholder="请填写推荐人邀请码"
            onChangeText={v => _onChangeText('referrerCode', v)}
            containerStyle={style.textContainerStyle}
          />
        </View>
        <Button
          disabled={registerState.disabled}
          title="注册领取28元现金礼包"
          style={style.registerBBox}
          onPress={_handleRegister}
        />
      </ScrollView>
    );
  }
}

export default withNavigation(Register);
