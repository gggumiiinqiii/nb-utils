/**
 *  select框搜索，判断数组中是否有任何一个属性值包含输入字符串，如果有，则返回'true'，否则返回false。
 * @param input
 * @param option
 * @param keys
 * @returns
 */
export function selectFilter(input, option, keys = "label") {
  const inputStr = input?.toLowerCase();
  const matchArr = [];
  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      matchArr.push(option[key].toString().toLowerCase());
    });
  } else {
    matchArr.push(option[keys].toString().toLowerCase());
  }
  return ![undefined, null, ""].includes(
    matchArr.find((x) => x.indexOf(inputStr) >= 0)
  );
}
/**
 * 根据key值去重
 * @param {*} target
 * @param {*} key
 * @returns
 */
export function reduceRepeat(target, key) {
  if (Array.isArray(target) && target.length > 0) {
    let res = [];
    res = target.reduce((pre, cur) => {
      if (pre.findIndex((v) => v[key] == cur[key]) >= 0) {
        return pre;
      } else {
        return pre.concat(cur);
      }
    }, []);
    return res;
  } else {
    return [];
  }
}
/**
 * 空对象判断
 * @param {*} Obj
 * @returns true就是空对象
 */
export function isEmptyObject(Obj) {
  return Reflect.ownKeys(Obj).length == 0;
}
/**
 * 判断是否为null\undefined\[]\''\{}
 * @param {*} value
 * @returns
 */
export function isEmpty(value) {
  if (value === null || value === undefined) {
    return true;
  }

  if (Array.isArray(value) || typeof value === "string") {
    return value.length === 0;
  }

  if (typeof value === "object") {
    return isEmptyObject(value);
  }

  return false;
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

  let maxLength = 0; // 记录最长公共子串的长度
  let endIndex = 0; // 记录最长公共子串在 str1 中结束的索引位置

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
/**
 * 计算数字的每个位数的指定次方的合
 * @param {*} num  输入的数字。
 * @param {*} pow 指定的次方，默认为2。
 * @returns  返回每个位数的指定次方的和。
 */
export const calculateSumOfSquares = (num, pow = 2) => {
  let sum = 0;
  while (num > 0) {
    sum += Math.pow(num % 10, pow);
    num = Math.floor(num / 10);
  }
  return sum;
};
export const resize = () => {
  const threshold = 100;
  let widthThreshold = window.outerWidth - window.innerWidth > threshold;
  let heightThreshold = window.outerHeight - window.innerHeight > threshold;
  if (widthThreshold || heightThreshold) {
    console.log("控制台打开了");
  }
  //  window.addEventListener("resize", resize);
};
//只保留树中包含在 idsToKeep 数组中的节点以及它们的所有父节点。
export function filterTree(tree, idsToKeep) {
  return tree.reduce((acc, node) => {
    const newNode = { ...node };
    if (node.children) {
      newNode.children = filterTree(node.children, idsToKeep);
    }
    if (
      idsToKeep.includes(node.id) ||
      (newNode.children && newNode.children.length > 0)
    ) {
      acc.push(newNode);
    }
    return acc;
  }, []);
}
/**
 * 数字计算
 * @param {*} s
 * @returns
 */
export function calculate(s) {
  if (!isValidExpression(s)) {
    return "非法计算表达式";
  }
  let stackNum = []; // 存储数字的栈
  let stackOp = []; // 存储运算符的栈
  let num = 0;
  let sign = 1; // 符号位，默认为正数
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (!isNaN(parseInt(char))) {
      num = num * 10 + parseInt(char);
    } else if (char === "+") {
      result += sign * num;
      num = 0;
      sign = 1;
    } else if (char === "-") {
      result += sign * num;
      num = 0;
      sign = -1;
    } else if (char === "*") {
      // 处理乘法运算
      const nextNum = parseInt(s[i + 1]);
      num *= nextNum;
      i++; // 跳过下一个数字字符
    } else if (char === "/") {
      // 处理除法运算
      const nextNum = parseInt(s[i + 1]);
      num = Math.floor(num / nextNum); // 使用 floor 取整，保留整数部分
      i++; // 跳过下一个数字字符
    } else if (char === "(") {
      stackNum.push(result);
      stackOp.push(sign);
      result = 0;
      sign = 1;
    } else if (char === ")") {
      result += sign * num;
      result *= stackOp.pop();
      result += stackNum.pop();
      num = 0;
    }
  }

  return result + sign * num;
}
/**
 * 表达式校验
 * @param {*} s
 * @returns
 */
export function isValidExpression(s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.length === 0 || stack.pop() !== "(") {
        return false; // 括号不匹配
      }
    } else if (char === "+" || char === "-" || char === "*" || char === "/") {
      // 运算符的前后应该有数字，或者前一个字符为右括号，后一个字符为左括号
      if ((i === 0 || isNaN(parseInt(s[i - 1]))) && s[i - 1] !== ")") {
        return false;
      }
      if (
        (i === s.length - 1 || isNaN(parseInt(s[i + 1]))) &&
        s[i + 1] !== "("
      ) {
        return false;
      }
    } else if (!isNaN(parseInt(char))) {
      // 检查数字的格式
      let j = i + 1;
      while (j < s.length && !isNaN(parseInt(s[j]))) {
        j++;
      }
      if (j < s.length && s[j] === "(") {
        return false; // 数字后面不能直接跟左括号
      }
      i = j - 1;
    } else if (char !== " ") {
      return false; // 非法字符
    }
  }

  if (stack.length > 0) {
    return false; // 括号不匹配
  }

  return true;
}
/**
 * 模运算:-7 mod 3 =2
 * @param {*} a
 * @param {*} b
 * @returns
 */
