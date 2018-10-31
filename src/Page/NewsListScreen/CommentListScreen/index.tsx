import * as React from 'react';
import { inject, observer } from 'mobx-react';
import QNRefreshModel from '~components/QNRefreshModel';
import { toJS } from 'mobx';
import QNHeader from '~components/QNHeader';
import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  RefreshControl,
  Platform
} from 'react-native';
import { Button, Text as NativeText, Spinner } from 'native-base';
import BottomInput from '../Components/BottomInput';
import CommentItem from '../Components/CommentItem';
import MyPlaceholder from '../Components/MyPlaceholder';
import { BoxShadow } from 'react-native-shadow';
import styles from '../assets/styles';
import { mainContent } from '~pages/DiscoverScreen/assets/styles';

@inject('RootStore')
@inject('NewsListStore')
@observer
class CommentListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor(props) {
    super(props);
  }
  state = {
    isReady: false,
    loadMore: false
  };
  _doGreat = (item, index) => {
    this.props.NewsListStore.doGreat({
      commentID: item.id,
      articleID: 0,
      comment: item.content,
      pid: item.pid
    }).then(data => {
      if (data === 1) {
        let comment = item.isHot
          ? this.props.NewsListStore.getHotComment
          : this.props.NewsListStore.getRecentComment;
        comment[index] = {
          ...comment[index],
          greatYesOrNot: true,
          greatNum: comment[index].greatNum + 1
        };
        item.isHot
          ? this.props.NewsListStore.setHotComment([...comment])
          : this.props.NewsListStore.setRecentComment([...comment]);
      }
    });
  };
  _loadCommentList = async () => {
    this.props.NewsListStore.setCommentParams('page', 1);
    await this.props.NewsListStore.loadCommentList();
    this.setState({
      isReady: true
    });
  };
  _renderFooter = () => {
    return (
      <View style={mainContent.moreWrapper}>
        <View style={mainContent.moreLine} />
        <Text style={mainContent.moreText}>没有更多评论了哦！</Text>
        <View style={mainContent.moreLine} />
      </View>
    );
  };
  _loadMore = async () => {
    const {
      isLoading,
      isCommentsLast,
      commentParams
    } = this.props.NewsListStore;
    if (!isLoading && !isCommentsLast) {
      this.props.NewsListStore.setCommentParams('page', commentParams.page + 1);
      await this.props.NewsListStore.loadCommentList();
    }
  };
  _cancelBeReply = () => {
    this.props.NewsListStore.setBeReply(null);
  };
  componentWillMount() {
    this._loadCommentList();
  }
  componentWillUnmount() {
    this._cancelBeReply();
  }
  public render() {
    const noComments =
      this.props.NewsListStore.hotComment.length === 0 &&
      this.props.NewsListStore.recentComment.length === 0;
    const { isLoading } = this.props.NewsListStore;
    const { isReady, loadMore } = this.state;
    return (
      <KeyboardAvoidingView
        contentContainerStyle={styles.containerStyle}
        style={styles.contentStyle}>
        <QNHeader title="评论" backIcon />
        {isReady ? (
          <View style={[styles.contentStyle]}>
            {noComments && !isLoading ? (
              <View
                style={[
                  styles.flexCenter,
                  styles.contentStyle,
                  { flexDirection: 'column' }
                ]}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={require('../assets/images/no_comment.png')}
                />
                <Text>暂无评论数据</Text>
              </View>
            ) : (
              <QNRefreshModel
                view
                isLast={this.props.NewsListStore.isCommentsLast}
                onRefresh={this._loadCommentList}
                loadMore={this._loadMore}
                renderFooter={this._renderFooter}>
                {['hotComment', 'recentComment'].map((renderItem, idx) => {
                  return this.props.NewsListStore[renderItem] &&
                    this.props.NewsListStore[renderItem].length ? (
                    <View key={idx}>
                      <View style={[styles.commentTitle]}>
                        <Text style={styles.titleText}>
                          {idx === 0 ? '热门评论' : '最新评论'}
                        </Text>
                      </View>
                      <View style={[styles.recentComments, styles.bgWhite]}>
                        {this.props.NewsListStore[renderItem].map(
                          (item, i, arr) => (
                            <CommentItem
                              item={item}
                              key={i}
                              index={i}
                              arr={arr}
                              doGreat={this._doGreat}
                            />
                          )
                        )}
                      </View>
                    </View>
                  ) : null;
                })}
              </QNRefreshModel>
            )}
          </View>
        ) : (
          <View style={styles.containerStyle}>
            <View style={[styles.commentTitle]}>
              <Text style={styles.titleText}>热门评论</Text>
            </View>
            <View style={[styles.backgroundFFF, styles.paddingBottom20]}>
              <MyPlaceholder lineNumber={1} status={1} />
            </View>
            <View style={[styles.commentTitle]}>
              <Text style={styles.titleText}>热门评论</Text>
            </View>
            <View style={[styles.backgroundFFF, styles.paddingBottom20]}>
              <MyPlaceholder lineNumber={1} status={1} />
            </View>
          </View>
        )}

        <BottomInput />
      </KeyboardAvoidingView>
    );
  }
}

export default CommentListScreen;
