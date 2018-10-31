import {observable, computed, flow, action} from 'mobx'
import {
  fetchNotices as ApiNoticeList,
  fetchNoticeDetail as ApiNoticeDetail
} from '~apis';

class NoticeListStore {
  pageSize = 10
  @observable
  noticeList = []
  @observable
  page = 0
  @observable
  isLast = false
  @observable
  isLoading = false
  @observable
  noticeDetail = null // 通知详情页面数据
  @observable
  isReady = false // 详情页未加载状态

  @computed
  get getNoticeList() {
    return this.noticeList
  }
  @computed
  get getNoticeDetail() {
    return this.noticeDetail
  }

  @action
  setNoticeList(noticeList) {
    this.noticeList = this.page === 1 ? [...noticeList] : [...this.noticeList, ...noticeList]
  }
  @action
  setPage(page) { // 分页页码设定
    this.page = page
  }
  setNoticeDetail(noticeDetail) {
    this.noticeDetail = noticeDetail
  }

  loadNoticeList = flow(function*(resolve) {
    this.isLoading = true
    const data = yield ApiNoticeList({
      page: this.page,
      pageSize: this.pageSize
    });
    this.isLoading = false
    const {
      Allpage,
      list
    } = data
    this.setNoticeList(list)
    this.isLast = Allpage <= this.page
    if(typeof resolve === 'function') {
      resolve()
    }
  })
  loadNoticeDetail = flow(function* (params) {
    this.isReady = false
    const data = yield ApiNoticeDetail(params)
    this.setNoticeDetail(data)
    this.isReady = true
  })
}

export default new NoticeListStore()