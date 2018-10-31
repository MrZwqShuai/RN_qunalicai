import { observable, action, flow, computed } from 'mobx';
import { fetchTransferList } from '~apis';
import { iteratorToArray } from 'mobx/lib/utils/utils';
// import Toast from '~components/NewToast';
// import { RootStore } from '~store';

class TransferClaimStore {
  @observable
  pickCondition = {
    key: '',
    value: ''
  };

  @observable
  listPage = {
    pageIndex: 1,
    pageSize: 5
  };

  @computed
  get getParams() {
    const {
      pickCondition: { key, value },
      listPage
    } = this;
    if (key && value) {
      return {
        [key]: value,
        ...listPage
      };
    }
    return listPage;
  }

  @observable
  transfer = {
    data: [],
    isLast: false
  };

  @action
  updateCondition(key, value) {
    this.pickCondition.key = key;
    this.pickCondition.value = value;
  }

  @action
  refresh() {
    this.listPage.pageIndex = 1;
    this.fetchTransferList();
  }

  @action
  loadMore() {
    this.listPage.pageIndex += 1;
    this.fetchTransferList();
  }

  fetchTransferList = flow(function*() {
    const ret = yield fetchTransferList(this.getParams);
    if (ret) {
      const { list, Allpage } = ret;
      const {
        listPage: { pageIndex },
        transfer: { data }
      } = this;
      if (pageIndex > 1) {
        this.transfer.data = [...data, ...list];
      } else {
        this.transfer.data = list;
      }
      this.transfer.isLast = this.transfer.data.length >= Allpage;
    }
  });
}

export default new TransferClaimStore();
