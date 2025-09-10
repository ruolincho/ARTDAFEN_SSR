import moment from "moment";
const formatPayChannel = (status) => {
  switch (status) {
    case "0":
      return "Upload Credentials";
    case "1":
      return "Receive";
    case "2":
      return "Airdrop";
    case "3":
      return "Synthesis";
    case "4":
      return "Administrator Manually Compensates";
    case "5":
      return "Yimi Deduction";
    case "6":
      return "Wechat Pay";
    case "7":
      return "Alipay Pay";
    case "8":
      return "PayPal Pay";
    default:
      return "Unknown";
  }
};
const formatTimestamp = (value = 0, format = "YYYY-MM-DD HH:mm:ss") => {
  return moment(Number(value)).format(format);
};
export {
  formatPayChannel as a,
  formatTimestamp as f
};
//# sourceMappingURL=format-BLqFJkIL.js.map
