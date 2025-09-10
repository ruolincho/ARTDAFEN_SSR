import moment from 'moment'
/**
 * 格式化支付状态
 * @param status
 */
export const formatPayChannel = (status: Dict.PayChannelType) => {
    switch (status) {
        case '0':
            return 'Upload Credentials'
        case '1':
            return 'Receive'
        case '2':
            return 'Airdrop'
        case '3':
            return 'Synthesis'
        case '4':
            return 'Administrator Manually Compensates'
        case '5':
            return 'Yimi Deduction'
        case '6':
            return 'Wechat Pay'
        case '7':
            return 'Alipay Pay'
        case '8':
            return 'PayPal Pay'
        default:
            return 'Unknown'
    }
}

/**
 * 格式化时间戳
 * @param value
 * @param format
 */
export const formatTimestamp = (value = 0, format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(Number(value)).format(format)
}

/**
 * 格式化整数
 * @param value
 */
export function formatInteger(value: string = '') {
    // 通过正则限制只允许输入数字
    let formattedValue = value.replace(/[^0-9.]/g, '');

    // 如果包含小数点，确保只保留小数点前的整数部分
    if (formattedValue.includes('.')) {
        formattedValue = formattedValue.split('.')[0];
    }

    // 去除前导零
    formattedValue = formattedValue.replace(/^0+/, '') || '0';

    // 将值格式化为两位小数
    return formattedValue;
}
