import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, Image, FlatList, Platform } from 'react-native';
import style from './assets/style';
import { toJS } from 'mobx';
import { sleep } from '~utils';
import LSRefresher from './components/LSRefresher';
import { BallIndicator } from 'react-native-indicators';
import { ScrollView } from 'react-native-mjrefresh';
// import { ScrollableTabView } from '~components/ScrollTabView';

type Props = {
  defaultPageType?: number;
  list?: boolean;
  view?: boolean;
  onRefresh: Function;
  renderFooter?: Function;
  dataSource?: Array<Object>;
  renderRow?: Function;
  loadMore?: Function;
  isLast?: boolean;
  scrollableTabView?: Object;
  tabLabel?: string;
};

class QNRefreshModel extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  state = {
    height: 0,
    isLoading: false
  };

  _scrollView;
  _pageX;
  _pageY;

  static defaultProps = {
    list: false,
    view: false
  };

  // propType
  static propTypes = {
    defaultPageType: PropTypes.number, // 1 2
    list: PropTypes.bool, // 表示使用refresh_list
    view: PropTypes.bool, // 表示使用refresh_view
    onRefresh: PropTypes.func, // 下拉刷新的列表
    // 使用list要传入的参数
    renderFooter: PropTypes.func,
    dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    renderRow: PropTypes.func,
    loadMore: PropTypes.func,
    isLast: PropTypes.bool,
    scrollableTabView: PropTypes.object
  };

  _renderEmpty = () => {
    const type = this.props.defaultPageType;
    return (
      <View
        style={[
          style.contentContainer,
          {
            height: this.state.height
          }
        ]}>
        <Image
          style={style.emptyImageBox}
          source={
            type === 1
              ? require('./assets/images/empty1.png')
              : type === 2
                ? require('./assets/images/empty2.png')
                : require('./assets/images/empty3.png')
          }
        />
      </View>
    );
  };

  // 刷新
  _onRefresh = async () => {
    const {
      _scrollView,
      props: { onRefresh }
    } = this;
    if (onRefresh) {
      _scrollView.beginRefresh();
      await sleep(500);
      await onRefresh();
      _scrollView.endRefresh();
    }
  };

  // 局部变量
  _isScroll;
  _isLoading;

  // 加载
  _onLoadMore = async () => {
    const {
      props: { loadMore, isLast, list },
      state: { isLoading },
      _isLoading,
      _isScroll
    } = this;

    if (isLast || isLoading || _isLoading || (list && !_isScroll)) {
      return;
    }

    this.setState({
      isLoading: true
    });
    await sleep(300);
    await loadMore();
    this.setState({
      isLoading: false
    });
  };

  // List视图
  _renderList = () => {
    let {
      props: { dataSource, renderRow, onRefresh, scrollableTabView },
      _renderEmpty,
      _onLoadMore,
      _renderFooter
    } = this;

    dataSource = toJS(dataSource);

    return (
      <FlatList
        onLayout={({
          nativeEvent: {
            layout: { height }
          }
        }) => {
          if (this.state.height < height) {
            this.setState({ height });
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        data={dataSource}
        renderItem={({ item, index }) => renderRow(item, index)}
        ListFooterComponent={_renderFooter}
        ListEmptyComponent={_renderEmpty}
        onEndReached={info => _onLoadMore(info)}
        onEndReachedThreshold={Platform.OS === 'ios' ? -0.2 : 0.2}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onTouchStart={e => {
          this._pageX = e.nativeEvent.pageX;
          this._pageY = e.nativeEvent.pageY;
        }}
        onTouchMove={e => {
          if (
            Math.abs(this._pageY - e.nativeEvent.pageY) >
            Math.abs(this._pageX - e.nativeEvent.pageX)
          ) {
            console.log('zy', scrollableTabView);
            // 下拉 禁用左右滑动
            // scrollableTabView && scrollableTabView.setNativeProps(false);
          } else {
            console.log('sx', scrollableTabView);
            // 左右滑动 打开左右滑动
            // scrollableTabView && scrollableTabView.setNativeProps(true);
          }
        }}
        onScrollBeginDrag={() => {
          this._isScroll = true;
        }}
        onScrollEndDrag={() => {
          this._isScroll = false;
        }}
        onMomentumScrollBegin={() => {
          this._isScroll = true;
        }}
        onMomentumScrollEnd={() => {
          this._isScroll = false;
        }}
        renderScrollComponent={props => (
          <ScrollView
            style={style.wrap}
            refreshControl={<LSRefresher onRefresh={onRefresh} />}
            {...props}
          />
        )}
      />
    );
  };

  _renderFooter = () => {
    const {
      props: { isLast, renderFooter, dataSource, list },
      state: { isLoading }
    } = this;

    if (list && toJS(dataSource).length === 0) {
      return null;
    }

    if (isLast) {
      return <View style={style.footerBox}>{renderFooter()}</View>;
    }

    return (
      (isLoading && (
        <View style={style.container}>
          <BallIndicator size={20} color="#FFAD2C" />
        </View>
      )) ||
      null
    );
  };

  _onScroll = e => {
    const {
      props: { loadMore },
      _onLoadMore
    } = this;
    const scrollY =
      e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY + 10 >= scrollY) {
      loadMore && _onLoadMore();
    }
  };
  // View
  _renderView = () => {
    const {
      props: { children, onRefresh, renderFooter },
      _renderEmpty,
      _onScroll,
      _renderFooter
    } = this;

    return (
      <ScrollView
        style={style.wrap}
        onScroll={_onScroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={<LSRefresher onRefresh={onRefresh} />}>
        {children ? <View style={style.wrap}>{children}</View> : _renderEmpty()}
        {(children && renderFooter && _renderFooter()) || null}
      </ScrollView>
    );
  };

  render() {
    const {
      props: { view, list },
      _renderView,
      _renderList
    } = this;

    return (
      <View style={style.wrap}>
        {view ? _renderView() : list ? _renderList() : null}
      </View>
    );
  }
}

export default QNRefreshModel;
