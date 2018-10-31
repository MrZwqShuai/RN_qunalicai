import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import {
  View, Text, Image, TouchableOpacity, Clipboard} from 'react-native'
import { Button, Text as NativeText, ActionSheet } from 'native-base'
import Toast from '~components/NewToast'
import { BoxShadow } from 'react-native-shadow'
import { withNavigation } from 'react-navigation'
import { fetchTipOff as ApiTipOff } from '~apis/'
import styles from '../../assets/styles'

const BUTTONS = ['回复', '复制', '举报', '取消']
const CANCEL_INDEX = 3
@inject('NewsListStore')
@observer class CommentItem extends React.Component {
  constructor(props) {
    super(props)
  }
  _handlePressOnComment = (item) => {
    const { routeName } = this.props.navigation.state
    routeName === 'CommentList' && ActionSheet.show({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      title: `${item.nickName}：${item.content}`
    }, (buttonIndex) => this._buttonPress(item, buttonIndex))
  }
  _handlePressOnReply = (item) => {
    const { routeName } = this.props.navigation.state
    routeName === 'CommentDetail' && ActionSheet.show({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      title: `${item.nickName}：${item.content}`
    }, (buttonIndex) => this._buttonPress(item, buttonIndex))
  }
  _buttonPress = (item, index) => {
    switch (index){
      case 0: // 回复该条评论功能
        this._focusInput(item)
        break
      case 1: // 复制评论内容
        this._copy(item.content)
        break
      case 2: // 举报该内容
        this._tipOff(item)
        break
      default: //
    }
  }
  _tipOff = async (item) => {
    const data = await ApiTipOff({
      commentID: item.id
    })
    if(data !== 0) {
      Toast.show('举报成功！')
    }
  }
  _copy = async (str) => {
    await Clipboard.setString(str)
    Toast.show('复制成功！')
  }
  _focusInput = (item) => {
    const { routeName } = this.props.navigation.state
    this.props.NewsListStore.setFocus(true)
    this.props.NewsListStore.setInputPlaceholder('回复...')
    routeName === 'CommentList' ? this.props.NewsListStore.setBeReply(item) : this.props.NewsListStore.setCurBeReply(item)
  }
  _goCommentDetail = (item) => {
    this.props.NewsListStore.setFocus(false)
    this.props.NewsListStore.setInputPlaceholder('回复...')
    this.props.navigation.navigate('CommentDetail', {
      id: item.id
    })
  }
  public render() {
    let {
      item, index, doGreat, arr, showAll
    } = this.props
    let zanStatus = item.greatYesOrNot ?
      require( '../../assets/images/zan_active.png')
      :
      require('../../assets/images/zan.png')
    const { defaultAvatar } = this.props.NewsListStore
    return (
      <View style={[styles.commentItem]} key={index}>
        <View style={styles.avatar}>
          <Image resizeMode='contain' source={{uri: item.headPicture || defaultAvatar}} style={styles.avatarImg}></Image>
        </View>
        <View style={styles.commentContainer}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => this._handlePressOnComment(item)}>
            <View style={styles.commentInfo}>
              <View style={styles.commentBaseInfo}>
                <Text style={styles.nickName}>{item.nickName || item.nick_name}</Text>
                <Text style={styles.commentTime}>{item.contentDate || item.content_date}</Text>
              </View>
              <Button transparent style={styles.commentZan} onPress={() => doGreat(item, index)}>
                <Image source={zanStatus} style={styles.zanIcon}></Image>
                <Text style={styles.zanText}>{item.greatNum || item.greatCount}</Text>
              </Button>
            </View>
            <View style={styles.commentContent}>
              <Text style={[styles.commentContentText, styles.fs14]}>{item.content}</Text>
            </View>
          </TouchableOpacity>
          {
            item.replyList.map((replyItem, index) => {
              return (showAll || (index === 0)) ? (
                <TouchableOpacity activeOpacity={0.6} key={index} onPress={() => this._handlePressOnReply(replyItem)}>
                  <Text style={styles.commentReply}>
                    <Text style={[styles.commentReplier, styles.fs14]}>{replyItem.nickName}</Text>
                    <Text style={[styles.fs14, styles.colorGray93, {paddingRight: 10, paddingLeft: 10}]}> 回复 </Text>
                    <Text>{replyItem.refferNickName}：</Text>
                    <Text
                      style={[styles.color333, styles.fs14, styles.replyContent]}>{replyItem.content}</Text>
                  </Text>
                </TouchableOpacity>
              ) : null
            })
          }
          {
            (!showAll && item.replyList.length) ? (
              <TouchableOpacity activeOpacity={0.6} style={[styles.commentMore]} onPress={() => this._goCommentDetail(item)}>
                <Text style={[styles.fs14, styles.colorC5]}>查看全部{item.replyList.length}条回复</Text>
                <Image source={require('../../assets/images/comment_arrow.png')} style={styles.commentArrow}></Image>
              </TouchableOpacity>
            ) : null
          }
          <View
            style={
              [
                styles.commentLine,
                {backgroundColor: arr.length === (index + 1) ? 'transparent' : '#eaeaea'}
              ]
            }>
          </View>
        </View>
      </View>
    )
  }
}

export default withNavigation(CommentItem)