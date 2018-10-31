import * as React from 'react';
import { View } from 'react-native';
import { observable, action, toJS } from 'mobx';
import { observer } from 'mobx-react';
import QNHeader from '~components/QNHeader';
import Button from '~components/QNYButton';
import Toast from '~components/NewToast';
import TextInput from '~components/QNF/TextInput';
import style from './assets/style';
import { validateByType } from '~utils';
import { fetchForgetPassword, fetchForgetCode } from '~apis';

class UIState {
  @observable
  params = {
    phone: '',
    code: '',
    password: '',
    comefrom: 2
  };
  @observable
  disabled = true;

  @action
  updateParams(k, v) {
    this.params[k] = v;
    this.disabled = !Object.values(toJS(this.params)).every(item => !!item);
  }
}

let uiState;

@observer
export default class extends React.Component {
  constructor(props, context) {
    super(props, context);
    uiState = new UIState();
  }

  _verifyCodeTextInput;

  _onChangeText = (k, v) => {
    uiState.updateParams(k, v);
  };

  _handleSubmit = async () => {
    if (this._checkSubmit()) {
      const data = await fetchForgetPassword(toJS(uiState.params));
      if (data !== 0) {
        Toast.show('修改密码成功');
        const timer = setTimeout(() => {
          clearTimeout(timer);
          this.props.navigation.goBack(null);
        }, 500);
      }
    }
  };

  _checkSubmit = () => {
    const { phone, password, code } = toJS(uiState.params);
    const validatePhone = validateByType('phone', phone);
    const validatePassword = validateByType('password', password);
    const validateVerifyCode = validateByType('verifyCode', code);

    if (!validatePhone.ret) {
      // Toast Message
      Toast.show(validatePhone.messag);
      return false;
    }
    if (!validateVerifyCode.ret) {
      // Toast Message
      Toast.show(validateVerifyCode.messag);
      return false;
    }
    if (!validatePassword.ret) {
      // Toast Message
      Toast.show(validatePassword.messag);
      return false;
    }
    return true;
  };

  _sendCode = async () => {
    const phone = uiState.params.phone;

    if (!phone) {
      return Toast.show('手机号不能为空');
    }

    if (!validateByType('phone', phone).ret) {
      return Toast.show('手机号的格式不正确');
    }

    const data = await fetchForgetCode({
      phone
    });
    // Toast Message
    if (data !== 0) {
      this._verifyCodeTextInput.bootCountDown();
      Toast.show('验证码已发出');
    }
  };

  render() {
    const { _onChangeText, _handleSubmit, _sendCode } = this;

    return (
      <View>
        <QNHeader title="忘记密码" backIcon />
        <View style={style.container}>
          <TextInput
            iconType="phone"
            keyboardType="numeric"
            maxLength={11}
            placeholder="请输入手机号码"
            onChangeText={v => _onChangeText('phone', v)}
            containerStyle={style.textContainerStyle}
          />
          <TextInput
            iconType="shield"
            placeholder="请输入验证码"
            keyboardType="numeric"
            maxLength={6}
            type="verifyCode"
            ref={r => (this._verifyCodeTextInput = r)}
            onSendCode={_sendCode}
            onChangeText={v => _onChangeText('code', v)}
            containerStyle={style.textContainerStyle}
          />
          <TextInput
            iconType="lock"
            maxLength={16}
            placeholder="请输入6-16位密码"
            type="password"
            onChangeText={v => _onChangeText('password', v)}
            containerStyle={style.textContainerStyle}
          />
          <Button
            title="确定"
            style={style.buttonBox}
            disabled={toJS(uiState).disabled}
            onPress={_handleSubmit}
          />
        </View>
      </View>
    );
  }
}
