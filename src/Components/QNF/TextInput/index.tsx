import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import Touch from '../../QNTouch';
import style from './assets/style';
import iconConfig from './shared/icon.config';
import CNTextInput from './components/text-input';
import Picker from 'react-native-picker';
const Icon = props => {
  const icon = iconConfig[props.type];
  return (
    <Image
      source={icon.src}
      resizeMode="contain"
      style={[
        {
          width: icon.width,
          height: icon.height
        },
        props.style
      ]}
    />
  );
};

export default class extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this._keyCount = 0;
    this.state = {
      isSecure: true,
      isSendCode: false,
      count: 60,
      isShowRemove: false,
      textValue: props.value || ''
    };
  }

  static propTypes = {
    type: PropTypes.string,
    iconType: PropTypes.string,
    placeholder: PropTypes.string,
    onSendCode: PropTypes.func,
    keyboardType: PropTypes.string,
    maxLength: PropTypes.number,
    allowCN: PropTypes.bool // 允许中文
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        textValue: nextProps.value
      });
    }
  }

  _keyArray = [];
  _keyCount;
  _keyValue;
  _onChangeText = v => {
    const {
      state: { isShowRemove },
      props: { onChangeText },
      _keyValue,
      _keyCount
    } = this;

    /**
     *  这一部分主要用来处理ios password的TextInput失去焦点的BUG
     */
    if (_keyCount === 2) {
      if (this._keyArray.every(item => item === 'Backspace')) {
        this.setState(({ textValue }) => {
          return {
            isShowRemove: textValue.length > 1,
            textValue: textValue.slice(0, textValue.length - 1)
          };
        });
      }
      this._keyArray = [];
      this._keyCount = 0;
      return;
    }
    if (v || _keyValue === 'Backspace') {
      if (!isShowRemove || _keyValue === 'Backspace') {
        this.setState({
          isShowRemove: !!v
        });
      }
      this.setState(({ textValue }) => {
        return {
          textValue:
            v.length > 1 || _keyValue === 'Backspace' ? v : textValue + v
        };
      });
      this._keyCount = 0;
      this._keyArray = [];
      if (onChangeText) {
        onChangeText(v);
      }
    }
  };

  // 清除
  _handleRemoveText = () => {
    const onChangeText = this.props.onChangeText;
    this.setState({
      isShowRemove: false,
      textValue: ''
    });
    if (onChangeText) {
      onChangeText('');
    }
  };

  // 安全
  _renderSecureIcon = () => {
    return (
      <Touch
        onPress={() => {
          this.setState(({ isSecure }) => ({
            isSecure: !isSecure
          }));
        }}>
        {this.state.isSecure ? (
          <Icon type="secure" style={style.secureBox} />
        ) : (
          <Icon type="unsecure" style={style.secureBox} />
        )}
      </Touch>
    );
  };

  // 验证码
  bootCountDown = () => {
    let timer;
    const circle = () => {
      timer = setTimeout(() => {
        if (this.state.count > 0) {
          this.setState({
            count: this.state.count - 1
          });
          circle();
        } else {
          clearTimeout(timer);
          this.setState({
            isSendCode: false,
            count: 60
          });
        }
      }, 1000);
    };
    this.setState({
      isSendCode: true
    });
    circle();
  };

  _handleSendCode = () => {
    const onSendCode = this.props.onSendCode;
    if (onSendCode) {
      onSendCode();
    }
  };

  _renderVerifyCode = () => {
    if (this.state.isSendCode) {
      return (
        <View style={style.codeBox}>
          <Text style={style.activeText}>
            {this.state.count}
            秒重新获取
          </Text>
        </View>
      );
    }
    return (
      <View style={style.codeBox}>
        <Touch onPress={this._handleSendCode}>
          <Text style={style.inActiveText}>获取验证码</Text>
        </Touch>
      </View>
    );
  };
  _onFocus = () => {
    Picker.isPickerShow(status => {
      if (status) {
        Picker.hide();
      }
    });
  };
  render() {
    const {
      state: { isShowRemove, textValue, isSecure },
      props: {
        maxLength,
        iconType,
        placeholder,
        type,
        containerStyle,
        inputStyle,
        keyboardType,
        allowCN
      },
      _onChangeText,
      _handleRemoveText,
      _renderSecureIcon,
      _renderVerifyCode,
      _onFocus
    } = this;
    const reg = /[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]|[\u4e00-\u9fa5]/g;
    return (
      <View style={[style.container, containerStyle]}>
        {(iconType && (
          <View style={style.iconBox}>
            <Icon type={iconType} />
          </View>
        )) ||
          null}
        {allowCN ? (
          <CNTextInput
            onKeyPress={({ nativeEvent: { key } }) => {
              this._keyArray.push(key);
              this._keyCount += 1;
              this._keyValue = key;
            }}
            onFocus={_onFocus}
            keyboardType={keyboardType}
            secureTextEntry={type === 'password' && isSecure}
            placeholder={placeholder}
            style={[style.textInput, inputStyle]}
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(170,179,192,1)"
            onChangeText={v => _onChangeText(v)}
            defaultValue={
              type === 'password' ? textValue.replace(reg, '') : textValue
            }
            maxLength={maxLength}
          />
        ) : (
          <TextInput
            onKeyPress={({ nativeEvent: { key } }) => {
              this._keyArray.push(key);
              this._keyCount += 1;
              this._keyValue = key;
            }}
            onFocus={_onFocus}
            keyboardType={keyboardType}
            secureTextEntry={type === 'password' && isSecure}
            placeholder={placeholder}
            style={[style.textInput, inputStyle]}
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(170,179,192,1)"
            onChangeText={v => _onChangeText(v)}
            defaultValue={
              type === 'password' ? textValue.replace(reg, '') : textValue
            }
            maxLength={maxLength}
          />
        )}

        <View style={style.rightBox}>
          {isShowRemove ? (
            <Touch onPress={_handleRemoveText} style={style.closeIconContainer}>
              <Icon type="close" />
            </Touch>
          ) : null}
          {type === 'password' ? _renderSecureIcon() : null}
          {type === 'verifyCode' ? _renderVerifyCode() : null}
        </View>
      </View>
    );
  }
}
