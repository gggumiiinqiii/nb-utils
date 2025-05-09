const isObject = (value) => typeof value === "object" && value !== null;

const isObjectCustom = (value) =>
  isObject(value) &&
  !(value instanceof RegExp) &&
  !(value instanceof Error) &&
  !(value instanceof Date) &&
  !(globalThis.Blob && value instanceof globalThis.Blob);

export const mapObjectSkip = Symbol("mapObjectSkip");

const _mapObject = (object, mapper, options, isSeen = new WeakMap()) => {
  options = {
    deep: false,
    target: {},
    ...options,
  };
  if (isSeen.has(object)) {
    return isSeen.get(object);
  }

  isSeen.set(object, options.target);

  const { target } = options;
  delete options.target;

  const mapArray = (array) =>
    array.map((element) =>
      isObjectCustom(element)
        ? _mapObject(element, mapper, options, isSeen)
        : element
    );
  if (Array.isArray(object)) {
    return mapArray(object);
  }

  for (const [key, value] of Object.entries(object)) {
    //工具函数取出函数处理的结果
    const mapResult = mapper(key, value, object);

    if (mapResult === mapObjectSkip) {
      continue;
    }
    let [newKey, newValue, { shouldRecurse = true } = {}] = mapResult;
    // Drop `__proto__` keys.
    if (newKey === "__proto__") {
      continue;
    }
    if (options.deep && shouldRecurse && isObjectCustom(newValue)) {
      newValue = Array.isArray(newValue)
        ? mapArray(newValue)
        : _mapObject(newValue, mapper, options, isSeen);
    }
    target[newKey] = newValue;
  }
  return target;
};

export function mapObject(object, mapper, options) {
  if (!isObject(object)) {
    throw new TypeError(
      `Expected an object, got \'${object}'\ (${typeof object})`
    );
  }
  if (Array.isArray(object)) {
    throw new TypeError("Expected an object,got an array");
  }

  return _mapObject(object, mapper, options);
}
