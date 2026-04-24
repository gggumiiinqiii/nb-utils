# gzealnb-utils

一些帮助前端开发的工具函数库。

## 安装

```bash
npm i gzealnb-utils
```

## 使用

```js
import {
  debounce,
  throttle,
  formatAmount,
  calculate,
  compareVersion,
  computerMemoryUnit,
  unique,
  isEqualObject,
  isEmpty,
  isEmptyObject,
  uuid,
  reduceRepeat,
  selectFilter,
  filterTree,
  downloadContent,
  repeatFn,
  findContinuousIntersection,
  findContinuousIntersectionDP,
  calculateSumOfSquares,
  mod,
  Format,
  Validate,
  EventBus,
  mapObject,
  mapObjectSkip,
} from "gzealnb-utils";
```

## API 文档

### 表单校验

| 函数 | 说明 |
|------|------|
| `Validate.mobileCheck(value)` | 手机号校验 |
| `Validate.IDCardCheck(value)` | 身份证校验（18位） |
| `Validate.emailCheck(value)` | 邮箱校验 |

### 金额格式化

| 函数 | 说明 |
|------|------|
| `Format.formatMoney(money, symbol='', decimals=2)` | 金额格式化，例: `12345.6 -> "$12,345.60"` |
| `formatAmount(amount, unit='元')` | 金额转换，支持"分"转"元"，补0不四舍五入 |

### 数组/对象工具

| 函数 | 说明 |
|------|------|
| `unique(arr)` | 数组去重 |
| `reduceRepeat(target, key)` | 根据 key 值对数组对象去重 |
| `filterTree(tree, idsToKeep)` | 树过滤，保留指定节点及其父节点 |
| `isEmptyObject(Obj)` | 判断是否为空对象 `{}` |
| `isEmpty(value)` | 判断是否为 null/undefined/[]/''/{} |
| `isEqualObject(a, b)` | 深度比较两个值是否相等（支持对象、数组、Date） |
| `mapObject(object, mapper, options)` | 对象映射转换，可选深度递归 |

### 字符串工具

| 函数 | 说明 |
|------|------|
| `findContinuousIntersection(str1, str2)` | 最长公共子串（暴力法） |
| `findContinuousIntersectionDP(str1, str2)` | 最长公共子串（动态规划） |

### 数字计算

| 函数 | 说明 |
|------|------|
| `calculate(expr)` | 算术表达式计算，支持 `+-*/()` 和多位数 |
| `calculateSumOfSquares(num, pow=2)` | 数字各位的指定次方之和 |
| `mod(a, b)` | 正数模运算，例: `mod(-7, 3) = 2` |
| `compareVersion(v1, v2)` | 版本号比较，返回 `1 / -1 / 0` |
| `computerMemoryUnit(size)` | 字节大小转可读单位，例: `1024 -> "1KB"` |

### 函数工具

| 函数 | 说明 |
|------|------|
| `debounce(fn, delay)` | 防抖 |
| `throttle(fn, interval)` | 节流 |
| `repeatFn(task, count=1, millSecond=1000)` | 每隔指定毫秒重复执行函数 |
| `uuid()` | 生成 UUID |

### 事件总线

| API | 说明 |
|------|------|
| `new EventBus()` | 创建事件总线实例 |
| `bus.on(type, handler)` | 订阅事件 |
| `bus.emit(type, ...args)` | 发布事件 |
| `bus.off(type, handler?)` | 取消订阅（不传 handler 则清空该事件） |
| `bus.once(type, handler)` | 一次性订阅 |

### 其他

| 函数 | 说明 |
|------|------|
| `selectFilter(input, option, keys)` | Select 搜索过滤 |
| `downloadContent(res, name?)` | 二进制文件下载 |
| `urLucky(drawCount)` | 基于权重的抽奖算法（示例数据） |
| `setHappyMessage()` | 定时到 5/20 13:14 输出 "happy!" |

### 前端监控（monitor）

| 函数 | 说明 |
|------|------|
| `handleErr(error)` | 统一错误处理函数 |
| `debouncedHandleErr(error)` | 防抖包装的错误处理（2秒间隔） |
| `throttledHandleErr(error)` | 节流包装的错误处理（30分钟间隔） |
| `randomString()` | 生成随机字符串（用于 uid） |
| `Config` | 监控配置对象 |
| `getCommonMsg()` | 获取通用监控数据 |
| `on(event, fn, remove?)` | DOM 事件绑定 |
