### 如何使用这个工具库
npm i gzealnb-utils
```js
    import {calculateSumOfSquares} from 'nb-utils'
```
### 对应得函数,传参及返回参数

函数     | 传参| 返回值 | 用途
-------- | ----- | ----- | ----
selectFilter  | (用户输入得值,可供选择得参数,需要匹配得参数支持字符串和字符串数组) |匹配到得数组 | 用于a-select组件得前端搜索
reduceRepeat  | (数组对象,key值)|数组对象 | 根据key值对数组对象去重
calculateSumOfSquares  | (2:number,5:number)|32 | 计算数字的每个位数的指定次方的合
calculate  | ('2*2':string) | 4 | 算术表达式支持+-*/()
compareVersion | ('1.11.0':string,'1.9.9':String) | 1 | 比较两个版本的大小，v1>v2返回1，v1小于v2返回-1,v1等于v2返回0
computerMemoryUnit | (1024:number) | '1KB' |内存大小转成带有单位的数值,默认是一个字节
unique | ([1,2,3,1]) | [1,2,3] |数组去除
formatAmount | (1000,'分') | 10.00 | 金额转换不足补0，不会四舍五入,支持分转元