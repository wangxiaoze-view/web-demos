const errorMap = new Map();
// 全局的错误信息， 后期可用于展示
export function hanlderErrorMap() {
  const set = (key, val) => errorMap.set(key, val);
  const get = (key) => errorMap.get(key);
  const mapClear = () => errorMap.clear();
  return {
    errorMap,
    set,
    get,
    mapClear,
  };
}
