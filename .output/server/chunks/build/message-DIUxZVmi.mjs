import { $ as $http, Z as TRADE_MODULE, a0 as USER_MODULE } from './server.mjs';

const subscribeForRealName = () => {
  return $http().get(USER_MODULE + `/message/subscribe`);
};
const sendConsulting = (params) => {
  return $http().post(TRADE_MODULE + `/message/send`, params);
};

export { subscribeForRealName as a, sendConsulting as s };
//# sourceMappingURL=message-DIUxZVmi.mjs.map
