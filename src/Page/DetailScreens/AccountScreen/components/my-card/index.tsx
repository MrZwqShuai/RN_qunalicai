import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, Text, TextInput, Platform } from 'react-native';
import { observer, inject } from 'mobx-react';
import Container from '~components/QNF/Container';
import Row from '~components/QNF/Row';
import Touch from '~components/QNTouch';
import Button from '~components/QNYButton';
import style from './style';
import Picker from 'react-native-picker';

class ITextInput extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      Platform.OS !== 'ios' ||
      (this.props.value === nextProps.value &&
        (nextProps.defaultValue == undefined ||
          nextProps.defaultValue == '')) ||
      (this.props.defaultValue === nextProps.defaultValue &&
        (nextProps.value == undefined || nextProps.value == ''))
    );
  }
  _onFocus = () => {
    Picker.isPickerShow(status => {
      if (status) {
        Picker.hide();
      }
    });
  };
  render() {
    const props = this.props;
    return (
      <TextInput
        onFocus={this._onFocus}
        style={[style.textInput, !props.editable ? style.defaultText : {}]}
        underlineColorAndroid="transparent"
        placeholderTextColor="rgb(153,153,153)"
        {...props}
      />
    );
  }
}

@inject('CardStore')
@observer
export default class extends React.Component {
  static propTypes = {
    type: PropTypes.number // 0-bind 1-modify
  };

  _onChangeText = (k, v) => {
    this.props.CardStore.setCardMessageByKey(k, v);
  };

  _onShowPicker = () => {
    this.props.CardStore.showPicker();
  };

  _handleProcessCard = () => {
    this.props.CardStore.updateCardInfo(this.props.type);
  };

  render() {
    const {
      props: { type },
      _handleProcessCard,
      _onChangeText,
      _onShowPicker
    } = this;

    return (
      <View>
        <Container>
          <Row>
            <Text style={style.leftText}>姓名</Text>
            <ITextInput
              placeholder="请填写收款人姓名"
              editable={type === 0}
              defaultValue={this.props.CardStore.cardMessage.userName}
              onChangeText={v => _onChangeText('userName', v)}
            />
          </Row>
          <Row>
            <Text style={style.leftText}>身份证号</Text>
            <ITextInput
              placeholder="请输入收款人身份证号"
              editable={type === 0}
              defaultValue={this.props.CardStore.cardMessage.idCard}
              onChangeText={v => _onChangeText('idCard', v)}
            />
          </Row>
          <Touch onPress={_onShowPicker}>
            <Row>
              <Text style={style.leftText}>开户银行</Text>
              <View style={style.fdr}>
                {this.props.CardStore.cardMessage.bank ? (
                  <Text>{this.props.CardStore.cardMessage.bank}</Text>
                ) : (
                  <Text style={style.defaultText}>请选择开户银行</Text>
                )}
              </View>
            </Row>
          </Touch>
          <Row>
            <Text style={style.leftText}>银行卡号</Text>
            <ITextInput
              editable={true}
              placeholder="请输入收款人的银行卡号"
              defaultValue={this.props.CardStore.cardMessage.bankCard}
              onChangeText={v => _onChangeText('bankCard', v)}
            />
          </Row>
        </Container>
        <View style={style.tipContainer}>
          <Text style={style.tipText}>
            1、请务必保证收款人姓名身份证号与绑定的银行卡号一致，否则将影响提现打款。
          </Text>
          <Text style={style.tipText}>
            2、收款人姓名身份证号提交后将不可更改，请认准填写。
          </Text>
        </View>
        <Button
          style={style.submitContainer}
          title={type === 0 ? '立即添加' : '修改收款账号'}
          onPress={_handleProcessCard}
        />
      </View>
    );
  }
}
