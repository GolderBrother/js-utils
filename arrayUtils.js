// 1. 第一部分：数组
// 1. all：布尔全等判断

const all = (arr, fn = Boolean) => arr.every(fn);

console.log(all([1, 2, 3], x => x > 1)); // false
console.log(all([1, 2, 3])); // true

// 2. allEqual：检查数组各项相等
const allEqual = (arr) => arr.every(v => v === arr[0])
console.log(allEqual([1, 2, 3])); // false

// 3. approximatelyEqual：约等于
const approximatelyEqual = (v1, v2, epsilon = 0.001) => Math.abs(v1 - v2) < epsilon;
console.log(approximatelyEqual(Math.PI / 2.0, 1.5708)); // true

// 4. arrayToCSV：数组转CSV格式（带空格的字符串）
const arrayToCSV = (arr, delimiter = ",") => arr.map(v => (Array.isArray(v) ? v.map(n => `"${n}"`) : [`"${v}"`]).join(delimiter)).join('\n');
console.log(arrayToCSV([
    ['a', 'b'],
    ['c', 'd']
]));
/* "a","b"
"c","d" */
console.log(arrayToCSV(['a', ['b', 'c']]));
/* "a"
"b","c" */

// 5. arrayToHtmlList：数组转li列表
// 此代码段将数组的元素转换为<li>标签，并将其附加到给定ID的列表中。
// const arrayToHtmlList = (arr, listID) => (el => (
//     el = document.querySelector(`#${listID}`),
//     el && (el.innerHTML += arr.map(item => `<li>${item}</li>`).join(""))
// ))();
// arrayToHtmlList(['item 1', 'item 2'], 'myListID');

// 6. average：平均数
const average = (...nums) => Number(nums.reduce((start, val) => start + val, 0)) / nums.length;
console.log(average(...[1, 2, 3])) // 2
console.log(average(4, 5, 6)) // 5

// 7. averageBy：数组对象属性平均数
// 此代码段将获取数组对象属性的平均值
const averageBy = (arrObj, fn) => Number(arrObj.map(typeof fn === 'function' ? fn : item => item[fn]).reduce((acc, val) => acc + val, 0)) / arrObj.length;
console.log(averageBy([{
    n: 4
}, {
    n: 2
}, {
    n: 8
}, {
    n: 6
}], o => o.n)) // 5
console.log(averageBy([{
    n: 4
}, {
    n: 2
}, {
    n: 8
}, {
    n: 6
}], 'n')) // 5

// 8. bifurcate：拆分断言后的数组
// 可以根据每个元素返回的值，使用reduce()和push() 将元素添加到第二次参数fn中 。
// [[], []]数组里面的第一个数组用来存放断言为true的元素，第二个数组用来存放断言为false的元素
const bifurcate = (arr, filter) => arr.reduce((acc, val, index) => (arr[filter[index] ? 0 : 1]), [
    [],
    []
])
console.log(bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]))

// 9. castArray：其它类型转数组
const castArray = val => Array.isArray(val) ? val : [val];
console.log(castArray([1, 2, 3])) // [ 1, 2, 3 ]
console.log(castArray(1)) // [ 1 ]
console.log(castArray('foo')) // [ 'foo' ]

// 10. compact：去除数组中的无效/无用值
// Boolean就是一个函数,将输入值转换为boolean类型的值
const compact = arr => arr.filter(Boolean)
console.log(compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])) // [ 1, 2, 3, 'a', 's', 34 ]

// 11. countOccurrences：检测数值出现次数
const countOccurrences = (arr, val) => arr.reduce((acc, v) => v === val ? ++acc : acc, 0)
console.log(countOccurrences([1, 1, 2, 1, 2, 3], 1)) // 3

// 12. deepFlatten：递归扁平化数组
const deepFlatten = (arr) => [].concat(...arr.map(val => Array.isArray(val) ? deepFlatten(val) : val))
console.log(deepFlatten([1, [2],
    [
        [3], 4
    ], 5
]))

// 13. difference：寻找差异（并返回第一个数组独有的）
// 此代码段查找两个数组之间的差异，并返回第一个数组独有的。
const difference = (a, b) => {
    const s = new Set(b);
    return a.filter(n => !s.has(n))
}

console.log(difference([1, 2, 3], [1, 2, 4])); // [ 3 ]

// 14. differenceBy：先执行再寻找差异
// 在将给定函数应用于两个列表的每个元素之后，此方法返回两个数组之间的差异。

const differenceBy = (a, b, fn = v => v) => {
    const s = new Set(b.map(fn));
    return a.filter(v => !s.has(fn(v)));
}
console.log(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)) // [ 1.2 ]
console.log(differenceBy([{
    x: 2
}, {
    x: 1
}], [{
    x: 1
}], v => v.x)) // [ { x: 2 } ]

