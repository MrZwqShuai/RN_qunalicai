import * as React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { deviceHeight, deviceWidth, pxToDp } from '~utils';
import QNTab from './tab';
import QNTabBar from './tab-bar';
import style from '~components/QNHeader/assets/style';

type Props = {
  tabBarPosition: string;
  tabBarHeight: number;
  tabBarWidth: number;
  onChangeTab: (currentTab?: number) => void;
  columLayout?: boolean;
  tabBarRight?: JSX.Element;
  angle?: number
};

const wrapStyle = {
  flex: 1
};
export default class QNTabs extends React.Component<Props> {
  static defaultProps = {
    tabBarPosition: 'top',
    tabBarHeight: pxToDp(111),
    tabBarWidth: Dimensions.get('window').width,
    onChangeTab: () => {},
    columLayout: false,
    tabBarRight: null,
    angle: 10
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      currentTab: 0,
      goToPage: (page: number): void => {
        let screenWidth = Dimensions.get('window').width;
        if (this.state.currentTab === page) {
          return;
        }
        this.setState({
          currentTab: page
        });
        this.props.onChangeTab(page);
        let scrollTimer = setTimeout(() => {
          this._scrollView.scrollTo({ x: screenWidth * page });
          clearTimeout(scrollTimer)
        }, 1);
      },
      onTabContainerLayout: e => {
        let width = e.nativeEvent.layout.width;
        this.setState({
          containerWidth: width
        });
      },
      scrollEnabled: false,
      scrollLeftVal: 0,
    };
  }

  public render() {
    let tabBarProps = {
      tabs: this._children().map(child => {
        return child.props.heading;
      }),
      tabBarHeight: { height: this.props.tabBarHeight },
      tabStyle: this._children().map(child => child.props.tabStyle),
      activeTabStyle: this._children().map(child => child.props.activeTabStyle),
      textStyle: this._children().map(child => child.props.textStyle),
      activeTextStyle: this._children().map(
        child => child.props.activeTextStyle
      ),
      columLayout: this.props.columLayout,
      tabBarRight: this.props.tabBarRight,
      currentTab: this.state.currentTab,
      goToPage: this.state.goToPage,
      onTabContainerLayout: this.state.onTabContainerLayout,
      scrollLeftVal: this.state.scrollLeftVal
    };
    return (
      <View style={wrapStyle}>
        {this.props.tabBarPosition === 'top' && this.renderTabBar(tabBarProps)}
        {this.renderScrollContent()}
        {this.props.tabBarPosition === 'bottom' &&
          this.renderTabBar(tabBarProps)}
      </View>
    );
  }

  public renderTabBar(props) {
    return <QNTabBar {...props} />;
  }

  public renderScrollContent() {
    const scrollScenes = this.createScrollScenes();
    return (
      <ScrollView
        ref={ref => {
          this._scrollView = ref;
        }}
        style={wrapStyle}
        horizontal
        alwaysBounceVertical={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        pagingEnabled
        scrollEnabled={this.state.scrollEnabled}
        onScroll={this._onScroll}
        onTouchStart={scroll => {
          this._onTouchStart(scroll);
        }}
        onTouchMove={scroll => {
          this._onTouchMove(scroll);
        }}
        onMomentumScrollEnd={e => {
          this.handleScrollEnd(e);
        }}
        onScrollBeginDrag={(e) => {this._test(e)}}
        >
        {scrollScenes}
      </ScrollView>
    );
  }

  public createScrollScenes() {
    const { columLayout } = this.props;
    return this._children().map((child, index) => {
      return (
        <View
          key={index}
          style={{
            width: columLayout
              ? Dimensions.get('window').width
              : this.state.containerWidth,
            ...wrapStyle
          }}>
          {child}
        </View>
      );
    });
  }

  public _children(children = this.props.children) {
    return React.Children.map(children, child => child);
  }

  public handleScrollEnd(scroll) {
    let screenWidth = Dimensions.get('window').width;
    let currentTab = Math.round(
      scroll.nativeEvent.contentOffset.x / screenWidth
    );
    let canClearPage = this.isCurrentTabChange(currentTab);
    this.setState({
      currentTab: currentTab
    });
    if (canClearPage) {
      this.props.onChangeTab(currentTab);
    }
  }

  public _test(e) {
    console.log(e, '哈哈哈哈哈')
  }

  public isCurrentTabChange(currentTab: number) {
    return this.state.currentTab !== currentTab;
  }

  private _onScroll(scroll) {
    // console.log(
    //   scroll.nativeEvent.contentOffset.x,
    //   scroll.nativeEvent.contentOffset.y,
    //   'touch事件'
    // );
  }

  private _onTouchStart(scroll) {
    this.setState({
      pageX: scroll.nativeEvent.pageX,
      pageY: scroll.nativeEvent.pageY
    });
  }

  private _onTouchMove(scroll) {
    let tanRadian = Math.abs(scroll.nativeEvent.pageY-this.state.pageY) / Math.abs(scroll.nativeEvent.pageX-this.state.pageX);
    // console.log(this.getAngle(tanRadian), '角度')
    console.log(Math.abs(scroll.nativeEvent.pageX-this.state.pageX), Math.abs(scroll.nativeEvent.pageY-this.state.pageY), 'touchmove事件');
    this.setState({
      scrollLeftVal: Math.abs(scroll.nativeEvent.pageY-this.state.pageY)
    })
    // 如果手势小于20度就左右滑动
    if(this.getAngle(tanRadian) < this.props.angle) {
      this.setState({
        scrollEnabled: true
      });
    } else {
      this.setState({
        scrollEnabled: false
      });
    }
  }

  private getAngle(a) {
    // 计算y/x的弧度
    let radian = Math.atan(a);
    // 弧度换算角度
    return Math.floor(180/(Math.PI/radian));
  }

  private tabScrollTo(page: number) {
    this.state.goToPage(page);
  }
}
