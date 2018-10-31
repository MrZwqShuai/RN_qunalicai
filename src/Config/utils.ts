import {
  Alert,
  Dimensions,
  PixelRatio,
  Platform,
  AsyncStorage
} from 'react-native';

export const alert = (title, message) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK'
      }
    ],
    {
      cancelable: false
    }
  );
};

export const headerTitleStyle = (options = {}) => {
  return Platform.OS === 'android'
    ? {
        position: 'absolute',
        display: 'flex',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        lineHeight: 56,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        ...options
      }
    : {};
};

export function formatDate(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

export function pxToDp(Px) {
  //app 只有竖屏模式，所以可以只获取一次 width
  const deviceWidthDp = Dimensions.get('window').width;
  // UI 默认给图是 750
  const uiWidthPx = 750;
  // px to dp

  return (PixelRatio.roundToNearestPixel(Px) * deviceWidthDp) / uiWidthPx;
}

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export function validateByType(type, value) {
  // validate phone
  if (type === 'required') {
    const ret = value !== '';
    return {
      message: ret ? '' : '此为必填项',
      ret
    };
  }
  // validate phone
  if (type === 'phone') {
    const ret = /^1[3|4|5|7|8][0-9]{9}$/.test(value);
    return {
      message: ret ? '' : '手机格式不正确',
      ret
    };
    // return value.match(/^(?:13\d|15[89])-?\d{5}(\d{3}|13\d|15[89])-?\d{5}(\d{3}|\*{3})$/) != null;
  }
  // validate email
  if (type === 'email') {
    const ret = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value);
    return {
      message: ret ? '' : '邮箱格式不正确',
      ret
    };
  }
  // validate password
  if (type === 'password') {
    const ret = /^[0-9a-zA-Z]{6,16}$/.test(value);
    return {
      message: ret ? '' : '密码为6-16位的字母和数字',
      ret
    };
  }
  // validate verifyCode
  if (type === 'verifyCode') {
    const ret = /^[0-9]{6}$/.test(value);
    return {
      message: ret ? '' : '验证码为6位数字',
      ret
    };
  }
  // validate idCard
  if (type === 'idCard') {
    const ret = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
    return {
      message: ret ? '' : '身份证号格式不正确',
      ret
    };
  }
  // validate idCard
  if (type === 'bankNo') {
    return CheckBankNo(value);
  }
  //  validate username
  if (type === 'username') {
    const ret = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(value);
    return {
      message: ret ? '' : '请输入中英文、汉字的用户名',
      ret
    };
  }
}

//检查银行卡号
function CheckBankNo(bankno) {
  bankno = bankno.replace(/\s/g, '');
  if (bankno == '') {
    return false;
  }
  if (bankno.length < 16 || bankno.length > 19) {
    return false;
  }
  const num = /^\d*$/; //全数字
  if (!num.exec(bankno)) {
    return false;
  }
  //开头6位
  const strBin =
    '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99';
  if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
    return false;
  }
  //Luhn校验
  if (!luhnCheck(bankno)) {
    return false;
  }
  return true;
}

//bankno为银行卡号
function luhnCheck(bankno) {
  var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）

  var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
  var newArr = new Array();
  for (var i = first15Num.length - 1; i > -1; i--) {
    //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1));
  }
  var arrJiShu = new Array(); //奇数位*2的积 <9
  var arrJiShu2 = new Array(); //奇数位*2的积 >9

  var arrOuShu = new Array(); //偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) {
      //奇数位
      if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
      else arrJiShu2.push(parseInt(newArr[j]) * 2);
    } //偶数位
    else arrOuShu.push(newArr[j]);
  }

  var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
  var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
  }

  var sumJiShu = 0; //奇数位*2 < 9 的数组之和
  var sumOuShu = 0; //偶数位数组之和
  var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0;
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
  }

  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
  }

  for (var p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
  }
  //计算总和
  sumTotal =
    parseInt(sumJiShu) +
    parseInt(sumOuShu) +
    parseInt(sumJiShuChild1) +
    parseInt(sumJiShuChild2);

  //计算luhn值
  var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
  var luhn = 10 - k;

  if (lastNum == luhn) {
    return true;
  } else {
    return false;
  }
}

export const AUTH_MARGIN = pxToDp(40);

export const COLOR_YELLOW = '#ffad2c';

