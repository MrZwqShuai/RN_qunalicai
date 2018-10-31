import * as React from 'react';
import { Text, View, Modal, TouchableHighlight, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import { ManageFinancialImpl } from '~pages/ManageFinancialDetailScreen/shared/detail.model';

type Props = {
  navigation: any;
  ManageFinancialStore: ManageFinancialImpl;
};

@inject('ManageFinancialStore')
@observer
class BindCardPopComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const modalVisible = this.props.ManageFinancialStore.getterShowBindCard;
    return (
      <View>
        <Modal
          animationType={'none'}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert('弹窗已关闭~');
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
                      source={require('./assets/images/b_close.png')}
                      style={styles.closeBtn}
                    />
                  </TouchableHighlight>
                </View>
                <View style={styles.cardPhotoBox}>
                  <Image
                    source={require('./assets/images/card.jpg')}
                    style={styles.cardPhoto}
                  />
                </View>
                <View style={styles.bindCardTip}>
                  <Text style={styles.bindTipTxt}>
                    你还
                    <Text style={styles.noBind}>未绑定</Text>
                    返利的收款银行账户
                  </Text>
                </View>
                <Text style={styles.rebateTip}>每次返利都会到这张卡上哦~</Text>
                <TouchableHighlight
                  onPress={() => {
                    this.goBindCardScreen();
                  }}>
                  <View style={styles.bindCardBtn}>
                    <Text style={styles.bindCardBtnTxt}>前去绑定</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  setModalVisible(visible) {
    this.props.ManageFinancialStore.setModalBindCard(visible);
  }

  goBindCardScreen() {
    this.setModalVisible(false);
    this.props.navigation.navigate('MyCard');
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
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 12
  },
  closeBox: {
    position: 'absolute',
    top: 11,
    right: 11
  },
  closeBtn: {
    width: 16,
    height: 16
  },
  cardPhotoBox: {
    marginTop: 22,
    alignSelf: 'center'
  },
  cardPhoto: {
    width: 134,
    height: 91.3
  },
  bindCardTip: {
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 11
  },
  bindTipTxt: {
    fontSize: 15,
    color: '#000'
  },
  noBind: {
    fontSize: 15,
    color: '#40b2fa'
  },
  rebateTip: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#999'
  },
  bindCardBtn: {
    width: 180,
    height: 44,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 34,
    marginBottom: 34,
    borderRadius: 25,
    backgroundColor: '#ffad2c'
  },
  bindCardBtnTxt: {
    fontSize: 14,
    color: '#fff'
  }
});

export default BindCardPopComponent;
