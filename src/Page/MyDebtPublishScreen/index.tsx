import * as React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Picker from 'react-native-picker';
import { Form, Item } from 'native-base';
import styles from './style';
import TextInput from '~components/QNF/TextInput';
import Touch from '~components/QNTouch';
import { DebtPublish } from '~pages/MyDebtPublishScreen/shared/debt-publish.model';

type Props = {
}

type State = {
  releaseRightsParams: DebtPublish;
}

class MyDebtPublishScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      releaseRightsParams: {}
    }
  }
  
  public render() {
    return (
      <View style={styles.box}>
        <ScrollView>
          <View style={styles.wrap}>
            <View style={styles.container}>
            <View style={styles.section_one}>
              <Text style={styles.warnTitle}>发布提示</Text>
              <Text style={styles.warnText}>
              注意：返利债转担保需要收取债权转让方债权本金的0.5%信息费用，在您发布完成以后如有人承接请按照系统要求转入相应金额。
              </Text>
              <Text style={styles.warnText_2}>
              交易未完成的情况下，已支付的费用可选择提现退回，退回不收取任何费用。 如有疑问请咨询客服！
              </Text>
            </View>
              <View style={[styles.section_two, {backgroundColor: '#fff'}]}>
              <Form style={styles.formContainer}>
                <Text style={styles.investInfoTitle}>其他信息</Text>
                <Item style={styles.formItem}>   
                  <Text style={styles.cellTitle}>所属平台</Text>       
                  <Touch
                    style={styles.cellContainer}
                    onPress={this._handleChangePlatForm}>
                    <Text style={styles.cellLeft}>选择平台，如果找不到在请告知客服</Text>
                    <View style={styles.cellRight}>
                      <Image
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
                <Item style={styles.formItem}>
                  <Text style={styles.cellTitle}>债转金额</Text>
                  <Touch
                    style={styles.cellContainer}
                    onPress={() => {}}>
                    <Text style={styles.cellLeft}>承接人需要在债转平台付出的金额</Text>
                    <View style={styles.cellRight}>
                      <Text style={styles.cellValue}>元</Text>
                      <Image
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
                <Item style={styles.formItem}>
                  <Text style={styles.cellTitle}>标的年化</Text>
                  <Touch
                    style={styles.cellContainer}
                    onPress={() => {}}>
                    <Text style={styles.cellLeft}>填写年化百分比，例如：12</Text>
                    <View style={styles.cellRight}>
                      <Text style={styles.cellValue}>元</Text>
                      <Image
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
                <Item style={styles.formItem}>
                  <Text style={styles.cellTitle}>剩余期限</Text>
                  <Touch
                    style={styles.cellContainer}
                    onPress={() => {}}>
                    <Text style={styles.cellLeft}>填写债权剩余时间，例如：12</Text>
                    <View style={styles.cellRight}>
                      <Text style={styles.cellValue}>天</Text>
                      <Image
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
                <Item style={styles.formItem}>
                  <Text style={styles.cellTitle}>还款方式</Text>
                  <Touch
                    style={styles.cellContainer}
                    onPress={() => {}}>
                    <Text style={styles.cellLeft}>请选择所属平台标的的还款方式</Text>
                    <View style={styles.cellRight}>
                      <Text style={styles.cellValue}>元</Text>
                      <Image
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
                <Item style={styles.formItem}>
                  <Text style={styles.cellTitle}>债转金额</Text>
                  <Touch
                    style={styles.cellContainer}
                    onPress={() => {}}>
                    <Text style={styles.cellLeft}>您想转让债权的债权折扣，例如：9</Text>
                    <View style={styles.cellRight}>
                      <Text style={styles.cellValue}>元</Text>
                      <Image
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
                <Item style={styles.formItem}>
                  <Text style={styles.cellTitle}>债权折扣</Text>
                  <Touch
                    style={styles.cellContainer}
                    onPress={() => {}}>
                    <Text style={styles.cellLeft}>您想转让债权的债权折扣，例如：9</Text>
                    <View style={styles.cellRight}>
                      <Text style={styles.cellValue}>元</Text>
                      <Image
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
                <Item style={styles.formItem}>
                  <Text style={styles.cellTitle}>折扣金额</Text>
                  <Touch
                    style={styles.cellContainer}
                    onPress={() => {}}>
                    <Text style={styles.cellLeft}>您想转让债权的折扣金额，例如：1000</Text>
                    <View style={styles.cellRight}>
                      <Text style={styles.cellValue}>元</Text>
                      <Image
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
                <Item style={styles.formItem}>
                  <Text style={styles.cellTitle}>债权有效期</Text>
                  <Touch
                    style={styles.cellContainer}
                    onPress={() => {}}>
                    <Text style={styles.cellLeft}>请选择债权转让的有效天数</Text>
                    <View style={styles.cellRight}>
                      <Text style={styles.cellValue}>元</Text>
                      <Image
                        style={styles.cellIcon}
                        source={require('./assets/images/fill_arrow.png')}
                      />
                    </View>
                  </Touch>
                </Item>
                <Item style={[styles.formItem, styles.noBorder]}>
                  <Text style={styles.cellTitle}>债转链接</Text>
                  <Touch onPress={() => {}} style={styles.cellContainer}>
                    <Text style={styles.cellLeft}>请输入您在平台的债权转让页面链接</Text>
                    <View style={styles.cellRight}>
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
              <View style={[ styles.section_three]}>
                <View style={styles.agreement}>
                  <View style={styles.agreementCheckBox}>
                    <View style={styles.outerRing}>
                      <View style={styles.innerRing}></View>
                    </View>
                    <View></View>
                  </View>
                  <Text style={styles.agreementTxt}>同意去哪理财债权转让保障协议</Text>
                </View>
                <View style={styles.submitBtnContainer}>
                <Text style={styles.submitBtn}>提交</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
  
  componentWillUnmount() {
    Picker.isPickerShow(status => {
      if (status) {
        Picker.hide();
      }
    });
  }

  private _handleChangePlatForm() {
    Picker.init({
      pickerData: ["zwq","zwq","zzzz","zqqq","zwqsss","zwqzzwwqq"],
      selectedValue: [5],
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择投所属平台',
      onPickerConfirm: val => {
        console.log(val, 'dashdjhdkl');
        this.state.releaseRightsParams.platName = val[0];
      }
    });
    Picker.show();
  }
}

export default MyDebtPublishScreen;