// 15. dropWhile：删除不符合条件的值
// 此代码段从数组顶部开始删除元素，直到传递的函数返回为true。
const dropWhile = (arr, func) => {
    while (arr && arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
    return arr;
}
console.log(dropWhile([1, 2, 3, 4], n => n >= 3)) // [ 3, 4 ]

// 16. flatten：指定深度扁平化数组
// 此代码段第二参数可指定深度。
const flattenDeep = (arr, depth = 1) => arr.reduce((a, val) => a.concat((depth > 1 && Array.isArray(val) ? flattenDeep(val, depth - 1) : val)), [])
console.log(flattenDeep([1, [2], 3, 4]))
console.log(flattenDeep([1, [2, [3, [4, 5], 6], 7], 8], 2)) // [ 1, 2, 3, [ 4, 5 ], 6, 7, 8 ]

// 17. indexOfAll：返回数组中某值的所有索引
// 此代码段可用于获取数组中某个值的所有索引，如果此数组中未包含该值，则返回一个空数组。

const indexOfAll = (arr, val) => arr.reduce((acc, v, i) => v === val ? [...acc, i] : acc, []);
console.log(indexOfAll([1, 2, 3, 1, 2, 3], 1)) // [ 0, 3 ]

// 18. intersection：两数组的交集
const intersection = (a, b) => {
    const s = new Set(b);
    return a.filter(v => s.has(v))
}
console.log(intersection([1, 2, 3], [4, 3, 2])) // [ 2, 3 ]

// 19. intersectionWith：两数组都符合条件的交集
// 此片段可用于在对两个数组的每个元素执行了函数之后，返回两个数组中存在的元素列表。
const intersectionWith = (a = [], b = [], fn = v => v) => {
    const s = new Set(b.map(fn))
    return a.filter(v => s.has(fn(v)))
}
console.log(intersectionWith([2.1, 1.2], [2.3, 3.4], Math.floor)) // [ 2.1 ]

// 20. intersectionWith：先比较后返回交集
const intersectionWithCompare = (a = [], b = [], comp = v => v) => a.filter(x => b.findIndex(y => comp(x, y)) !== -1);
console.log(intersectionWithCompare([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b))); // [ 1.5, 3, 0 ]

// 21. minN：返回指定长度的升序数组
const minN = (arr, len = 1) => [...arr].sort((a, b) => a - b).slice(0, len);
console.log(minN([1, 2, 3])) // [ 1 ]
console.log(minN([1, 2, 3], 2)) // [ 1, 2 ]

// 22. negate：根据条件反向筛选
const negate = func => (...args) => !func(...args);
// 过滤偶数
console.log([1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0))) // [ 1, 3, 5 ]

// 23. randomIntArrayInRange：生成两数之间指定长度的随机数组
// Array.from的第一个参数可以是一个类数组(具有length属性),第二个参数回调函数，接收遍历到的每一项(v,k 类似map方法)
const randomIntArrayInRange = (min, max, len = 1) => Array.from({
    length: len
}, () => Math.floor(Math.random() * (max - min + 1) + min));
console.log(randomIntArrayInRange(5, 10, 10))

// 24. sample：在指定数组中获取随机数
const sample = (arr = []) => arr[Math.floor(Math.random() * arr.length)];
console.log(sample([3, 7, 9, 11])) // 3

// 25. sampleSize：在指定数组中获取指定长度的随机数
// 此代码段可用于从数组中获取指定长度的随机数，直至穷尽数组。 使用Fisher-Yates算法对数组中的元素进行随机选择。
const sampleSize = (arr = [], n = 1) => {
    let len = arr.length;
    while (len) {
        const i = Math.floor(Math.random() * (len--));
        // 关键！！！
        [arr[len], arr[i]] = [arr[i], arr[len]];
    }
    return arr.slice(0, n);
}

console.log(sampleSize([1, 2, 3], 2))

// 26. shuffle：“洗牌” 数组
// 此代码段使用Fisher-Yates算法随机排序数组的元素。

const shuffle = (arr = []) => {
    let len = arr.length,
        i = 0;
    while (len) {
        i = Math.floor(Math.random() * len--);
        // 随机排序的关键，数组解构元素对调
        [arr[len], arr[i]] = [arr[i], arr[len]];
    }
    return arr
}

console.log(shuffle([1, 2, 3])) // [ 2, 3, 1 ]

// 27. nest：根据parent_id生成树结构（阿里一面真题）
// 根据每项的parent_id，生成具体树形结构的对象。
// children: nest(items, item.id) 这个递归很关键，将子元素放到children中
const nest = (items, id = null, link = 'parent_id') => items.filter(item => item[link] === id).map(item => ({
    ...item,
    children: nest(items, item.id)
}))
const comments = [{
        id: 1,
        parent_id: null
    },
    {
        id: 2,
        parent_id: 1
    },
    {
        id: 3,
        parent_id: 1
    },
    {
        id: 4,
        parent_id: 2
    },
    {
        id: 5,
        parent_id: 4
    }
];

const nestedComments = nest(comments);
// 可以复制到浏览器的控制台下查看
console.log(nestedComments); // [ { id: 1, parent_id: null, children: [ [Object], [Object] ] } ]