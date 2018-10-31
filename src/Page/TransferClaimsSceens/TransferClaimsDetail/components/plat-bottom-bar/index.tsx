import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
// import { ManageFinancialImpl } from '../../shared/detail.model';
import { pxToDp, serviceUrl } from '~utils';
import { fetchUserInfo } from '~apis';
import { withNavigation } from 'react-navigation';

type Props = {
  // 平台id
  id: number;
};

@inject('ManageFinancialStore')
@inject('RootStore')
@observer
class PlatBottomBarComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasbank: 1
    };
  }

  public render() {
    return (
      <View style={styles.platBottomBar}>
        <TouchableWithoutFeedback
          onPress={() => {
            // this.props.navigation.navigate('CustomerService');
            this.props.navigation.navigate('HomeWebview', {
              url: serviceUrl
            });
          }}>
          <View style={styles.askBtn}>
            <View style={styles.askBtnView}>
              <Image
                source={require('../../assets/images/custom-service.png')}
                style={styles.askBtnIcon}
              />
              <Text style={styles.askBtnTxt}>咨询客服</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.handleModalShow();
          }}>
          <View style={styles.jumpBtn}>
            <Text style={styles.barBtnTxt}>立即承接</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  async hasBankDo() {
    const { hasbank } = await fetchUserInfo();
    return !hasbank;
  }

  async goFillReceiptForm() {
    if (this.props.RootStore.isLogin) {
      let isBankCard = await this.hasBankDo();
      console.log(isBankCard, 'isBankCardisBankCardisBankCard');
      if (isBankCard) {
        this.props.navigation.navigate('FillReceiptForm', {
          platformID: this.props.id,
          isEdit: 1
        });
      } else {
        this.props.navigation.navigate('Account');
      }
    } else {
      this.goLogin();
    }
  }
  handleModalShow() {
    if (this.props.RootStore.isLogin) {
      this.props.ManageFinancialStore.setModalARegister(true);
    } else {
      this.goLogin();
    }
  }

  goLogin() {
    this.props.navigation.navigate('Login');
  }
}

const styles = StyleSheet.create({
  platBottomBar: {
    height: pxToDp(88),
    flexDirection: 'row'
  },
  askBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: pxToDp(5)
  },
  askBtnIcon: {
    width: pxToDp(30),
    height: pxToDp(36)
  },
  askBtn: {
    width: `${((750 - 558) / 750) * 100}%`,
    height: pxToDp(88),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA'
  },
  submitBtn: {
    width: '39%',
    height: pxToDp(88),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#384269'
  },
  askBtnTxt: {
    marginTop: pxToDp(5),
    fontSize: pxToDp(18)
  },
  barBtnTxt: {
    color: '#fff',
    fontSize: 14
  },
  jumpBtn: {
    width: `${(558 / 750) * 100}%`,
    height: pxToDp(88),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFAD2C'
  }
});

export default withNavigation(PlatBottomBarComponent);
