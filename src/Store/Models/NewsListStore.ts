import {observable, computed, flow, action} from 'mobx'
import {
  fetchNewsList as ApiNewsList,
  fetchNewsDetail as ApiNewsDetail,
  fetchCommentNum as APiCommentNum,
  fetchDoGreat as ApiDoGreat,
  fetchDoComment as ApiDoComment,
  fetchCommentByArticle as ApiCommentByArticle,
  fetchReplyById as ApiReplyById
} from '~apis'

class NewsListStore {
  @observable
  params = {
    page: 0,
    pageSize: 10
  }
  @observable
  commentParams = {
    page: 0,
    pageSize: 5
  }
  @observable
  newsList = []
  @observable
  isLast = false
  @observable
  isCommentsLast = false
  @observable
  isLoading = false
  @observable
  commentLoading = false
  @observable
  isReady = false // 详情页是否加载完成
  @observable
  newsDetail = {}
  @observable
  commentCount = {}  // 文章点赞评论数量
  @observable
  hotComment = []  // 热门评论
  @observable
  recentComment = []  // 最新评论
  @observable
  inputPlaceholder = '我来说两句' // 输入框占位符
  @observable
  isFocus = false // 控制TextInput是否聚焦参数
  @observable
  beReply = null // 被回复者消息及内容
  @observable
  curBeReply = null // 评论详情页  正在被回复的
  @observable
  defaultPic = 'https://wsimages.wsloan.com/images/ah-20/2Rhak~CNQjR_CyMbMBIeQ9.png' // 默认新闻图片
  @observable
  defaultAvatar = 'https://wsimages.wsloan.com/images/QN/1_AQ0acTvP83vaKY8zeEUM.png'


  @computed
  get getNewsList() {
    return this.newsList
  }
  @computed
  get getNewsDetail() {
    return this.newsDetail
  }
  @computed
  get getCommentCount() {
    return this.commentCount
  }
  @computed
  get getHotComment() {
    return this.hotComment
  }
  @computed
  get getRecentComment() {
    return this.recentComment
  }
  @computed
  get getInputPlaceholder() {
    return this.inputPlaceholder
  }
  @computed
  get getFocus() {
    return this.isFocus
  }
  @computed
  get getBeReply() {
    return this.beReply
  }
  @computed
  get getCurReply() {
    return this.curBeReply
  }


  @action
  setNewsList(newsList) {
    this.params.page === 1 && (this.newsList = [])
    this.newsList = [...this.newsList, ...newsList]
  }
  setParams(key, value) {
    this.params[key] = value
  }
  setCommentParams(key, value) {
    this.commentParams[key] = value
  }
  setNewsDetail(newsDetail) {
    this.newsDetail = newsDetail
  }
  setCommentCount(commentCount) {
    this.commentCount = commentCount
  }
  setHotComment(comment) {
    this.hotComment = comment
  }
  setRecentComment(comment) {
    this.recentComment = this.commentParams.page === 1 ? [...comment] : [...this.recentComment, ...comment]
  }
  setInputPlaceholder(text) {
    this.inputPlaceholder = text
  }
  setFocus(isFocus) {
    this.isFocus = isFocus
  }
  setBeReply(item) {
    this.beReply = item
  }
  setCurBeReply(item) {
    this.curBeReply = item
  }

  loadNewsList = flow(function* () {
    this.isLoading = true
    const data = yield ApiNewsList(this.params)
    const {
      Allpage,
      articles
    } = data
    this.isLast = Allpage <= this.params.page
    this.setNewsList(articles)
    this.isLoading = false
  })
  loadNewsDetail = flow(function* (params) {
    this.isReady = false
    const data = yield ApiNewsDetail(params)
    this.setNewsDetail(data.news)
    this.isReady = true
  })
  loadCommentCount = flow(function* (params) {
    const data = yield APiCommentNum(params)
    this.setCommentCount(data)
  })
  doGreat = flow(function* (params) { // 文章评论点赞，评论评论点赞评论功能
    const data = yield ApiDoGreat(params)
    return data
  })
  doComment = flow(function* (params) {
    const data = yield ApiDoComment(params)
    return data
  })
  loadCommentList = flow(function* () { // 评论数据加载
    this.isLoading = true
    const data = yield ApiCommentByArticle({
      ...this.commentParams,
      articleID: this.newsDetail.id
    })
    const {
      hotComment,
      comment,
      allPages
    } = data
    this.setHotComment(hotComment)
    this.setRecentComment(comment)
    this.isCommentsLast = allPages <= this.commentParams.page
    this.isLoading = false
  })
  loadCommentDetail = flow(function* (params) {
    const data = yield ApiReplyById(params)
    this.setBeReply({
      ...data.commentDetail,
      greatYesOrNot: data.greatYesNot,
      greatCount: data.greatCount,
      replyList: data.replyList,

    })
  })
}

export default new NewsListStore()