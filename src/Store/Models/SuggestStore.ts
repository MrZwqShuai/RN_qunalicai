import { observable, action, flow } from 'mobx';
import { NavigationActions } from 'react-navigation';
import { fetchSuggest } from '~apis';
import Toast from '~components/NewToast';
import { RootStore } from '~store';

class SuggestStore {
  @observable
  suggestText = '';

  @action
  setText(suggestText) {
    this.suggestText = suggestText;
  }

  saveText = flow(function*() {
    const data = yield fetchSuggest({
      userid: RootStore.userId,
      content: this.suggestText
    });
    if (data !== 0) {
      Toast.show('保存成功，感谢您的意见');
      RootStore.rootRouter.dispatch(NavigationActions.back({ key: null }));
    }
  });
}

export default new SuggestStore();
