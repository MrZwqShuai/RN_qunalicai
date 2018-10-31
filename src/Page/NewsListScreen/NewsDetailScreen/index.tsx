import * as React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Badge, Text, Button } from 'native-base';
import QNHeader from '~components/QNHeader';
import HTML from 'react-native-render-html';
import Placeholder from 'rn-placeholder';
import { newsUrl, pxToDp } from '~utils';
import { fetchShareReward } from '~apis/index';

@inject('RootStore')
@inject('ShareStore')
@inject('NewsListStore')
@observer
class NewsDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor(props) {
    super(props);
  }
  _doGreat = () => {
    const newsDetail = toJS(this.props.NewsListStore.getNewsDetail);
    if (this.props.RootStore.isLogin) {
      this.props.NewsListStore.doGreat({
        commentID: 0,
        articleID: newsDetail.id,
        comment: '',
        pid: 0
      }).then(data => {
        let { greatNum } = this.props.NewsListStore.commentCount;
        if (data === 1) {
          this.props.NewsListStore.setCommentCount({
            ...this.props.NewsListStore.commentCount,
            greatNum: greatNum + 1
          });
        }
      });
    } else {
      this.props.navigation.navigate('Login');
    }
  };
  _goComments = () => {
    if (this.props.RootStore.isLogin) {
      this.props.navigation.navigate('CommentList');
    } else {
      this.props.navigation.navigate('Login');
    }
  };
  _onShare = () => {
    let newsDetail = toJS(this.props.NewsListStore.getNewsDetail);
    let imgUrl = null;
    const { defaultPic } = this.props.NewsListStore;
    if (newsDetail.ImgUrl) {
      newsDetail.ImgUrl = JSON.parse(newsDetail.ImgUrl);
      imgUrl = newsDetail.ImgUrl[0] ? newsDetail.ImgUrl[0].allurl : defaultPic;
    }
    this.props.ShareStore.setShare({
      title: newsDetail.InfoTitle,
      description: newsDetail.InfoTitle,
      picture: imgUrl,
      shareUrl: newsUrl + newsDetail.id
    });
    this.props.ShareStore.toggleShareModel();
    this.props.ShareStore.setCallBack(this.shareSuccess);
  };

  public shareSuccess = async () => {
    let result = await fetchShareReward();
    this.props.ShareStore.resetCallback();
  };

  componentWillMount() {
    const id = this.props.navigation.getParam('id');
    this.props.NewsListStore.loadNewsDetail({
      newsID: id
    });
    this.props.NewsListStore.loadCommentCount({
      articleID: id
    });
  }
  public render() {
    const { isReady } = this.props.NewsListStore;
    const newsDetail = toJS(this.props.NewsListStore.getNewsDetail);
    const { commentNum, greatNum } = toJS(
      this.props.NewsListStore.getCommentCount
    );
    const { width, height } = Dimensions.get('window');
    const richHtml = '';
    const htmlContent = `
      <div style="padding-bottom: 20px">
        ${newsDetail.InfoContent}
      </div>
    `;
    return (
      <View style={styles.wrap}>
        <QNHeader title={'新闻详情'} backIcon />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <Placeholder.Paragraph
            textSize={18}
            animate="fade"
            lineNumber={1}
            lineSpacing={5}
            lastLineWidth={'20%'}
            onReady={isReady}>
            <Text style={styles.infoTitle}>
              {newsDetail && newsDetail.InfoTitle}
            </Text>
          </Placeholder.Paragraph>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Placeholder.Paragraph
              textSize={12}
              animate="fade"
              lineNumber={1}
              onReady={isReady}
              lastLineWidth={'10%'}>
              <Text style={styles.infoTime}>
                {newsDetail && newsDetail.InfoTime}
              </Text>
            </Placeholder.Paragraph>
          </View>
          <Placeholder.Paragraph
            size={60}
            animate="fade"
            lineNumber={4}
            lineSpacing={5}
            lastLineWidth="30%"
            onReady={isReady}>
            <HTML
              style={styles.htmlContent}
              html={htmlContent}
              imagesMaxWidth={width - 30}
            />
          </Placeholder.Paragraph>
        </ScrollView>

        <View style={styles.bottomFix}>
          <Button transparent style={styles.bottomItem} onPress={this._doGreat}>
            <Image
              source={require('./assets/images/r_zan_icon.png')}
              style={[styles.imageIcon]}
            />
            <Badge style={[styles.tipNum]}>
              <Text style={styles.tipText}>{greatNum}</Text>
            </Badge>
          </Button>
          <Button
            transparent
            style={styles.bottomItem}
            onPress={this._goComments}>
            <Image
              source={require('./assets/images/r_comment_icon.png')}
              style={[styles.imageIcon]}
            />
            <Badge style={[styles.tipNum]}>
              <Text style={styles.tipText}>{commentNum}</Text>
            </Badge>
          </Button>
          <Button transparent style={styles.bottomItem} onPress={this._onShare}>
            <Image
              source={require('./assets/images/r_share_icon.png')}
              style={[styles.imageIcon]}
            />
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8'
  },
  htmlContent: {},
  infoTitle: {
    textAlign: 'justify',
    lineHeight: pxToDp(40),
    fontSize: pxToDp(36),
    color: '#333'
  },
  infoTime: {
    fontSize: pxToDp(24),
    color: '#999',
    lineHeight: pxToDp(28),
    marginBottom: pxToDp(12),
    marginTop: pxToDp(20)
  },
  bottomFix: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: pxToDp(24),
    width: '100%',
    height: pxToDp(100),
    backgroundColor: '#fff'
  },
  scrollView: {
    flex: 1,
    width: '100%',
    paddingTop: pxToDp(50),
    paddingLeft: pxToDp(30),
    paddingRight: pxToDp(30),
    backgroundColor: '#fff'
  },
  bottomItem: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20)
  },
  imageIcon: {
    height: pxToDp(40),
    width: pxToDp(42),
    marginTop: pxToDp(16),
    resizeMode: 'contain'
  },
  tipNum: {
    position: 'absolute',
    top: pxToDp(16),
    right: 0,
    height: pxToDp(26),
    paddingRight: pxToDp(4),
    paddingLeft: pxToDp(4),
    backgroundColor: '#ff5100'
  },
  tipText: {
    textAlign: 'center',
    lineHeight: Platform.OS === 'android' ? pxToDp(26) : pxToDp(18),
    fontSize: pxToDp(20),
    height: '100%',
    color: '#fff'
  }
});

export default NewsDetailScreen;
