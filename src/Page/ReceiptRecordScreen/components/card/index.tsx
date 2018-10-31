import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Tocuhable from '~components/Touchable';
import styles from './styles';
import Picker from 'react-native-picker';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleCardClick = data => {
    Picker.isPickerShow(status => {
      if (status) {
        Picker.hide();
      }
    });
    this.props.navigation.navigate('ReceiptRecordDetail', { id: data.id });
  };
  _handleEditClick = data => {
    Picker.isPickerShow(status => {
      if (status) {
        Picker.hide();
      }
    });
    this.props.onEditPress(data);
  };
  _handleDelClick = data => {
    Picker.isPickerShow(status => {
      if (status) {
        Picker.hide();
      }
    });
    this.props.onDelPress(data);
  };
  _handleMoreClick = () => {
    this.props.navigation.navigate('ManageFinancial');
  };
  _renderStatusImg = status => {
    if (status === '已审核') {
      return (
        <Image
          style={styles.statusIcon}
          source={require('../../assets/images/hasCheck.png')}
        />
      );
    } else if (status === '待审核' || status === '审核中') {
      return (
        <Image
          style={styles.statusIcon}
          source={require('../../assets/images/waitCheck.png')}
        />
      );
    } else if (status === '已驳回') {
      return (
        <Image
          style={styles.statusIcon}
          source={require('../../assets/images/hasReject.png')}
        />
      );
    }
  };
  _renderRejectReason = data => {
    if (data.objectState === '已驳回') {
      return (
        <Text style={styles.introText}>
          驳回原因：
          {data.rejectReason}
        </Text>
      );
    } else {
      return (
        <Text style={styles.introText}>
          预计时间：
          {data.expectedTimeString}
        </Text>
      );
    }
  };
  _renderStatusButton = data => {
    if (data.objectState === '已驳回') {
      return (
        <View style={styles.btnWrapper}>
          <Tocuhable
            style={[styles.btnContainer, styles.delBtnContainer]}
            onPress={() => this._handleDelClick(data)}>
            <Text style={[styles.btnText, styles.delBtnText]}>删除</Text>
          </Tocuhable>
          <Tocuhable
            style={styles.btnContainer}
            onPress={() => this._handleEditClick(data)}>
            <Text style={styles.btnText}>编辑</Text>
          </Tocuhable>
        </View>
      );
    } else if (data.objectState === '已审核') {
      return (
        <View style={styles.btnWrapper}>
          <Tocuhable
            style={styles.btnContainer}
            onPress={this._handleMoreClick}>
            <Text style={styles.btnText}>更多</Text>
          </Tocuhable>
        </View>
      );
    }
  };
  render() {
    const { data } = this.props;
    return (
      <Tocuhable
        style={styles.container}
        onPress={() => this._handleCardClick(data)}>
        <View style={styles.cardTop}>
          <Image style={styles.cardLogo} source={{ uri: data.platformLogo }} />
          <View style={styles.investContainer}>
            <Text style={styles.moneyNumer}>{data.investmentMoney}</Text>
            <Text style={styles.moneyText}>投资金额</Text>
          </View>
          <View style={styles.rebateContainer}>
            <Text style={styles.moneyNumer}>{data.maxReturnMoney}</Text>
            <Text style={styles.moneyText}>返利金额</Text>
          </View>
          {this._renderStatusImg(data.objectState)}
        </View>
        <View style={styles.cardSeparator} />
        <View style={styles.cardBottom}>
          <View style={styles.cardIntro}>
            <Text style={styles.introText}>
              提交时间：
              {data.submissionTime}
            </Text>
            {this._renderRejectReason(data)}
          </View>
          {this._renderStatusButton(data)}
        </View>
      </Tocuhable>
    );
  }
}
export default withNavigation(Card);
