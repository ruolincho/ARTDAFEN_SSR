import {ElMessage} from "element-plus";

/**
 * 成功状态
 * @type {string}
 */
export const CODE_SUCCESS: number = 200;
/**
 * 无效Token
 * @type {string}
 */
export const CODE_TOKEN_FAIL: number = 401;

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @param {String} message
 * @return void
 */
export const checkStatus = (status: number, message?: string) => {
  switch (status) {
    case CODE_TOKEN_FAIL: // 无效Token
      ElMessage.error(message || 'Login failed! Please log in again.');
      break;
    case 40011: // 公钥过期
      ElMessage.error(message || 'Session timeout, please try again later!');
      break;
    case 40012: // authToken 或者 uuid 过期
      ElMessage.error(message || 'Session timeout, please try again later!');
      break;
    case 500:
      ElMessage.error(message || 'The network is busy, please try again later!');
      break;
    case 503:
      ElMessage.error(message || 'The internet went wrong, please try again later!');
      break;
    default:
      ElMessage.error(message || 'Request failed!');
  }
};
