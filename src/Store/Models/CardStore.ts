import { observable, flow, action, toJS } from 'mobx';
import { fetchUserInfo, fetchBankCard, fetchCardInfo } from '~apis';
import Picker from 'react-native-picker';
import Toast from '~components/NewToast';
import { RootStore, MyInfoStore } from '~store';
import { NavigationActions } from 'react-navigation';
import { validateByType } from '~utils';
class CardStore {
  @observable
  isHaveCard = 0;

  @observable
  isClickBindCard = false;

  @observable
  bankList = [];

  @observable
  realBankList = [];

  @observable
  cardMessage = {
    userName: '',
    idCard: '',
    bank: '',
    bankCard: ''
  };

  @action
  restCardInfo() {
    this.cardMessage = {
      userName: '',
      idCard: '',
      bank: '',
      bankCard: ''
    };
    this.isClickBindCard = false;
  }

  @action
  setIsHaveCard(isHaveCard) {
    this.isHaveCard = isHaveCard;
  }

  @action
  setIsClickBindCard(isClickBindCard) {
    this.isClickBindCard = isClickBindCard;
  }

  @action
  setCardMessageByKey(key, value) {
    this.cardMessage[key] = value;
  }

  @action
  showPicker() {
    Picker.show();
  }

  @action
  hidePicker() {
    Picker.hide();
  }

  // FLOW
  getUserInfo = flow(function*() {
    const {
      user: { cardNo, skr, sheng, bankName }
    } = yield fetchUserInfo();
    this.isHaveCard = cardNo ? 1 : 0;
    console.log('--', skr, sheng, bankName, cardNo);

    this.cardMessage = {
      userName: skr,
      idCard: sheng,
      bank: bankName,
      bankCard: cardNo
    };
    const { bank } = yield fetchCardInfo();
    this.realBankList = bank;
    const list = bank.map(item => {
      return item.bankName;
    });
    if (bankName) {
      Picker.init({
        pickerData: list,
        selectedValue: [bankName],
        pickerConfirmBtnText: '确认',
        pickerCancelBtnText: '取消',
        pickerTitleText: '选择开户银行',
        onPickerConfirm: bank => {
          this.cardMessage.bank = bank[0];
        }
      });
    } else {
      Picker.init({
        pickerData: list,
        pickerConfirmBtnText: '确认',
        pickerCancelBtnText: '取消',
        pickerTitleText: '选择开户银行',
        onPickerConfirm: bank => {
          this.cardMessage.bank = bank[0];
        }
      });
    }
  });

  _checkUpdateCardInfo() {
    const { userName, idCard, bank, bankCard } = this.cardMessage;
    const validateIdCard = validateByType('idCard', idCard);
    if (!userName) {
      Toast.show('姓名没有输入');
      return false;
    }
    if (!validateIdCard.ret) {
      Toast.show(validateIdCard.message);
      return false;
    }
    if (!bank) {
      Toast.show('开户银行没有输入');
      return false;
    }
    if (!bankCard) {
      Toast.show('银行卡号没有输入');
      return false;
    }
    return true;
  }

  updateCardInfo = flow(function*(type) {
    if (!this._checkUpdateCardInfo()) {
      return;
    }

    const {
      userName: skr,
      idCard: sheng,
      bank: bankName,
      bankCard: card
    } = this.cardMessage;
    const data = yield fetchBankCard({
      skr,
      sheng,
      bankName,
      card
    });
    if (data !== 0) {
      MyInfoStore.user.cardNo = card;
      Toast.show(type === 0 ? '绑定成功' : '修改成功');
      const timer = setTimeout(() => {
        clearTimeout(timer);
        RootStore.rootRouter.dispatch(
          NavigationActions.back({
            key: null
          })
        );
      }, 500);
    }
  });
}

export default new CardStore();
