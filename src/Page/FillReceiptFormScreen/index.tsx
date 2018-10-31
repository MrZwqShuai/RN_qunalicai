import * as React from 'react';
import { View, Text, Image } from 'react-native';
import Picker from 'react-native-picker';
import { Form, Item } from 'native-base';
import { observer, inject } from 'mobx-react';
import { validateByType, getDateList, getCurrentDate, pxToDp } from '~utils';
import Toast from '~components/NewToast';
import Touch from '~components/QNTouch';
import TextInput from '~components/QNF/TextInput';
import FinanicalWrapper from '~components/FinancialWrapper';
import styles from './style';

@inject('ReceiptRecordStore', 'RedBagStore')
@observer
class WelfareCenterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props) {
    super(props);
  }
  _handleInput = (value, type) => {
    this.props.ReceiptRecordStore.setFillParams(type, value);
  };
  _handleInvestLimit = () => {
    const {
      fillReceiptParams: { investmentLimit },
      tzqxList
    } = this.props.ReceiptRecordStore;
    const selectedValue = investmentLimit ? [investmentLimit] : [tzqxList[0]];
    Picker.init({
      pickerData: tzqxList,
      selectedValue: selectedValue,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择投资期限',
      onPickerConfirm: val => {
        this.props.ReceiptRecordStore.setFillParams('investmentLimit', val[0]);
      }
    });
    Picker.show();
  };
  _handleInvestDate = () => {
    const dataList = getDateList();
    const { investmentDate } = this.props.ReceiptRecordStore.fillReceiptParams;
    let selectedValue = [];
    if (investmentDate) {
      selectedValue = investmentDate.split('-');
    } else {
      selectedValue = getCurrentDate();
    }
    Picker.init({
      pickerData: dataList,
      selectedValue: selectedValue,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择投资日期',
      onPickerConfirm: val => {
        const date = val[0] + '-' + val[1] + '-' + val[2];
        this.props.ReceiptRecordStore.setFillParams('investmentDate', date);
      }
    });
    Picker.show();
  };
  _handleRebBag = () => {
    this.props.navigation.navigate('MyRedBag', { type: 'from' });
  };
  _handleSubmit = () => {
    const {
      phoneNumber,
      platformUser,
      investmentMoney,
      investmentDate,
      investmentLimit
    } = this.props.ReceiptRecordStore.fillReceiptParams;
    const validatePhone = validateByType('phone', phoneNumber);
    if (!validatePhone.ret) {
      Toast.show(validatePhone.message);
      return false;
    } else if (!platformUser) {
      Toast.show('请输入用户名');
    } else if (!investmentMoney) {
      Toast.show('请输入投资金额');
    } else if (!investmentDate) {
      Toast.show('请选择投资日期');
    } else if (!investmentLimit) {
      Toast.show('请选择投资期限');
    } else {
      const redId = this.props.RedBagStore.params.id
        ? this.props.RedBagStore.params.id
        : 0;
      this.props.ReceiptRecordStore.hzdUpdate(redId).then(data => {
        if (data !== 0) {
          Toast.show('提交成功');
          this.props.ReceiptRecordStore.setRefresh(true);
          const timer = setTimeout(() => {
            clearTimeout(timer);
            this.props.navigation.goBack(null);
          }, 500);
        }
      });
    }
  };
  componentDidMount() {
    const platFormID = this.props.navigation.getParam('platformID');
    const isEdit = this.props.navigation.getParam('isEdit');
    if (this.props.navigation.getParam('id')) {
      this.props.ReceiptRecordStore.getEditSelList({
        id: this.props.navigation.getParam('id')
      });
    }
    this.props.ReceiptRecordStore.setFillParams('isEdit', isEdit);
    this.props.ReceiptRecordStore.setFillParams('id', platFormID);
    this.props.ReceiptRecordStore.getQxList();
  }
  componentWillUnmount() {
    this.props.ReceiptRecordStore.clearParams();
    this.props.RedBagStore.clearBagParams();
    Picker.isPickerShow(status => {
      if (status) {
        Picker.hide();
      }
    });
  }
  render() {
    const { _handleInvestLimit, _handleInvestDate, _handleRebBag } = this;
    const { params } = this.props.RedBagStore;
    const {
      phoneNumber,
      platformUser,
      investmentMoney,
      investmentDate,
      investmentLimit
    } = this.props.ReceiptRecordStore.fillReceiptParams;
    return (
      <View style={styles.box}>
        <FinanicalWrapper title="提交回单" backgroundColor="#f5f5f5">
          <View style={styles.wrap}>
            <View style={styles.container}>
              <Text style={styles.warnTitle}>温馨提示</Text>
              <Text style={styles.warnText}>
                每次投资完，我们根据您填写的回单给您结算返利，为了让您的的返利顺利通过，请务必填写真实有效的投资信息。
              </Text>
              <Image
                style={styles.lineImg}
                source={require('./assets/images/line.png')}
              />
              <Form style={styles.formContainer}>
                <Text style={styles.basicInfoTitle}>基本信息</Text>
                <Item style={styles.formItem}>
                  <TextInput
                    value={phoneNumber}
                    onChangeText={value => {
                      this._handleInput(value, 'phoneNumber');
                    }}
                    maxLength={11}
                    inputStyle={styles.inputText}
                    containerStyle={styles.inputContainer}
                    placeholder="请输入手机号"
                    keyboardType="phone-pad"
                  />
                </Item>
                <Item style={styles.formItem}>
                  <TextInput
                    value={platformUser}
                    onChangeText={value => {
                      this._handleInput(value, 'platformUser');
                    }}
                    allowCN
                    maxLength={20}
                    inputStyle={styles.inputText}
                    containerStyle={styles.inputContainer}
                    placeholder="请输入用户名"
                  />
                </Item>
                <Text style={styles.investInfoTitle}>投资信息</Text>
                <Item style={styles.formItem}>
                  <TextInput
                    value={investmentMoney}
                    onChangeText={value => {
                      this._handleInput(value, 'investmentMoney');
                    }}
                    inputStyle={styles.inputText}
                    containerStyle={styles.inputContainer}
                    placeholder="请输入实际投资金额"
                    keyboardType="numeric"
                  />
                </Item>
                <Item style={styles.formItem}>
                  <Touch
                    style={styles.cellContainer}
                    onPress={_handleInvestDate}>
                    <Text style={styles.cellLeft}>请选择投资日期</Text>
                    <View style={styles.cellRight}>
                      <Text style={styles.cellValue}>{investmentDate}</Text>
                      <Image
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
                <Item style={styles.formItem}>
                  <Touch
                    style={styles.cellContainer}
                    onPress={_handleInvestLimit}>
                    <Text style={styles.cellLeft}>请选择投资期限</Text>
                    <View style={styles.cellRight}>
                      <Text style={styles.cellValue}>{investmentLimit}</Text>
                      <Image
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
                <Item style={[styles.formItem, styles.noBorder]}>
                  <Touch onPress={_handleRebBag} style={styles.cellContainer}>
                    <Text style={styles.cellLeft}>请选择红包</Text>
                    <View style={styles.cellRight}>
                      <Text style={styles.cellValue}>
                        {params.id ? params.jine + '元红包' : ''}
                      </Text>
                      <Image
                        resizeMode="contain"
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
              </Form>
            </View>
            <Image
              style={styles.endLine}
              source={require('./assets/images/end-line.png')}
            />
            <Touch style={styles.btnContainer} onPress={this._handleSubmit}>
              <Text style={styles.btnText}>提交</Text>
            </Touch>
          </View>
        </FinanicalWrapper>
      </View>
    );
  }
}

export default WelfareCenterScreen;
