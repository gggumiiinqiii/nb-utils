import {findContinuousIntersectionDP,mapObject,mapObjectSkip} from './index';

// 需要先执行npm run build
console.log(findContinuousIntersectionDP('aa','aab'))
const newObject = mapObject({foo: 'bar'}, (key, value) => [value, key]);
//=> {bar: 'foo'}

const newObject1 = mapObject({FOO: true, bAr: {bAz: true}}, (key, value) => [key.toLowerCase(), value]);
//=> {foo: true, bar: {bAz: true}}

const newObject2 = mapObject({FOO: true, bAr: {bAz: true}}, (key, value) => [key.toLowerCase(), value], {deep: true});
//=> {foo: true, bar: {baz: true}}

const newObject3 = mapObject({one: 1, two: 2}, (key, value) => value === 1 ? [key, value] : mapObjectSkip);
//=> {one: 1}