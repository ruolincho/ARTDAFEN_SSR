import { $ as $http, Z as TRADE_MODULE } from './server.mjs';

const getCombinationApi = (params) => {
  return $http().post(TRADE_MODULE + `/paint/combo`, params);
};
const getThemeApi = (id) => {
  return $http().get(TRADE_MODULE + `/paint/theme/${id}`);
};

export { getCombinationApi as a, getThemeApi as g };
//# sourceMappingURL=paint-B_vqKQsu.mjs.map
