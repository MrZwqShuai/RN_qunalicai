import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { validateByType } from '~utils';
import { inject, observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import QNHeader from '~components/QNHeader';
import TextInput from '~components/QNF/TextInput';
import Touch from '~components/QNTouch';
import styles from './assets/style';
import Toast from '~components/NewToast';
@inject('MyInfoStore')
@observer
class ModifyNickNameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: this.props.MyInfoStore.user.nickName
    };
  }
  _renderHeaderRight = () => {
    return (
      <Touch onPress={this._submitModifyName}>
        <Text style={styles.headerRight}>保存</Text>
      </Touch>
    );
  };
  _onChangeText = val => {
    console.log('ti:', val);
    this.setState({
      nickName: val
    });
  };
  _submitModifyName = () => {
    const validateUsername = validateByType('username', this.state.nickName);
    if (!validateUsername.ret) {
      Toast.show(validateUsername.message);
      return false;
    } else if (this.state.nickName != this.props.MyInfoStore.user.nickName) {
      this.props.MyInfoStore.modifyUserInfo('nickName', this.state.nickName);
    }
    this.props.navigation.goBack(null);
  };
  render() {
    const { nickName } = this.state;
    return (
      <View style={styles.wrap}>
        <QNHeader
          title="修改昵称"
          backIcon
          HeaderRight={this._renderHeaderRight}
        />
        <View style={styles.container}>
          <TextInput
            value={nickName}
            maxLength={20}
            onChangeText={val => this._onChangeText(val)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            allowCN
            placeholder="请输入昵称"
          />
          <View style={styles.warn}>
            <Image
              style={styles.warnIcon}
              source={require('./assets/images/warnIcon.png')}
            />
            <Text style={styles.warnText}>
              昵称长度只限中英文和数字，字符长度不超过20
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default withNavigation(ModifyNickNameScreen);
