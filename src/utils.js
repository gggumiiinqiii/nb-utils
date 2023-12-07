/**
 *  select框搜索，判断数组中是否有任何一个属性值包含输入字符串，如果有，则返回'true'，否则返回false。
 * @param input
 * @param option
 * @param keys
 * @returns
 */
export function selectFilter(input, option, keys= 'label') {
    const inputStr = input?.toLowerCase()
    const matchArr = []
    if (Array.isArray(keys)) {
      keys.forEach(key => {
        matchArr.push(option[key].toString().toLowerCase())
      })
    } else {
      matchArr.push(option[keys].toString().toLowerCase())
    }
    return ![undefined, null, ''].includes(matchArr.find(x => x.indexOf(inputStr) >= 0))
  }
/**
 * 根据key值去重
 * @param {*} target 
 * @param {*} key 
 * @returns 
 */
 export function reduceRepeat(target, key) {
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
    }else {
        return []
    }
  }
/**
 * 空对象判断
 * @param {*} Obj 
 * @returns true就是空对象
 */
export function isEmptyObject(Obj){
	return Reflect.ownKeys(Obj).length == 0
}
 