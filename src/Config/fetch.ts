import axios from 'axios';
import Qs from 'qs';
// import { AsyncStorage } from 'react-native';
import { alert, DeviceStorage } from '~utils';
import { RootStore } from '~store';
import Toast from '~components/NewToast';

// const BASE_URL = 'http://192.168.3.26:5026/FanLiWangQian/';
const BASE_URL = 'http://192.168.3.71:7538/';
// const BASE_URL = 'http://www.qunalc.com/fanliwang/';

// 添加请求拦截器
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 20,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  }
});
// http request 拦截器
instance.interceptors.request.use(
  async config => {
    if (RootStore.isConnected) {
      // ADD 添加从Url获取userid
      let userid = RootStore.userId;
      if (config.params || config.method.toLowerCase() === 'get') {
        const extraParams = userid ? { userid } : {};
        config.params = Object.assign(
          {},
          extraParams,
          config.data || {},
          config.params || {}
        );
        delete config['data'];
      }
      if (
        config.method.toLowerCase() === 'post' &&
        config.data &&
        !config.params
      ) {
        if (userid) {
          config.data.userid = userid;
        }
        config.data = Qs.stringify(config.data);
      }
      console.log('config:', config);
      return config;
    } else {
      Toast.show(
        '无法连接网络,请检查网络情况!',
        'top',
        '#c12828',
        '#fff',
        3000
      );
    }
  },
  err => {
    Toast.show('请求失败' + err.message);
    return Promise.reject(err);
  }
);

// http response 拦截器
instance.interceptors.response.use(
  response => {
    const { data } = response;
    console.log('response:', response);
    if (data.code !== 0) {
      Toast.show(data.message);
      return 0;
    }
    return data.content;
  },
  err => {
    if (err.response) {
      RootStore.setLoading(false);
      Toast.show('响应失败' + err.response.data.error);
    }
  }
);

// 请求处理
export default instance;
