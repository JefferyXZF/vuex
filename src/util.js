/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * 从一个数组中找到一个符合条件的元素
 * 参数是一个数组和一个回调，回调用于检查元素是否符合要求
 * 如果有符合条件的元素，返回第一个元素，否则返回 undefined
 * let arr = []
 * console.log(arr.filter(el => el > 0))     // undefined
 * arr = [4,5,6,7]
 * console.log(arr.filter(el => el > 0))     // 4
 */
export function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
/**
 * 深拷贝方法，默认有一个缓存参数，初始时为空数组，向下递归的时候，会不断的添加内容
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  // 如果对象在缓存中找到的话，那就直接返回缓存对象
  // 因为虽然是深拷贝，但是原对象中的某几个属性同时引用了某个对象的话
  // 这个时候为了与之前对象保持一致，不应该进行深拷贝，而是直接传递引用，比如函数什么的
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  // 判断当前拷贝的是数组还是对象，然后生成对应的类型，然后将当前对象传入到缓存中
  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}

/**
 * 断言方法，用于检查传入内容是否正确，
 * 如果正常则继续执行， 不正确就抛出异常，这是保证程序正常运行的一种手段
 */
export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}
