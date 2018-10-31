import * as React from 'react'
import { inject, observer } from 'mobx-react'
import QNRefreshModel from '../../Components/QNRefreshModel'
import QNHeader from '../../Components/QNHeader'
import { View, Text, FlatList } from "react-native"
import styles from './assets/styles'
import QNNewsItem from '~components/QNNewsItem'
import MyPlaceholder from '~pages/DiscoverScreen/components/my-placeholder';
import { pxToDp } from '~utils'
import {toJS} from "mobx"
import {mainContent} from "~pages/DiscoverScreen/assets/styles"

@inject('NewsListStore')
@observer class NewsListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  constructor(props) {
    super(props)
  }
  state = {
    isReady: false
  }
  _renderFooter = () => (
    <View style={mainContent.moreWrapper}>
      <View style={mainContent.moreLine} />
      <Text style={mainContent.moreText}>没有更多记录了哦！</Text>
      <View style={mainContent.moreLine} />
    </View>
  )
  _loadMore = () => {
    let {
      isLoading,
      isLast
    } = this.props.NewsListStore
    const { page } = toJS(this.props.NewsListStore.params)
    if(!isLast && !isLoading) {
      this.props.NewsListStore.setParams('page', page + 1)
      this.props.NewsListStore.loadNewsList()
    }
  }
  _updataList = () => {
    this.props.NewsListStore.setParams('page', 1)
    this.props.NewsListStore.loadNewsList()
  }
  _renderEmpty = () => (
    <View>
      <Text>暂无新闻数据</Text>
    </View>
  )
  _getNewsList = async () => {
    this.setState({
      isReady: false
    })
    this.props.NewsListStore.setParams('page', 1)
    await this.props.NewsListStore.loadNewsList()
    this.setState({
      isReady: true
    })
  }
  componentWillMount() {
    this._getNewsList()
  }
  public render () {
    let {
      isLast,
      isLoading,
      newsList,
    } = this.props.NewsListStore
    const { isReady } = this.state
    return (
      <View style={styles.wrap}>
        <QNHeader title={'新闻头条'} backIcon/>
        <View style={styles.newsList}>
          {
            isReady ? (
              <QNRefreshModel
                list
                dataSource={newsList}
                defaultPageType={1}
                renderFooter={this._renderFooter}
                renderRow={item => (
                  <View style={{marginRight: 16, marginLeft: 16}}>
                    <QNNewsItem itemData={item}/>
                  </View>
                )}
                heightForIndexPath={pxToDp(200)}
                isLast={isLast}
                loadMore={this._loadMore}
                onRefresh={resolve => this._updataList(resolve)}
              />
            ) : (
              <View style={{marginRight: 16, marginLeft: 16}}>
                <MyPlaceholder
                  lineNumber={8}
                  onReady={isReady}
                >
                </MyPlaceholder>
              </View>
            )
          }
        </View>
      </View>
    )
  }
}

export default NewsListScreen
