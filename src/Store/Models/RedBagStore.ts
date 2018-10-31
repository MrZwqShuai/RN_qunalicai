import { observable, action, flow } from 'mobx';
// import { fetchSuggest } from '~apis';
// import Toast from '~components/NewToast';
// import { RootStore } from '~store';

class RedBagStore {
  @observable
  params = {};

  @action
  setRegBagParams(params) {
    this.params = params;
  }
  @action
  clearBagParams() {
    this.params = {};
  }
}

export default new RedBagStore();
