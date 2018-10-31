import * as React from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ManageFinancialImpl } from '../../shared/detail.model';
import * as RootStore from '~store';


type Props = {
  navigation: any;
  ManageFinancialStore: ManageFinancialImpl;
  // 平台id
  id: number;
}

@inject('ManageFinancialStore')
@inject('RootStore')
@observer
class PlatBottomBarComponent extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.platBottomBar}>
        <View style={styles.submitBtn}>
          <TouchableWithoutFeedback onPress={() => {this.goFillReceiptForm()}}>
            <View>
              <Text style={styles.barBtnTxt}>
                提交投资回单
          </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.jumpBtn}>
          <TouchableWithoutFeedback onPress={() => {this.handleModalShow()}}>
            <View>
              <Text style={styles.barBtnTxt}>
                直达链接
          </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }

  goFillReceiptForm() {
    if(this.props.RootStore.isLogin) {
      this.props.navigation.navigate('FillReceiptForm',{id:this.props.id, isEdit: 1})
    } else {
      this.goLogin();
    }
  }
  handleModalShow() {
    if(this.props.RootStore.isLogin) {
      this.props.ManageFinancialStore.setModalARegister(true)
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
    height: 55,
    flexDirection: 'row',
  },
  submitBtn: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9351',
  },
  barBtnTxt: {
    color: '#fff',
    fontSize: 14,
  },
  jumpBtn: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f45324',
  },
});

export default PlatBottomBarComponent;