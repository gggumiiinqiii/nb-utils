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
/**
 * 判断是否为null\undefined\[]\''\{}
 * @param {*} value 
 * @returns 
 */
export function isEmpty(value) {
  if (value === null || value === undefined) {
    return true
  }

  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0
  }

  if (typeof value === 'object') {
    return isEmptyObject(value)
  }

  return false
}
/**
 * 公共字符串 0(m*m*min(m,n))
 */
export function findContinuousIntersection(str1, str2) {
  let maxLength = 0;
  let endIndex = 0;

  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      let k = 0;
      while (
        i + k < str1.length &&
        j + k < str2.length &&
        str1[i + k] === str2[j + k]
      ) {
        k++;
      }

      if (k > maxLength) {
        maxLength = k;
        endIndex = i + k;
      }
    }
  }

  return str1.substring(endIndex - maxLength, endIndex);
}
/**
 * 动态规划解决最长公共字符串O(m*n)
 * @returns 
 */
export function findContinuousIntersectionDP(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  // 创建一个二维数组用于存储子问题的解
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  let maxLength = 0;  // 记录最长公共子串的长度
  let endIndex = 0;   // 记录最长公共子串在 str1 中结束的索引位置

  // 填充动态规划表格
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;

        // 如果找到更长的公共子串，则更新 maxLength 和 endIndex
        if (dp[i][j] > maxLength) {
          maxLength = dp[i][j];
          endIndex = i;
        }
      } else {
        dp[i][j] = 0; // 如果字符不相等，重置子问题的解为0
      }
    }
  }

  // 返回最长公共子串
  return str1.substring(endIndex - maxLength, endIndex);
}
export function log(value){
  console.log(value)
}