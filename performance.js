/*
 * @Author: yaohuang.zhang 
 * @Email: 1204788939@qq.com 
 * @Date: 2019-12-25 16:32:29 
 * @Last Modified by: yaohuang.zhang
 * @Last Modified time: 2019-12-25 16:33:37
 * @Description: 性能监控模块 
 */

// 启动模块 -> 计算模块(计算耗时) -> 单位转换(转换成ms、mb) -> 推送后端模块(是否发送到后端)

// 单位转换模块
const getMB = (size) => `${Math.floor(Number(size) / 1024 / 1024, 4)}MB`;
const getSeconds = (time) => `${Number(time) / 1000}s`;

// 计算模块
function calc(type, num) {
    const performance = window.performance;
    const calcFactory = {
        // 获取TCP连接时间
        getTCPTime: function (arg) {
            return `${getSeconds(performance.timing.connectEnd - performance.timing.connectStart)}, 预期${arg}`;
        },
        // 获取dom渲染完成时间
        getDOMTime: function (arg) {
            return `${getSeconds(performance.timing.domComplete - performance.timing.domLoading)}, 预期${arg}`;
        },
        // 获取请求响应时间
        getResponseTime: function (arg) {
            return `${getSeconds(performance.timing.responseEnd - performance.timing.responseStart)}, 预期${arg}`;
        },
        // 获取内存占用
        getMemorySize: function () {
            return getMB(performance.memory.usedJSHeapSize)
        }
    };
    const arr = Array.prototype.slice.call(arguments);
    arr.shift();
    const time = calcFactory[type] && calcFactory[type].apply(this, arr) || 0;
    return time;
}

// 转换模块
function transform(type, val) {
    const transformMap = new Map([
        ['TCPTime', `TCP连接耗时 ${val}`],
        ['DOMTime', `dom渲染耗时 ${val}`],
        ['ResponseTime', `响应耗时 ${val}`],
        ['MemorySize', `内存占用 ${val}`]
    ]);
    return transformMap.get(type) || '';
}
// 性能监控启动模块
export function performanceMonitor() {
    const [tcpTimeMsg, responseTimeMsg, memorySizeMsg] = [transform('TCPTime', calc('getTCPTime', '0.001s')), transform('ResponseTime', calc('getResponseTime', '0.001s')), transform('MemorySize', calc('getMemorySize', 10))];
    window.onload = function () {
        const domTimeMsg = transform('DOMTime', calc('getDOMTime', '1s'));
        console.log(domTimeMsg);
    }
    console.log(tcpTimeMsg, responseTimeMsg, memorySizeMsg);
}

// use 
performanceMonitor();
