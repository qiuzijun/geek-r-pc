import axios from "axios";
import { message } from "antd";
import { getToken } from "./auth";
import { logout } from "@/store/actions";
import { customHistory } from "./history";
import store from "@/store";
const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    // 拦截业务逻辑
    // 进行请求配置的修改
    // 如果本地又token就在头部携带
    // 1. 获取用户信息对象
    const token = getToken();
    // 2. 判断是否有token
    if (token) {
      // 3. 设置token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// res => res.data  取出data数据，将来调用接口的时候直接拿到的就是后台的数据
request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    // 401 状态码，进入该函数
    if (err.response.status === 401) {
      message.error("登录失效");
      store.dispatch(logout());
      // 防止跳转login的时候接口才处理401
      if (customHistory.location.pathname !== "/login") {
        customHistory.push({
          pathname: "/login",
          state: { from: customHistory.location.pathname },
        });
      }
    }
    return Promise.reject(err);
  }
);

export default request;