export class DeviceStorage {
  static get(key) {
    return AsyncStorage.getItem(key).then(value => {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    });
  }

  static setItem(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static update(key, value) {
    return DeviceStorage.get(key).then(item => {
      value =
        typeof value === 'String' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }

  static delete(key) {
    return AsyncStorage.removeItem(key);
  }
}

export const DOMAIN_URL = 'http://36.7.138.114:124/app/rebate/#'; //'https://m.qunalc.com'

function _isHasObj(arr, obj) {
  let index1 = null;
  arr.forEach((element, index) => {
    if (!index1 && element.title == obj.title) {
      index1 = index;
    }
  });
  return index1;
}

export function initSignAppList(data) {
  const obj = [];
  let title = '';
  data.forEach(val => {
    val.tdate = val.signDateString.replace(/-/g, '/');
    title =
      val.signDateString.split('/')[0] +
      '年' +
      val.signDateString.split('/')[1] +
      '月';
    const index = _isHasObj(obj, { title });
    if (index == null) {
      obj.push({
        title: title,
        data: [val]
      });
    } else {
      console.log(obj, 'index:' + index, 'len:', obj.length);
      obj[index].data.push(val);
    }
  });
  return obj;
}

export function starScore(score: number) {
  if (score >= 90) {
    return 5;
  } else if (score >= 80 && score <= 89) {
    return 4.5;
  } else if (score >= 70 && score <= 79) {
    return 4;
  } else if (score >= 60 && score <= 69) {
    return 3.5;
  } else if (score >= 50 && score <= 59) {
    return 3;
  } else {
    return 2.5;
  }
}

export function getDateList() {
  const addZero = val => {
    return val < 10 ? '0' + val : val;
  };
  let date = [];
  for (let i = 1970; i < new Date().getFullYear() + 6; i++) {
    let month = [];
    for (let j = 1; j < 13; j++) {
      let day = [];
      if (j === 2) {
        for (let k = 1; k < 29; k++) {
          day.push(addZero(k));
        }
        if (i % 4 === 0) {
          day.push(29);
        }
      } else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
        for (let k = 1; k < 32; k++) {
          day.push(addZero(k));
        }
      } else {
        for (let k = 1; k < 31; k++) {
          day.push(addZero(k));
        }
      }
      let _month = {};
      _month[addZero(j)] = day;
      month.push(_month);
    }
    let _date = {};
    _date[i] = month;
    date.push(_date);
  }
  return date;
}

export function getCurrentDate() {
  const addZero = val => {
    return (val = val > 10 ? val : '0' + val);
  };
  const year = new Date().getFullYear();
  const month = addZero(new Date().getMonth() + 1);
  const day = addZero(new Date().getDate());
  return [year, month, day];
}
export const serviceUrl = 'https://m.qunalc.com/kf';
export const problemUrl = 'https://m.qunalc.com/problem';
export const newsUrl = 'https://m.qunalc.com/news/';
export const aboutUrl = 'https://m.qunalc.com/about';
export const newGuideUrl =
  'https://m.qunalc.com/newguide';
export const downloadURL =
  'https://m.qunalc.com/download';
export const platformURL = 'http://report.wsloan.com:124/app/rebate/#/report';
export const UPLOAD_AVATOR_URL =
  'http://www.qunalc.com/fanliwang/find/updateHeadPicture.do';
// sleep
export function sleep(time) {
  return new Promise(function(res, rej) {
    const timer = setTimeout(function() {
      clearTimeout(timer);
      res();
    }, time);
  });
}

// 节流
let identify = 0;
export const throttle = function(func, interval) {
  if (identify) return;
  identify = setTimeout(() => (identify = 0), interval);
  func.apply(this);
};

let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
      (screenH === X_WIDTH && screenW === X_HEIGHT))
  );
}

// 倒计时
export let countDownFormat = function (second: number): string {
  let d = Math.floor(second / 3600 / 24); //天数
  let h = Math.floor(second / 3600 % 24) // 小时
  let m = Math.floor(second / 60 % 60 );
  let s = Math.floor(second % 60); // 当前的秒
  d<10 ? d="0"+d : d;
  h<10 ? h="0"+h : h;
  m<10 ? m="0"+m : m;
  s<10 ? s="0"+s : s;
  return `${h}时${m}分${s}秒`
}
