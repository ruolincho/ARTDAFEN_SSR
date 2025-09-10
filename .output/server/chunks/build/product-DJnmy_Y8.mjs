const gen_path_arr = (source, keyName) => {
  return {
    [keyName]: JSON.stringify(source.map((item) => ({ parentId: item.parentId, id: item.id })))
  };
};
const gen_path_obj = (source, keyName, extraFields = []) => {
  var _a;
  const valueObj = { parentId: source.parentId };
  valueObj.id = ((_a = source.config) == null ? void 0 : _a.referenceId) || source.id;
  extraFields.forEach((field) => {
    if (!(field in valueObj)) {
      valueObj[field] = source[field];
    }
  });
  return {
    [keyName]: JSON.stringify(valueObj)
  };
};

export { gen_path_arr as a, gen_path_obj as g };
//# sourceMappingURL=product-DJnmy_Y8.mjs.map
