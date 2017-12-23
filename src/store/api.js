/**
 * 统一管理所有接口请求
 */
import axios from 'axios'; // ajax请求：https://github.com/mzabriskie/axios
import qs from 'qs'; // 参数工具：https://github.com/ljharb/qs
import Toast from '../components/toast';

// region axios 全局配置

axios.defaults.baseURL = process.env.API;
axios.defaults.timeout = 5000;

// region request统一处理操作
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// POST传参序列化
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    alert('错误的传参');
    return Promise.reject(error);
  }
);
// endregion

// region response统一处理操作
axios.interceptors.response.use(
  res => {
    if (res.data.code !== '200') {
      // code状态码200判断
      Toast(res.data.msg);
      console.log(res.data.msg);
      return Promise.reject(res);
    } else {
      // TODO:判断登录状态
    }
    return res;
  },
  error => {
    Toast('网络异常');
    return Promise.reject(error);
  }
);
// endregion

// endregion

/**
 * 发送GET请求
 * @param api 接口api
 * @param params 请求参数
 * @returns {Promise.<T>}
 */
async function sendGet(api, params) {
  try {
    if (!toast) toast = Toast({ time: -1, message: '加载中', icon: 'loading' });
    let data = await axios.get(api, { params });
    toast.close();
    return data;
  } catch (e) {
    toast.close();
    Toast({ message: '网络异常', position: 'bottom' });
    throw e;
  }
}

/**
 * 发送POST请求
 * @param api 接口api
 * @param params 请求参数
 * @returns {Promise.<T>}
 */
async function sendPost(api, params) {
  try {
    if (!toast) toast = Toast({ time: -1, message: '加载中', icon: 'loading' });
    let data = await axios.post(api, qs.stringify(params));
    toast.close();
    return data;
  } catch (e) {
    toast.close();
    Toast({ message: '网络异常', position: 'bottom' });
    throw e;
  }
}

let toast = null;

export default {
  login(api, { username, password }) {
    api = api || 'login';
    return sendPost(api, {
      username,
      password
    });
  }
};
