export const ACCESS_TOKEN = "ACCESS_TOKEN";

/**
 * 不需要登陆的api接口
 */
export const WHITE_API_LIST = ["/login", "/register"];

export const ERROR_CODE = {
  "401": "认证失败，无法访问系统资源",
  "403": "当前操作没有权限",
  "404": "访问资源不存在",
  default: "系统未知错误，请反馈给管理员",
};
