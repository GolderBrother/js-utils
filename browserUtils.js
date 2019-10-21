/*
 * @Description: 6. 第六部分：浏览器操作及其它
 * @Author: james.zhang 
 * @Date: 2019-10-21 23:04:56 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-10-21 23:10:37
 */
// 小技能：浏览器开启内容编辑模式： 
// 在浏览器控制态执行这句命令：document.designMode = 'on'
// 就可以直接编辑网页内容

// 1. bottomVisible：检查页面底部是否可见
const bottomVisible = () => (document.documentElement.clientHeight + window.screenY) >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
console.log(bottomVisible())  // true


