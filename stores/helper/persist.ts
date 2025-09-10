/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
const piniaPersistConfig = (key: string, paths?: string[]) => {
  return {
    key,
    paths,
    // storage 不写时默认 localStorage
  };
};

export default piniaPersistConfig;
