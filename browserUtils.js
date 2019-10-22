/*
 * @Description: 6. 第六部分：浏览器操作及其它
 * @Author: james.zhang 
 * @Date: 2019-10-21 23:04:56 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-10-22 11:17:00
 */
// 小技能：浏览器开启内容编辑模式： 
// 在浏览器控制态执行这句命令：document.designMode = 'on'
// 就可以直接编辑网页内容

// 1. bottomVisible：检查页面底部是否可见
const bottomVisible = () => (document.documentElement.clientHeight + window.screenY) >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
console.log(bottomVisible())  // true

// 2. Create Directory：检查创建目录
// 此代码段调用fs模块的existsSync()检查目录是否存在，如果不存在，则mkdirSync()创建该目录。
const fs = require('fs')
const createDirIfNotExist = dir => !fs.existsSync(dir) ? fs.mkdirSync(dir) : void 0;
createDirIfNotExist('test');

// 3. getCurrentURL：返回当前链接url
const getCurrentURL = () => window.location.href
console.log(getCurrentURL()) // https://react.docschina.org/docs/getting-started.html

// 4. distance：返回两点间的距离
// 该代码段通过计算欧几里得距离来返回两点之间的距离
const distance = (x0 = 0, y0 = 0, x1 = 0, y1 = 0, n = 0) => n ? Math.hypot(x1 - x0, y1 - y0).toFixed(n) : Math.hypot(x1 - x0, y1 - y0)
console.log(distance(1, 2, 3, 4, 2)) // 2.83

// 5. elementContains：检查是否包含子元素
// 此代码段检查父元素是否包含子元素。
const elementContains = (parent, child) => parent !== child && parent.contains(child);
console.log(elementContains(document.querySelector('head'), document.querySelector('title'))) // true
console.log(elementContains(document.body, document.body)) // false

// 6. getStyle：返回指定元素的生效样式
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName]
console.log(getStyle(document.body, 'color')) // rgb(51, 51, 51)

// 7. getType：返回值或变量的类型名
const getType = (v) => v === undefined ? undefined : (v === null ? null : v.constructor.name)
console.log(getType("")) // String
console.log(getType(new Map([["name", "james"], ["age", 18]]))) // Map
console.log(getType(new Set([1,2,3]))) // Set
console.log(getType()) // undefined
console.log(getType(null)) // null

// 8. hasClass：校验指定元素的类名是否包含指定的类型
const hasClass = (el, classname) => el.classList.contains(classname)
console.log(hasClass(document.querySelector('div.main-header-box'), 'main-header-box')) // true

// 9. hide：隐藏所有的指定标签
const hide = (el = []) => [...el].forEach(e => e.style && (e.style.display = 'none'))
hide(document.querySelectorAll('h3'))

// 10. httpsRedirect：HTTP 跳转 HTTPS
const httpsRedirect = () => {
    if(location.protocol !== "https:") location.replace(`https://${location.href.split("//") ? location.href.split("//")[1] : ""}`)
}
httpsRedirect()

// 11. insertAfter：在指定元素之后插入新元素
const insertAfter = (el, htmlString = "") => el.insertAdjacentHTML('afterend', htmlString)
insertAfter(document.querySelector("head"), "<p>after</p>") 
// 会在head标签前面插入 <body><p>after</p></body> ，这边因为插入的特殊元素以及浏览器解析标签原因，会自动加入body外标签，其他正常元素是不会的

// 12. insertBefore：在指定元素之前插入新元素
const insertBefore = (el, htmlString = "") => el.insertAdjacentHTML('beforebegin', htmlString)
insertBefore(document.querySelector("head"), "<p>before</p>") 
// 会在head标签前面插入 <body><p>before</p></body> ，这边因为插入的特殊元素以及浏览器解析标签原因，会自动加入body外标签，其他正常元素是不会的

// 13. isBrowser：检查是否为浏览器环境
// 此代码段可用于确定当前运行时环境是否为浏览器。这有助于避免在服务器（节点）上运行前端模块时出错。
const isBrowser = () => !([typeof window, typeof document].includes('undefined'))
console.log(isBrowser()) // false(Node)
console.log(isBrowser()) // true(Browser)

// 14. isBrowserTab：检查当前标签页是否活动
const isBrowserTab = () => !document.hidden
console.log(isBrowserTab()) // true

// 15. nodeListToArray：转换nodeList为数组
const nodeListToArray = nodeList => [...nodeList]
const nodeListToArray2 = nodeList => Array.from(nodeList)
const nodeListToArray3 = nodeList => [...new Set(nodeList)]
console.log(nodeListToArray(document.querySelectorAll("h3")), Array.isArray(nodeListToArray(document.querySelectorAll("h3")))) // [...], true
console.log(nodeListToArray2(document.querySelectorAll("h3")), Array.isArray(nodeListToArray2(document.querySelectorAll("h3")))) // [...], true
console.log(nodeListToArray3(document.querySelectorAll("h3")), Array.isArray(nodeListToArray3(document.querySelectorAll("h3")))) // [...], true

// 16. Random Hexadecimal Color Code：随机十六进制颜色
const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    n = `#${n.slice(0, 6)}`;
    return n;
}
console.log(randomHexColorCode()) // #1f6575

// 17. scrollToTop：平滑滚动至顶部
// 该代码段可用于平滑滚动到当前页面的顶部。
const scrollToTop = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollTop > 0) {
        requestAnimationFrame(scrollToTop)
        window.scrollTo(0, scrollTop - scrollTop / 10)
    }
}
scrollToTop();

// 18. smoothScroll：滚动到指定元素区域
// 该代码段可将指定元素平滑滚动到浏览器窗口的可见区域。
const smoothScroll = element => {
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    })
}
smoothScroll("#footer")
smoothScroll(".footer")

// 19. detectDeviceType：检测移动/PC设备
const detectDeviceType = () => /Android|webOS|IPhone|IPod|BlackBerry|IEMobile|Opera Mini/g.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
// PC端的谷歌浏览器下运行 => Desktop
console.log(detectDeviceType())

// 20. getScrollPosition：返回当前的滚动位置
// 默认参数为window ，pageXOffset(pageYOffset)为第一选择，没有则用scrollLeft(scrollTop)
const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
})
console.log(getScrollPosition()) // {x: 0, y: 25243.333984375}
console.log(getScrollPosition(document.querySelector("#footer"))) // {x: 0, y: 0}

// 21. size：获取不同类型变量的字节长度
// 这个的实现非常巧妙，利用Blob类文件对象的特性，获取对象的长度。

// 另外，多重三元运算符，是真香。
const size = val => Array.isArray(val) ? val.length : val && typeof val === "object" ? val.size || val.length || Object.keys(val).length : typeof val === "string" ? new Blob([val]).size : 0;
const size2 = val => Array.isArray(val) || typeof val === "string" ? val.length : val && typeof val === "object" ? val.size || val.length || Object.keys(val).length : 0;
console.log(size([1,2,3,4,5])) // 5
console.log(size("test")) // 4
console.log(size({name: "james", age: 18})) // 2

console.log(size2([1,2,3,4,5])) // 5
console.log(size2("test")) // 4
console.log(size2({name: "james", age: 18})) // 2

// 22. escapeHTML：转义HTML
// 当然是用来防XSS攻击啦。
// 这个xss正则可以根据业务需求来自定义
const XSSREG = /[&<>'"]/g;
const escapeHTML = (str = "") => (
    str.replace(XSSREG, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag))
)
console.log(escapeHTML('<a href="#">Me & you</a>')); // &lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;
