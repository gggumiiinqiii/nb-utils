// format.js 格式化文件
const Format = {
  /**
   * 格式化金额展示：12341234.246 -> $12,341,234.25
   * @param {number} money - 金额数值
   * @param {string} symbol - 货币符号，默认 ''
   * @param {number} decimals - 小数位数，默认 2
   * @returns {string} 格式化后的金额字符串
   */
  formatMoney: (money, symbol = "", decimals = 2) =>
    formatToFixed(money, decimals)
      .replace(/\B(?=(\d{3})+\b)/g, ",")
      .replace(/^/, `${symbol}`),
};

// 解决 toFixed 精度问题
function formatToFixed(money, decimals = 2) {
  return (
    Math.round((parseFloat(money) + Number.EPSILON) * Math.pow(10, decimals)) /
    Math.pow(10, decimals)
  ).toFixed(decimals);
}

export { Format };
