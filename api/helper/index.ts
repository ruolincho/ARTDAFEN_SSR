import {ElMessage} from "element-plus";

/**
 * 成功状态码前缀，所有成功状态码都以该前缀开头
 * @type {string}
 */
export const CODE_SUCCESS_PREFIX: number = 2;

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
        case 2019:
            ElMessage.info(message || 'This coupon has already been used and cannot be applied to your order.');
            break;
        case 2020:
            ElMessage.info(message || 'This coupon expired on {date} and can no longer be used.');
            break;
        case 2021:
            ElMessage.info(message || 'This coupon is no longer available.');
            break;
        case 2022:
            ElMessage.info(message || 'Your cart total does not meet the minimum required amount of to use this coupon.');
            break;
        case 2023:
            ElMessage.info(message || 'This coupon doesn\'t apply to any items in your cart.');
            break;
        case 2024:
            ElMessage.info(message || 'Wrong coupon code.');
            break;
        default:
            ElMessage.error(message || 'Request failed!');
    }
};