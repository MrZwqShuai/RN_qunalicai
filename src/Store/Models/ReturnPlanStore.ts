import { observable, computed, flow, action } from 'mobx'
import {
  fetchReimbursementRecord
} from '~apis'

class ReturnPlanStore {
  @observable
  returnList = []
  @observable
  daihuiList = []
  @observable
  returnData = {}
  @observable
  returnDetail = {}


  @computed
  get getReturnList() {
    return this.returnList
  }
  @computed
  get getReturnData() {
    return this.returnData
  }
  @computed
  get getReturnDetail() {
    return this.returnDetail
  }
  @computed
  get getDaihuiList() {
    return this.daihuiList
  }

  @action
  setReturnList(returnList) {
    this.returnList = [...returnList]
  }
  setReturnData(returnData) {
    this.returnData = returnData
  }
  @action
  setReturnDetail(returnDetail) {
    this.returnDetail = returnDetail
  }
  setDaihuiList(daihuiList) {
    this.daihuiList = daihuiList
  }

  loadReturnList = flow(function* () {
    const data = yield fetchReimbursementRecord()
    const {
      counts,
      countsMonth,
      daishou,
      list,
      daihuiList
    } = data
    this.setReturnList(list)
    this.setDaihuiList(daihuiList)
    this.setReturnData({counts, countsMonth, daishou})
  })
}

export default new ReturnPlanStore()