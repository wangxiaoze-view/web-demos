import axios from "axios";
import useTrackMap from "@/hooks/proxyMap";

const { set, get } = useTrackMap();

let lastTime = new Date().getTime();

const handlerDelayProxy = (config) => {
  const { method, params = {}, data = {}, url } = config;
  const method_key = method.toLocaleUpperCase();

  const {
    debounce = false,
    throttling = false,
    time = 1000,
  } = ["GET", "PUT"].includes(method_key) ? params : data;
  // KEY
  const proxy_key = `AXIOS_${method_key}_${url}`;
  let nowTime = new Date().getTime();

  // 防抖
  if (debounce) {
    get(proxy_key) && clearTimeout(get(proxy_key));
    return new Promise((resolve) => {
      const timmer = setTimeout(() => {
        clearTimeout(timmer);
        resolve(config);
      }, time);
      set(proxy_key, timmer);
    });
  }

  //节流
  if (throttling || typeof throttling === "undefined") {
    if (nowTime - lastTime < time) {
      return Promise.reject(new Error("节流处理中，稍后再试..."));
    }
    lastTime = nowTime;
    return config;
  }
};

const instance = axios.create({
  timeout: 6 * 1000,
  timeoutErrorMessage: "请求超时: timeout",
});

// 拦截请求
instance.interceptors.request.use(
  // 处理对应的操作
  (config) => handlerDelayProxy(config),
  (error) => Promise.reject(error)
);

// 拦截响应
instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

const http = {
  get: (url, params) => instance.get(url, { params }),
  post: (url, params) => instance.post(url, params),
  delete: (url, params) => instance.delete(url, params),
  put: (url, params) => instance.put(url, params),
};

export default http;
