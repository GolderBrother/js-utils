/*
 * @Description: 4. 第四部分：对象相关工具函数 
 * @Author: james.zhang 
 * @Date: 2019-10-21 22:27:40 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-10-21 23:04:32
 */

// 1. dayOfYear：当前日期在一年中的第几天
const dayOfYear = (date = +new Date()) => Math.floor((+new Date(date) - (+new Date(new Date(date).getFullYear(), 0, 0))) / (24 * 3600 * 1000))
console.log(dayOfYear(new Date())) // 294

// 2. forOwn：迭代属性并执行回调
const forOwn = (obj={}, fn = () => {}) => Object.keys(obj).forEach(key => fn(obj[key], key, obj))
console.log(forOwn({name: 'james', age: 18}, (v, k, obj) => console.log(v, k, obj)))
// james name { name: 'james', age: 18 }
// 18 'age' { name: 'james', age: 18 }

// 3. Get Time From Date：返回当前24小时制时间的字符串
const getColonTimeFromDate = (date = new Date()) => date.toTimeString().slice(0, 8)
console.log(getColonTimeFromDate(new Date())) // 22:37:09

// 5. is：检查值是否为特定类型(除了null和undefined之类的)
const isType = (type, val) => [, null].includes(val) ? (val === null) : val.constructor === type
console.log(isType(String, '', )) // true
console.log(isType(null, 'null')) // false
console.log(isType(Array, [1])); // true
console.log(isType(ArrayBuffer, new ArrayBuffer())); // true
console.log(isType(Map, new Map())); // true
console.log(isType(RegExp, /./g)); // true
console.log(isType(Set, new Set())); // true
console.log(isType(WeakMap, new WeakMap())); // true
console.log(isType(WeakSet, new WeakSet())); // true
console.log(isType(String, '')); // true
console.log(isType(String, new String(''))); // true
console.log(isType(Number, 1)); // true
console.log(isType(Number, new Number(1))); // true
console.log(isType(Boolean, true)); // true
console.log(isType(Boolean, new Boolean(true))); // true

// 6. isAfterDate：检查是否在某日期后
const isAfterDate = (dateA, dateB) => dateA > dateB
console.log(isAfterDate(new Date(), new Date('2019.10.20'))) // true

// 7. isBeforeDate：检查是否在某日期前
const isBeforeDate = (dateA, dateB) => dateA < dateB
console.log(isBeforeDate(new Date(), new Date('2019.10.22'))) // true

// 8. tomorrow：获取明天的字符串格式时间
const tomorrow = (date = new Date()) => {
    const d = new Date(date);
    let tom = '';
    d.setDate(d.getDate() + 1);
    tom = d.toISOString().split('T') && d.toISOString().split('T')[0]
    return tom
}
console.log(tomorrow()) // 2019-10-22
console.log(tomorrow(new Date('2019-01-02'))) // 2019-01-03

// 9. equals：全等判断
// 在两个变量之间进行深度比较以确定它们是否全等。

// 此代码段精简的核心在于Array.prototype.every()的使用(递归)。

const equals = (a, b) => {
    if(a === b) return true
    if(a instanceof Date && b instanceof Date && a.getTime() === b.getTime()) return true
    if(!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return true
    if(a.prototype !== b.prototype) return false
    let keys = obj => Object.keys(obj)
    if(keys(a).length !== keys(b).length) return false
    return keys(a).every(key => equals(a[key], b[key]))
}
console.log(equals(null, undefined)) // true
console.log(equals({ a: [2, { e: 3 }], b: [4], c: 'foo' }, { a: [2, { e: 3 }], b: [4], c: 'foo' })); // true


