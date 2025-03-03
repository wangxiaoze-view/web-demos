const targetMap = new WeakMap();
let activeEffect = null;
function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));
  let deps = depsMap.get(key);
  if (!deps) depsMap.set(key, (deps = new Set()));
  deps.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  if (!deps) return;
  deps.forEach((effect) => effect());
}

// ref
class RefImpl {
  _deps = new Set();
  constructor(value) {
    this._value = value;
    // this.value = value;
  }
  get value() {
    track(this, "value");
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    trigger(this, "value");
  }
}

export function useReactivity() {
  return {
    ref: (value) => new RefImpl(value),
    effect: (fn) => {
      activeEffect = fn;
      fn();
      activeEffect = null;
    },
  };
}
