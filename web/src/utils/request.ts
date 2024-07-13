import axios, { type InternalAxiosRequestConfig } from "axios";
import { ERROR_CODE } from "@/constant";
import { getToken, tansParams } from ".";
import { message, Modal } from "antd";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// 是否显示重新登录
export let isRelogin = { show: false };

const instance = axios.create({
  baseURL: "/api",
  timeout: 60000,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;

    if (getToken() && !isToken) {
      config.headers!["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg =
      ERROR_CODE[code as keyof typeof ERROR_CODE] ||
      res.data.msg ||
      ERROR_CODE["default"];
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true;
        Modal.confirm({
          title: "系统提示",
          content: "登录状态已过期，您可以继续留在该页面，或者重新登录",
          okText: "重新登录",
          cancelText: "取消",
          type: "warning",
          onOk: () => {
            isRelogin.show = false;
            // useUserStore()
            //   .logOut()
            //   .then(() => {
            //     location.href = "/index";
            //   });
          },
          onCancel: () => {
            isRelogin.show = false;
          },
        });
      }
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code === 500) {
      message.error(msg);
      return Promise.reject(new Error(msg));
    } else if (code === 601) {
      message.warning(msg);
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      message.error(msg);
      return Promise.reject("error");
    } else {
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    message({ message: message, type: "error", duration: 5 * 1000 });
    return Promise.reject(error);
  }
);

// 通用下载方法
// export function download(url, params, filename, config) {
//   downloadLoadingInstance = ElLoading.service({
//     text: "正在下载数据，请稍候",
//     background: "rgba(0, 0, 0, 0.7)",
//   });
//   return service
//     .post(url, params, {
//       transformRequest: [
//         (params) => {
//           return tansParams(params);
//         },
//       ],
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       responseType: "blob",
//       ...config,
//     })
//     .then(async (data) => {
//       const isBlob = blobValidate(data);
//       if (isBlob) {
//         const blob = new Blob([data]);
//         saveAs(blob, filename);
//       } else {
//         const resText = await data.text();
//         const rspObj = JSON.parse(resText);
//         const errMsg =
//           ERROR_CODE[rspObj.code] || rspObj.msg || ERROR_CODE["default"];
//         message.error(errMsg);
//       }
//       downloadLoadingInstance.close();
//     })
//     .catch((r) => {
//       console.error(r);
//       message.error("下载文件出现错误，请联系管理员！");
//       downloadLoadingInstance.close();
//     });
// }

export { instance as default };
