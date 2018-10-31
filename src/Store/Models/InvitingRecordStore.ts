import { observable, computed, autorun, flow, action, toJS } from 'mobx';
import { fetchInvitingRecord } from '../../Api/index';

class InvitingRecordStore {

  @observable
  invitingRecordList = {
    YQLB: []
  };

  @observable
  YQLB: object[] = [];

  @observable
  isRefresh: boolean = false;

  getInvitingRecordList = flow(function*(data) {
    try{
      const invitingRecord = yield fetchInvitingRecord(data);
      console.log(invitingRecord, 'invitingRecordin=----vitingRecordinvitingRecord')
      this.setInvitingRecordList(invitingRecord);
      this.setYQLB(invitingRecord.YQLB);
    } catch (error) {
      console.log('yaoqing.do错误信息', error);
    }
  })

  @action
  setInvitingRecordList(invitingRecord) {
    this.invitingRecordList = invitingRecord;
  }

  @action
  setYQLB(YQLB) {
    if(this.isRefresh) {
      this.YQLB = YQLB;
      this.setRefresh(false);
    } else {
      this.YQLB = this.YQLB.concat(YQLB);
    }
  }

  @action
  setRefresh(isRefresh: boolean) {
    this.isRefresh = isRefresh;
  }
  
}

export default new InvitingRecordStore();