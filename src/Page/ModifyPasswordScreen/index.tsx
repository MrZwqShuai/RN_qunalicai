import * as React from 'react';
import { observable, action, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Container } from 'native-base';
import QNForm from '~components/QNComForm';
import ButtonShadow from '~components/ButtonShadow';
// import Touchable from '~components/Touchable';
import QNToast from '~components/QNToast';
import { fetchChangePassword } from '~apis';

class UIModifyPassword {
  @observable params = {};
  @observable canSubmit = false;

  @action
  updateParams(params) {
    this.params = params;
  }

  @action
  updateCanSubmit(canSubmit) {
    this.canSubmit = canSubmit;
  }
}

const modifyPasswordState = new UIModifyPassword();
const modifyPasswordConfig = [
  {
    type: 'label',
    desc: '请输入您的原始密码',
    text: '原始密码：',
    param: 'oldPassword',
    rule: 'password'
  },
  {
    type: 'label',
    desc: '8-16位字母及数字组合',
    text: '新密码：',
    param: 'password',
    rule: 'password'
  },
  {
    type: 'label',
    desc: '请重复输入您的新密码',
    text: '重复新密码：',
    param: 'newPassword',
    rule: 'password'
  }
];

@observer
export default class LoginScreen extends React.Component {
  _handleSubmit = async () => {
    await fetchChangePassword(toJS(modifyPasswordState.params));
    QNToast.success('修改密码成功，即将导向设置');
    this.props.navigation.navigate('MySetting');
  };

  onChangePassed = isPassed => {
    modifyPasswordState.updateCanSubmit(isPassed);
  };

  onChangeInput = params => {
    modifyPasswordState.updateParams(params);
  };

  render() {
    return (
      <Container>
        <QNForm
          inputList={modifyPasswordConfig}
          onChangeInput={this.onChangeInput}
          onChangePassed={this.onChangePassed}
        />
        <ButtonShadow
          text="立即修改"
          onPress={this._handleSubmit}
          disabled={!modifyPasswordState.canSubmit}
        />
      </Container>
    );
  }
}
