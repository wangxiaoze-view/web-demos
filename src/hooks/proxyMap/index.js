const proxyMap = new Map();

export default function useTrackMap() {
  const set = (key, val) => {
    proxyMap.set(key, val);
  };

  const get = (key) => {
    return proxyMap.get(key);
  };

  const mapClear = () => {
    return proxyMap.clear();
  };

  return {
    proxyMap,
    set,
    get,
    mapClear,
  };
}
