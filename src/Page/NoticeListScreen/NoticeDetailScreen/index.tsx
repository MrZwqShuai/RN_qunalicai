import * as React from 'react'
import { inject, observer } from 'mobx-react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { withNavigation } from 'react-navigation'
import QNRefreshModel from '~components/QNRefreshModel'
import QNHeader from '~components/QNHeader'
import {
  View, Text, ScrollView, KeyboardAvoidingView, Dimensions
} from 'react-native'
import HTML from 'react-native-render-html'
import Placeholder from 'rn-placeholder'
import {toJS} from "mobx"

@inject('NoticeListStore')
@observer class NoticeDetailScreen extends React.Component {
  static navigationOptions = () => ({
    header: null
  })
  state = {
    isReady: false
  }
  componentWillMount() {
    const id = this.props.navigation.getParam('id')
    this.props.NoticeListStore.loadNoticeDetail({
      noticeID: id
    })
  }
  public render() {
    const { isReady } = this.props.NoticeListStore
    const noticeDetail = toJS(this.props.NoticeListStore.noticeDetail)
    const width = Dimensions.get('window').width
    const htmlContent = `
      <div style="padding-bottom: 20px">
        ${noticeDetail && noticeDetail.NoticeContent}
      </div>
    `
    return (
      <View style={[styles.wrap]}>
        <QNHeader title={'公告详情'} backIcon/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.scrollView]}>
          <Placeholder.Paragraph
            textSize={18}
            animate='fade'
            lineNumber={1}
            lineSpacing={5}
            lastLineWidth={'20%'}
            onReady={isReady}
          >
            <Text style={styles.noticeTitle}>{noticeDetail && noticeDetail.NoticeTitle}</Text>
          </Placeholder.Paragraph>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <Placeholder.Paragraph
              textSize={12}
              animate='fade'
              lineNumber={1}
              onReady={isReady}
              lastLineWidth={'10%'}
            >
              <Text style={styles.noticeTime}>{noticeDetail && noticeDetail.NoticeTime}</Text>
            </Placeholder.Paragraph>
          </View>
          <Placeholder.Paragraph
            textSize={12}
            animate="fade"
            lineNumber={4}
            lineSpacing={5}
            lastLineWidth="30%"
            onReady={isReady}
          >
            <HTML style={styles.htmlContent} html={htmlContent} imagesMaxWidth={width - 30}/>
          </Placeholder.Paragraph>

        </ScrollView>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fff'
  },
  htmlContent: {
  },
  scrollView: {
    flex: 1,
    width: '100%',
    paddingTop: 25,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff'
  },
  noticeTitle: {
    textAlign: 'justify',
    lineHeight: 20,
    fontSize: 18,
    color: '#333'
  },
  noticeTime: {
    fontSize: 12,
    color: '#999',
    lineHeight: 14,
    marginBottom: 6,
    marginTop: 10
  }
})


export default withNavigation(NoticeDetailScreen)
