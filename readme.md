nb-utils
### check you registry
// show your rigistry
npm config get registry
// shoult set default npm registry to publish
npm config set registry https://registry.npmjs.org/
// set npm registry as taobao regisrty
npm config set registry https://registry.npmmirror.com/
### how to publish
//  v1.0.0->v1.0.1
npm version patch 
//  v1.0.0->v1.1.0
npm version minor
//  v1.0.0->v2.0.0
npm version major

npm publish
###  how to test
npm run build ->go to dist to run

### 如何使用这个工具库
npm install nb-utils
```js
    import {calculateSumOfSquares} from 'nb-utils'
```
### 对应得函数,传参及返回参数

函数     | 传参| 返回值 | 用途
-------- | ----- | ----- | ----
selectFilter  | (用户输入得值,可供选择得参数,需要匹配得参数支持字符串和字符串数组) |匹配到得数组 | 用于a-select组件得前端搜索
reduceRepeat  | (数组对象,key值)|数组对象 | 根据key值对数组对象去重
calculateSumOfSquares  | (输入得数字,指定的次方默认为2)|返回每个位数的指定次方的和 |