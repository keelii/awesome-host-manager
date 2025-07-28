/**
 * 是不是函数
 * @param s
 */
export function isFunction(s: any): s is Function {
  return typeof s === "function";
}
/**
 * 是否未定义
 * @param s
 */
export function isUndefined(s: unknown): s is undefined {
  return typeof s === "undefined";
}

export function uuid_v4() {
  if (!isUndefined(window.crypto)) {
    if (isFunction(crypto.randomUUID)) {
      return crypto.randomUUID();
    }
    if (isFunction(crypto.getRandomValues)) {
      return "10000000-1000-4000-8000-100000000000".replace(
        /[018]/g,
        (c) =>
          (+c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4))))
            .toString(16),
      );
    }
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function shortUuid() {
  return uuid_v4().substring(0, 8);
}
