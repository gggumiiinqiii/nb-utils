/**
 * 根据key值去重
 * @param {*} target 
 * @param {*} key 
 * @returns 
 */
 function reduceRepeat(target, key) {
    if (Array.isArray(target) && target.length > 0) {
      let res = []
      res = target.reduce((pre, cur) => {
        if (pre.findIndex(v => v[key] == cur[key]) >= 0) {
          return pre
        } else {
          return pre.concat(cur)
        }
      }, [])
      return res
    }
  }
  export default reduceRepeat