export function mod(a, b) {
  return ((a % b) + b) % b;
}
/**
 * 版本比较 compareVersion('1.11.0', '1.9.9') // 1
 * @param {*} v1
 * @param {*} v2
 * @returns
 */
export function compareVersion(v1, v2) {
  v1 = v1.split(".");
  v2 = v2.split(".");
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }
  while (v2.length < len) {
    v2.push("0");
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}
/**
 * 内存大小转成带有单位的数值
 * @param {*} size
 * @returns
 */
export function computerMemoryUnit(size) {
  if (!size) return "";

  const units = ["B", "KB", "MB", "GB"];
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // 保留两位小数，并转换成字符串
  let formattedSize = size.toFixed(2);

  // 去掉小数部分为00的情况
  if (formattedSize.endsWith(".00")) {
    formattedSize = formattedSize.slice(0, formattedSize.indexOf("."));
  }

  return formattedSize + units[unitIndex];
}
/**
 * 数组去重
 * @param {*} arr
 * @returns
 */
export function unique(arr) {
  const map = new Map();
  const result = [];
  for (let item of arr) {
    if (!map.has(item)) {
      map.set(item, true);
      result.push(item);
    }
  }
  return result;
}
/**
 * 基于权重的抽奖算法
 * @param {*} drawCount
 * @returns
 */
export function urLucky(drawCount) {
  const jsonQuiz = [
    { username: "张三", times: 24 },
    { username: "李四", times: 1 },
    { username: "王二", times: 6 },
    { username: "麻子", times: 9 },
  ];

  // 计算总权重
  const totalTimes = jsonQuiz.reduce((sum, person) => sum + person.times, 0);

  // 创建权重分布数组
  const weightedPool = [];
  jsonQuiz.forEach((person) => {
    const weight = person.times / totalTimes;
    //四舍五入函数，按照概率，在10000条数据中分配
    for (let i = 0; i < Math.round(weight * 10000); i++) {
      weightedPool.push(person.username);
    }
  });
  // 0 - 9999
  console.log(weightedPool);
  // 抽奖,set是去重的
  const winners = new Set();
  while (winners.size < drawCount) {
    //大于等于0 小于1
    const randomIndex = Math.floor(Math.random() * weightedPool.length);
    winners.add(weightedPool[randomIndex]);
  }

  return Array.from(winners);
}
/**
 * 不用跑定时任务，计算差值就可以了
 */
export function setHappyMessage() {
  // 获取当前时间
  const now = new Date();

  // 设置目标时间：5月20日 13:14
  const targetDate = new Date(now.getFullYear(), 4, 20, 13, 14, 0, 0); // 月份从0开始，5月是4

  // 如果目标时间已经过去，设置目标时间为明年的 5 月 20 日 13:14
  if (now > targetDate) {
    targetDate.setFullYear(now.getFullYear() + 1);
  }

  // 计算到目标时间的毫秒差
  const timeDiff = targetDate - now;
  console.log(timeDiff);
  // 使用 setTimeout 来设置定时任务
  setTimeout(function () {
    console.log("happy!");
  }, timeDiff);
}
/**
 * 金额格式化
 * @param {*} amount
 * @param {*} unit
 * @returns
 */
export function formatAmount(amount, unit = "元") {
  unit === "分" ? (amount /= 100) : "";
  // 格式化整数部分，并加上千位分隔符
  let [integer, decimal] = String(amount).split(".");

  // 处理整数部分的千位分隔符
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (!decimal) {
    decimal = "00";
  } else if (decimal.length == 1) {
    decimal = decimal + "0";
  }
  // 返回格式化后的金额
  return `${integer}.${decimal}`;
}
/**
 * 防抖
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
/**
 * 节流
 * @param {*} fn
 * @param {*} interval
 */
export function throttle(fn, dealy) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime > dealy) {
      fn(...args);
      lastTime = now;
    }
  };
}
/**
 * 二进制文件导出
 * @param {*} res
 * @param {*} name
 */
export function downloadContent(res, name = "") {
  const data = res.data;
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  if (!name) {
    if (res.headers && res.headers["content-disposition"]) {
      name = decodeURI(
        res.headers["content-disposition"].split(";")[1].split("=")[1]
      );
    }
  }
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
/**
 * uuid
 * @returns
 */
export function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
function isPlainObject(obj) {
  return (
    typeof obj === "object" &&
    Object.prototype.toString.call(obj) === "[object Object]"
  );
}
/**
 * 是否是相同对象
 * @param {*} initObj
 * @param {*} sourseObj
 * @returns
 */
export function isEqualObject(initObj, sourseObj) {
  if (!isPlainObject(initObj) || !isPlainObject(sourseObj)) {
    return initObj === sourseObj;
  }
  if (Object.keys(initObj).length !== Object.keys(sourseObj).length) {
    return false;
  }
  for (const key in initObj) {
    if (isPlainObject(initObj[key]) && isPlainObject(sourseObj[key])) {
      if (!isEqualObject(initObj[key], sourseObj[key])) {
        return false;
      }
    } else if (initObj[key] !== sourseObj[key]) {
      return false;
    }
  }
  return true;
}

export async function repeatFn(task, count = 1, millSecond = 1000) {
  async function wait() {
    return new Promise((res) => {
      setTimeout(res, millSecond);
    });
  }
  while (count--) {
    await wait();
    task();
  }
}
