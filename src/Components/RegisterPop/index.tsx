import * as React from 'react';
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  Image,
  WebView
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ManageFinancialImpl, PlatDetail } from '~pages/ManageFinancialDetailScreen/shared/detail.model';

type Props = {
  navigation: any;
  ManageFinancialStore: ManageFinancialImpl;
  getPlatDetail: PlatDetail
};

@inject('ManageFinancialStore')
@observer
class RegisterPopComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const modalVisible = this.props.ManageFinancialStore.showActivityRegister;
    return (
      <View>
        <Modal
          animationType={'none'}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View>
            <View style={styles.popContainer}>
              <View style={styles.popBody}>
                <View style={styles.closeBox}>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(false);
                    }}>
                    <Image
                      source={require('./assets/images/r_close.png')}
                      style={styles.closeBtn}
                    />
                  </TouchableHighlight>
                </View>
                <View>
                  <Image
                    source={require('./assets/images/banner.png')}
                    style={styles.popBanner}
                  />
                </View>
                <View style={styles.stepContainer}>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitleTxt}>01 第一步</Text>
                    <View style={styles.firstStep}>
                      <Text style={styles.StepTitle}>跳转链接注册账号</Text>
                      <View style={styles.StepRadius} />
                      <View style={styles.StepLine} />
                    </View>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitleTxt}>01 第二步</Text>
                    <View style={styles.secondStep}>
                      <Text style={styles.StepTitle}>
                        下载投资平台和APP客户端或者
                      </Text>
                      <Text style={styles.StepTitle2}>登录PC官网进行投资</Text>
                      <View style={styles.StepRadius} />
                      <View style={styles.StepLine} />
                    </View>
                  </View>
                </View>
                <View style={styles.remark}>
                  <Text style={styles.remarkTxt}>注:</Text>
                  <Text style={styles.remarkTxt}>
                    点击
                    <Text style={[styles.remarkTxt, { color: '#ffad2c' }]}>
                      【继续前往】
                    </Text>
                    <Text style={styles.remarkTxt}>
                      进行注册，按照攻略填写注册信息！某些平台无适应移动端页面，造成一定的操作不便，请谅解。
                    </Text>
                  </Text>
                </View>
                <TouchableHighlight
                  onPress={() => {
                    this.goActivityWebView();
                  }}>
                  <View style={styles.bindCardBtn}>
                    <Text style={styles.bindCardBtnTxt}>继续前往</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  componentWillUnmount() {
    this.setModalVisible(false);
  }

  setModalVisible(visible) {
    this.props.ManageFinancialStore.setModalARegister(visible);
  }

  goActivityWebView() {
    this.setModalVisible(false);
    this.props.navigation.navigate('HomeWebView', {
      url: this.getZdljApp()
    });
  }

  getZdljApp(): string {
    if(typeof this.props.ManageFinancialStore.getPlatDetail === 'object') {
      return this.props.ManageFinancialStore.getPlatDetail.zdljapp;
    } else {
      return '';
    }
  }
}
const styles = EStyleSheet.create({
  popContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.46)'
  },
  popBody: {
    position: 'relative',
    width: 288,
    backgroundColor: '#fff',
    borderRadius: 15
  },
  popBanner: {
    width: '100%',
    height: 124,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  closeBox: {
    position: 'absolute',
    top: 11,
    right: 11,
    zIndex: 9
  },
  closeBtn: {
    width: 16,
    height: 16
  },
  stepTitleTxt: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ff893a'
  },
  bindCardBtn: {
    width: '100%',
    height: 48,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#ff9343'
  },
  bindCardBtnTxt: {
    fontSize: 14,
    color: '#fff'
  },
  stepContainer: { width: 252, alignSelf: 'center' },
  stepContent: { paddingLeft: 10 },
  firstStep: { position: 'relative', height: 30 },
  StepTitle: {
    position: 'absolute',
    top: 5,
    left: 15,
    color: '#ff893a',
    fontSize: 11
  },
  StepRadius: {
    position: 'absolute',
    backgroundColor: '#ff893a',
    width: 6,
    height: 6,
    borderRadius: 3,
    left: 5,
    top: 9
  },
  StepLine: {
    position: 'absolute',
    backgroundColor: '#ff893a',
    width: 0.2,
    height: '100%',
    left: 8,
    top: 0
  },
  StepTitle2: {
    position: 'absolute',
    top: 20,
    left: 15,
    color: '#ff893a',
    fontSize: 11
  },
  secondStep: { position: 'relative', height: 45 },
  remark: {
    width: 252,
    marginTop: 4,
    marginBottom: 26,
    paddingLeft: 10,
    alignSelf: 'center'
  },
  remarkTxt: {
    fontSize: 11,
    lineHeight: 20,
    color: '#000'
  }
});

export default RegisterPopComponent;
