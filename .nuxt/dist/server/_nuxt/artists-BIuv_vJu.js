import { $ as $http, Z as TRADE_MODULE } from "../server.mjs";
const getArtistsListApi = (params) => {
  return $http().get(TRADE_MODULE + `/artists/search`, params);
};
const getArtistsListBySearchApi = (params) => {
  return $http().post(TRADE_MODULE + `/artists/search`, params);
};
export {
  getArtistsListApi as a,
  getArtistsListBySearchApi as g
};
//# sourceMappingURL=artists-BIuv_vJu.js.map
