import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  Keyboard,
  Platform
} from 'react-native';
import { Button, Text as NativeText } from 'native-base';
import Toast from '~components/NewToast';
import { withNavigation } from 'react-navigation';
import { BoxShadow } from 'react-native-shadow';
import * as Animatable from 'react-native-animatable';
import MyTextInput from '../MyTextInput';
import styles from '../../assets/styles';
import { pxToDp, isIphoneX } from '~utils';

@inject('RootStore')
@inject('NewsListStore')
@observer
class BottomInput extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    inputText: ''
  };
  _shadowOpt = () => ({
    width: Dimensions.get('window').width,
    height: 1,
    color: '#666',
    border: 1,
    opacity: 0.1,
    x: 0,
    y: 0
  });
  _changeText = text => {
    this.setState({
      inputText: text
    });
  };
  _onPress = () => {
    const { beReply, curBeReply } = this.props.NewsListStore;
    this.props.NewsListStore.doComment({
      articleID: beReply ? 0 : this.props.NewsListStore.getNewsDetail.id,
      answer: beReply ? (curBeReply ? curBeReply.content : beReply.content) : '',
      content: this.state.inputText,
      pid: beReply ? beReply.id : 0,
      refferID: beReply ? (curBeReply ? curBeReply.uid : 0) : 0
    }).then(data => {
      const { routeName } = this.props.navigation.state;
      if (data) {
        if (routeName === 'CommentDetail') {
          this.props.NewsListStore.loadCommentDetail({
            commentID: beReply.id
          });
        } else {
          this.props.NewsListStore.setCommentParams('page', 1);
          this.props.NewsListStore.loadCommentList();
        }
        this.setState({
          inputText: ''
        });
        Toast.show('回复成功！');
        setTimeout(() => {
          Keyboard.dismiss();
        }, 1500);
      }
    });
  };
  _cancleReply = () => {
    const { routeName } = this.props.navigation.state;
    if (routeName === 'CommentList') {
      this.props.NewsListStore.setBeReply(null);
      this.props.NewsListStore.setInputPlaceholder('我来说两句');
    } else if (routeName === 'CommentDetail') {
      // 当状态为评论详情页面时
      this.props.NewsListStore.setCurBeReply(null);
    }
    this.setState({ inputText: '' });
  };
  _onFocus = () => {
    // 未登录评论直接跳转到登录页面
    if (!this.props.RootStore.isLogin) {
      Keyboard.dismiss();
      this.props.navigation.navigate('Login');
    }
    if (Platform.OS === 'ios') {
      this._bottomInput.setNativeProps({
        paddingBottom: isIphoneX() ? pxToDp(100) : pxToDp(60)
      });
    }
  };
  _onBlur = () => {
    this._bottomInput.setNativeProps({
      paddingBottom: pxToDp(10)
    });
  };
  _didBlur = () => {
    this.props.navigation.addListener('didBlur', payload => {
      const { routeName } = this.props.navigation.state;
      if (routeName === 'CommentDetail') {
        this.props.NewsListStore.setBeReply(null);
        this.props.NewsListStore.setInputPlaceholder('我来说两句');
      }
    });
  };
  componentDidMount() {
    this._didBlur();
  }
  public render() {
    const { inputPlaceholder, beReply, curBeReply } = this.props.NewsListStore;
    const { routeName } = this.props.navigation.state;
    const { OS } = Platform;
    return (
      <KeyboardAvoidingView
        behavior={OS === 'ios' ? 'position' : null}
        style={styles.bottomTools}>
        <BoxShadow setting={this._shadowOpt()} />
        {beReply ? (
          <Animatable.View
            animation={'slideInUp'}
            iterationCount={1}
            direction={'alternate'}
            style={[styles.replyInfo]}>
            <Text>{`正在回复${
              curBeReply
                ? curBeReply.nickName
                : beReply.nickName || beReply.nick_name || ''
            }`}</Text>
            <Button
              transparent
              onPress={this._cancleReply}
              style={styles.buttonStyle}>
              <Text style={styles.buttonText}>
                {curBeReply || routeName === 'CommentList' ? `取消回复` : ''}
              </Text>
            </Button>
          </Animatable.View>
        ) : null}
        <View
          style={[styles.bottomInput]}
          ref={ref => (this._bottomInput = ref)}>
          <MyTextInput
            style={Platform.OS === 'ios' ? styles.textInput : styles.textInputAndroid}
            placeholder={inputPlaceholder}
            placeholderTextColor={'#999'}
            multiline={true}
            blurOnSubmit={true}
            returnKeyType="done"
            underlineColorAndroid="transparent"
            value={this.state.inputText}
            onChangeText={text => this._changeText(text)}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
          />
          <Button
            transparent
            info={this.state.inputText.trim() !== ''}
            disabled={this.state.inputText.trim() === ''}
            onPress={this._onPress}
            style={styles.sendBtn}>
            <NativeText style={styles.sendBtnText}>发送</NativeText>
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default withNavigation(BottomInput);
