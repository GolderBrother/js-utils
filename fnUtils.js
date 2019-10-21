/*
 * @Author: 2. 第二部分：函数
 * @Date: 2019-10-21 09:20:13 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-10-21 23:05:14
 * @Description: /api 
 */
// 1. attempt：捕获函数运行异常
// 该代码段执行一个函数，返回结果或捕获的错误对象。
const attempt = (fn, ...args) => {
    try {
        return fn(...args)
    } catch (error) {
        return error instanceof Error ? error : new Error(error)
    }
}

let elements = attempt(function (arg) {
    return document.querySelectorAll(arg)
}, '>_>');
// DOMException: Failed to execute 'querySelectorAll' on 'Document': '>_>' is not a valid selector.
console.log(elements);
if (elements instanceof Error) elements = [];
console.log(elements);

// 2. defer：推迟执行
// 此代码段延迟了函数的执行，直到清除了当前调用堆栈。

const defer = (fn, delay = 1, ...args) => setTimeout(fn, delay, ...args);
defer(console.log, 1, 'a')
console.log('b')
// b -> a 先打印b,后打印a

// 3. runPromisesInSeries：运行多个Promises
const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
const delay = time => new Promise(resolve => setTimeout(resolve, time));
const delayTask1 = () => delay(1000),
    delayTask2 = () => delay(2000);
console.time("time")
console.log(runPromisesInSeries([delayTask1, delayTask2]))
console.timeEnd("time")
// //依次执行每个Promises ，总共至少需要3秒钟才能完成 time: 3.817ms

// 4. timeTaken：计算函数执行时间
const timeTaken = callback => {
    console.time("timeTaken")
    const res = callback()
    console.timeEnd("timeTaken")
    return res
}
timeTaken(() => {
    console.log(Math.pow(2, 10)) // 1024
    console.log(2 ** 10) // 1024
    // timeTaken: 3.101ms
})
// timeTaken: 0.076ms

// 5. createEventHub：简单的发布/订阅模式
// 创建一个发布/订阅（发布-订阅）事件集线，有emit，on和off方法。

// 1) 使用Object.create(null)创建一个空的hub对象。
// 2) emit，根据event参数解析处理程序数组，然后.forEach()通过传入数据作为参数来运行每个处理程序。
// 3) on，为事件创建一个数组（若不存在则为空数组），然后.push()将处理程序添加到该数组。
// 4) off，用.findIndex()在事件数组中查找处理程序的索引，并使用.splice()删除。
const createEventHub = () => ({
    // 存储依赖项的数组
    hub: Object.create(null),
    // 发布，执行依赖里面的方法
    emit(event, data) {
        (this.hub[event] || []).forEach(handler => handler(data))
    },
    // 订阅，收集依赖
    on(event, handler) {
        (this.hub[event] || (this.hub[event] = [])).push(handler)
    },
    // 解除订阅
    off(event, handler, callback) {
        let index = (this.hub[event] || []).findIndex(h => h === handler);
        index > -1 && this.hub[event].splice(index, 1);
        this.hub[event].length === 0 && delete this.hub[event];
        callback && callback();
    }
})

const handler = data => console.log(data);
const hub = createEventHub();
let increment = 0;

// 订阅，监听不同事件
hub.on("message", handler)
hub.on("message", () => console.log('receive message~'))
hub.on("increment", (num) => increment += num);

hub.emit("message", 'hello world') // hello world 'receive message~'
hub.emit("message", {
    hello: 'world'
}) // { hello: 'world' } receive message~
hub.emit("increment", 10)

hub.off("message", handler, () => {
    console.log(increment) // 10
    console.log(hub)
    console.log('message end~~');
}) // message end~~

// 6. memoize：缓存函数
// 通过实例化一个Map对象来创建一个空的缓存。

// 通过检查输入值的函数输出是否已缓存，返回存储一个参数的函数，该参数将被提供给已记忆的函数；如果没有，则存储并返回它。
const memoize = fn => {
    const cache = new Map()
    const cached = function (val) {
        return cached.has(val) ? cached.get(val) : cached.set(val, fn.call(this, val)) && cached.get(val)
    }
    cached.cache = cache
    return cached
}

// Ps: 这个版本可能不是很清晰，还有Vue源码版的：
/**
 * Create a cached version of a pure function.
 */
/* export function cached<F: Function> (fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn (str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
} */

// 7. once：只调用一次的函数 本质上就是高阶函数结合闭包
const once = fn => {
    let isCalled = false;
    return function () {
        if (isCalled) return;
        isCalled = true;
        fn.apply(this, arguments)
    }
}
let myOnce = once(() => console.log(1));
myOnce(); // 1
myOnce(); // 不执行

// 8. flattenObject：以键的路径扁平化对象
// 使用递归。

// 1.利用Object.keys(obj)联合Array.prototype.reduce()，以每片叶子节点转换为扁平的路径节点。
// 2.如果键的值是一个对象，则函数使用调用适当的自身prefix以创建路径Object.assign()。
// 3.否则，它将适当的前缀键值对添加到累加器对象。
// 4.prefix除非您希望每个键都有一个前缀，否则应始终省略第二个参数。
const flattenObject = (obj, prefix = '') => (
    Object.keys(obj).reduce((acc, key) => {
        const pre = prefix.length ? prefix + "." : "";
        if (obj[key] !== null && typeof obj[key] === "object") Object.assign(acc, flattenObject(obj[key], pre + key))
        else acc[pre + key] = obj[key];
        return acc;
    }, {})
)
console.log(flattenObject({
    a: {
        b: {
            c: 1
        }
    },
    d: 1
})) // { 'a.b.c': 1, d: 1 }

// 9. unflattenObject：以键的路径展开对象
// 与上面的相反，展开对象。
const unflattenObject = (obj) => (
    Object.keys(obj).reduce((acc, key) => {
        if (key.includes(".")) {
            const keys = key.split('.');
            Object.assign(acc, JSON.parse(
                `{${keys.map((value, index) => (index !== keys.length - 1 ? `"${value}":{` : `"${value}":`)).join('') + obj[key] + '}'.repeat(keys.length - 1)}}`
            ))
        } else {
            acc[key] = obj[key];
        }
        return acc;
    }, {})
)
console.log(unflattenObject({ 'a.b.c': 1, d: 1 })); // { a: { b: { c: 1 } }, d: 1 }

// 这个的用途，在做Tree组件或复杂表单时取值非常舒服。