import * as React from 'react';
import { observable, action, toJS } from 'mobx';
import { observer } from 'mobx-react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Container, View } from 'native-base';
import QNForm from '~components/QNComForm';
import ButtonShadow from '~components/ButtonShadow';
import QNToast from '~components/QNToast';
// import R from 'ramda';
import { fetchCardInfo, fetchBankCard } from '~apis';

const style = EStyleSheet.create({
  buttonBox: {
    marginTop: '7rem'
  }
});

class UICard {
  @observable params = {};
  @observable canSubmit = false;
  @observable
  config = [
    {
      type: 'input',
      desc: '请输入开户姓名',
      param: 'skr',
      iconLeftName: 'user',
      rule: 'required',
      index: 0
    },
    {
      type: 'input',
      desc: '请输入身份证号',
      param: 'sheng',
      iconLeftName: 'idCard',
      rule: 'required',
      index: 1
    },
    {
      type: 'input',
      desc: '请选择银行',
      param: 'bankName',
      iconLeftName: 'bank',
      rule: 'required',
      pickerList: [],
      index: 2
    },
    {
      type: 'input',
      desc: '请输入银行卡号',
      param: 'card',
      iconLeftName: 'cardNo',
      rule: 'required',
      index: 3
    }
  ];

  @action
  updateConfig(config) {
    this.config = config;
  }

  @action
  updateParams(params) {
    this.params = params;
  }

  @action
  updateCanSubmit(canSubmit) {
    this.canSubmit = canSubmit;
  }
}

let cardState;

@observer
export default class MyCardScreen extends React.Component {
  constructor(props) {
    super(props);
    cardState = new UICard();
  }

  _fetchMyCard = async () => {
    const data = await fetchCardInfo();
    const type = this.props.navigation.getParam('type');
    const config = cardState.config.slice(0);
    if (type) {
      const filterArr = data.bank.filter(
        item => item.bankName == data.bankName
      );
      config[0].text = data.skr;
      config[0].isEdit = false;
      config[1].text = data.sheng;
      config[1].isEdit = false;
      config[2].text = filterArr[0].id;
      config[3].text = data.cardNo;
    }
    config[2].pickerList = type ? data.bank : data;
    cardState.updateConfig(config);
  };

  _handleSubmit = async () => {
    await fetchBankCard(toJS(cardState.params));
    QNToast.success(
      `${
        this.props.navigation.getParam('type') ? '修改' : '绑定'
      }银行卡成成功，即将导向设置`
    );
    this.props.navigation.navigate('MySetting');
  };

  onChangePassed = isPassed => {
    cardState.updateCanSubmit(isPassed);
  };

  onChangeInput = params => {
    cardState.updateParams(params);
  };

  onChangeListByIndex = (index, text) => {
    config = cardState.config.slice(0);
    config[index].text = text;
    cardState.updateConfig(config);
  };

  // LifeCycle
  componentWillMount() {
    this._fetchMyCard();
  }

  render() {
    return (
      <Container>
        <QNForm
          inputList={toJS(cardState.config)}
          onChangeInput={this.onChangeInput}
          onChangePassed={this.onChangePassed}
          onChangeListByIndex={this.onChangeListByIndex}
        />
        <View style={style.buttonBox}>
          <ButtonShadow
            text={
              this.props.navigation.getParam('type') ? '立即修改' : '立即绑卡'
            }
            onPress={this._handleSubmit}
            disabled={!cardState.canSubmit}
          />
        </View>
      </Container>
    );
  }
}
