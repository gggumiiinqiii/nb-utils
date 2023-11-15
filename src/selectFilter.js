/**
 *  select框搜索，判断数组中是否有任何一个属性值包含输入字符串，如果有，则返回'true'，否则返回false。
 * @param input
 * @param option
 * @param keys
 * @returns
 */
 function selectFilter(input, option, keys= 'label') {
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
  export default selectFilter