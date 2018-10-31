import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { View, ScrollView, Image, TouchableOpacity, Alert, Modal, StyleSheet, PixelRatio} from 'react-native'
import { Text } from 'react-native-elements'

@inject('HomeStore')
@observer class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    animationType: 'slide',
    transparent: true,
    dataArray: [],
    props: []
  }
  _closeModal = () => {
    this.props.setModalVisible(false)
  }
  _handleData = () => {
    let labels = ['平台名称', '平台利息', '提交时间', '预计时间', '投资金额', '返利金额', '投资日期', '注册用户名', '注册手机号']
    let props = 'Platform InterestRate SubmissionTime expectedTime InvestmentMoney fanli InvestmentDate InvestmentLimit PlatformUser PhoneNumber'.split(' ')
    let dataArray = props.map((item, i) => {
      return {
        label: labels[i],
        prop: this.props.HomeStore.receiptDetail[props[i]]
      }
    })
    return dataArray
  }
  componentWillMount() {
    this.props.HomeStore.loadReceiptDetail({
      id: this.props.detailId
    })
  }
  render() {
    let modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.8)',
    };
    let innerContainerTransparentStyle = this.state.transparent
      ? { backgroundColor: '#fff', padding: 20 }
      : null;
    let dataArray = this._handleData()
    return (
      <Modal
        animationType={this.state.animationType}
        transparent={this.state.transparent}
        visible={this.props.modalVisible}
        onRequestClose={this._closeModal}>
        <View style={[styles.container, modalBackgroundStyle]}>
          <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
            <Text h4 style={{fontWeight: 'normal', color: '#000'}}>—— 数据详情 ——</Text>
            <View style={styles.tableBox}>
              {
                dataArray.map((item, i, array) => (
                  <View key={i}
                        style={[styles.tableRow,
                          {
                            backgroundColor: (i % 2 === 0) ? 'rgb(247, 247, 247)' : '#fff',
                            borderBottomWidth: (i === array.length - 1) ? 0 : 1
                          }]}>
                    <Text style={[styles.tableLabel, styles.tableText]}>{item.label}</Text>
                    <Text style={[styles.tableContent, styles.tableText]}>{item.prop}</Text>
                  </View>
                ))
              }
            </View>
            <Text
              onPress={this._closeModal }
              style={{fontSize:20,marginTop:10}}>
              我知道了
            </Text>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    padding: 20
  },
  row: {
    alignItems: 'center',

    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },

  page: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  zhifu: {
    height: 150,
  },

  flex: {
    flex: 1,
  },
  station: {
    fontSize: 20
  },
  mp10: {
    marginTop: 5,
  },
  btn: {
    width: 60,
    height: 30,
    borderRadius: 3,
    backgroundColor: '#FFBA27',
    padding: 5,
  },
  btn_text: {
    lineHeight: 18,
    textAlign: 'center',
    color: '#fff',
  },
  tableBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 1,
    borderColor: 'rgb(128, 128, 128)',
    marginTop: 5
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(128, 128, 128)'
  },
  tableLabel: {
    width: 96,
    borderRightColor: 'rgb(128, 128, 128)',
    borderRightWidth: 1
  },
  tableContent: {
    flex: 1,
  },
  tableText: {
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 12,
    color: 'rgb(153, 153, 153)'
  }
})

export default ModalComponent