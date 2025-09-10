import { $ as $http, Z as TRADE_MODULE } from './server.mjs';

const productThumbsApi = (params) => {
  return $http().post(TRADE_MODULE + `/likes/product/collect`, params);
};
const blogThumbsApi = (params) => {
  return $http().post(TRADE_MODULE + `/likes/blog/thumbs`, params);
};

export { blogThumbsApi as b, productThumbsApi as p };
//# sourceMappingURL=likes-CD9WoB9V.mjs.map
