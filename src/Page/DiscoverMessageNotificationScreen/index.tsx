import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { observable, flow, action } from 'mobx';
import { observer } from 'mobx-react';
import QNHeader from '../../Components/QNHeader';
import QNRefreshModel from '../../Components/QNRefreshModel';
import Touch from '../../Components/QNTouch';
import style from './assets/style';
import { fetchPersonGreat, fetchLookComment } from '~apis';
import { pxToDp } from '~utils';
import MyPlaceholder from './components/my-placeholder';

class UIState {
  @observable
  list = {
    data: [],
    isLast: false,
    pageIndex: 1
  };

  @observable
  type = 1; // 0 update 1 load

  @observable
  isReady = false;

  @action
  setPageIndex(pageIndex) {
    this.list.pageIndex = pageIndex;
  }

  @action
  setType(type) {
    this.type = type;
  }

  // FLOW
  updateList = flow(function*() {
    const curList = this.list;
    const data = yield fetchPersonGreat({
      page: curList.pageIndex,
      pageSize: 7
    });

    if (data) {
      const { allPage, greatList } = data;
      let list = curList.data;
      let pageIndex = curList.pageIndex;

      if (!this.isReady) this.isReady = true;

      if (this.type === 0) {
        list = [...greatList, ...list.slice(7)];
      } else {
        list = [...list, ...greatList];
      }
      this.list = {
        data: list,
        pageIndex,
        isLast: pageIndex >= allPage
      };
    }
  });
}

let uiState;
@observer
export default class extends React.Component {
  constructor(props) {
    super(props);
    uiState = new UIState();
  }

  _renderFooter = () => {
    return (
      <View style={style.moreWrapper}>
        <View style={style.moreLine} />
        <Text style={style.moreText}>没有更多消息通知了哦！</Text>
        <View style={style.moreLine} />
      </View>
    );
  };

  _renderRow = item => {
    return (
      <Touch
        style={style.commentItemWrapper}
        onPress={async () => {
          if (item.isGreat > 0) {
            return;
          }
          await fetchLookComment(item.id);
          this.props.navigation.navigate('CommentDetail', {
            id: item.id
          });
        }}>
        <View style={style.commentItemLeft}>
          <View style={style.commentItemImage}>
            {item.headPicture ? (
              <Image
                source={{ uri: item.headPicture || '' }}
                style={style.headPicture}
              />
            ) : null}
          </View>
          <View style={style.commentItemMiddle}>
            <Text style={style.commentItemMiddleTitle}>{item.name}</Text>
            {item.isGreat > 0 ? (
              <Image
                source={require('./assets/images/like.png')}
                style={style.likeIcon}
              />
            ) : (
              <Text style={style.commentItemMiddleContent}>{item.content}</Text>
            )}
            <Text style={style.commentItemMiddleTime}>{item.time}</Text>
          </View>
        </View>
        <View style={style.commentItemRight}>
          <Text style={style.commentItemRightContent}>{item.answer}</Text>
        </View>
      </Touch>
    );
  };

  _loadMore = item => {
    uiState.setType(1);
    uiState.setPageIndex(uiState.list.pageIndex + 1);
    return uiState.updateList();
  };

  _updateList = () => {
    uiState.setType(0);
    uiState.setPageIndex(1);
    return uiState.updateList();
  };

  // 生命周期
  componentDidMount() {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      uiState.updateList();
    }, 500);
  }

  render() {
    const { _renderFooter, _renderRow, _updateList, _loadMore } = this;
    const curList = uiState.list;
    return (
      <View style={style.wrapper}>
        <QNHeader title="消息通知" backIcon />
        <MyPlaceholder onReady={uiState.isReady} lineNumber={6}>
          <QNRefreshModel
            list
            defaultPageType={1}
            dataSource={curList.data}
            renderFooter={_renderFooter}
            heightForIndexPath={pxToDp(190)}
            renderRow={_renderRow}
            isLast={curList.isLast}
            loadMore={_loadMore}
            onRefresh={_updateList}
          />
        </MyPlaceholder>
      </View>
    );
  }
}
