import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { observable, flow, toJS } from 'mobx';
import QNRefreshModel from '~components/QNRefreshModel'
import QNHeader from '~components/QNHeader'
import {
  View, Text, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native'
import Placeholder from 'rn-placeholder'
import MyPlaceholder from '../Components/MyPlaceholder'
import BottomInput from '../Components/BottomInput'
import CommentItem from '../Components/CommentItem'
import styles from '../assets/styles'
import {pxToDp} from "~utils"


@inject('RootStore')
@inject('NewsListStore')
@observer class CommentDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })
  constructor(props) {
    super(props)
  }
  state = {
    isReady: false
  }
  _doGreat = () => {
    let {
      beReply
    } = this.props.NewsListStore
    this.props.NewsListStore.doGreat({
      commentID: beReply.id,
      articleID: 0,
      comment: beReply.content,
      pid: beReply.pid
    }).then(data => {
      if(data === 1) {
        beReply = {
          ...beReply,
          greatYesOrNot: true,
          greatNum: beReply.greatNum + 1
        }
        this.props.NewsListStore.setBeReply(beReply)
      }
    })
  }
  _getCommentDetail = async () => {
    this.setState({
      isReady: false
    })
    const id = this.props.navigation.getParam('id')
    const data = await this.props.NewsListStore.loadCommentDetail({
      commentID: id
    })
    this.setState({
      isReady: true
    })
  }
  _onRefresh = async() => {
    const id = this.props.navigation.getParam('id')
    const data = await this.props.NewsListStore.loadCommentDetail({
      commentID: id
    })
  }
  componentWillMount() {
    this._getCommentDetail()
  }
  componentWillUnmount() {
    this.props.NewsListStore.setFocus(false)
  }
  public render() {
    const {
      beReply
    } = this.props.NewsListStore
    const { isReady } = this.state
    return (
      <KeyboardAvoidingView
        style={[styles.wrap, {backgroundColor: '#fff'}]}>
        <QNHeader title={'评论详情'} backIcon/>
        <QNRefreshModel
          view
          onRefresh={this._onRefresh}
        >
          {
            !isReady ? (
              <MyPlaceholder lineNumber={1}/>
            ) : (
              <CommentItem
                item={beReply}
                index={0}
                arr={[beReply]}
                doGreat={this._doGreat}
                showAll={true}
              />
            )
          }
        </QNRefreshModel>
        <BottomInput/>
      </KeyboardAvoidingView>
    )
  }
}

export default CommentDetailScreen