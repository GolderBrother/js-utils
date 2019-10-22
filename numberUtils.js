/*
 * @Author: yaohuang.zhang@zkteco.com 
 * @Date: 2019-10-22 09:00:07 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-10-22 09:25:42
 * @Description: 5. 第五部分：数字 
 */
// 1. randomIntegerInRange：生成指定范围的随机整数
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
console.log(randomIntegerInRange(5, 10)) // 10

// 2. randomNumberInRange：生成指定范围的随机小数
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
console.log(randomNumberInRange(2, 7)) // 3.404914705115028

// 3. round：四舍五入到指定位数
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
console.log(round(1.005, 2)); // 1.01

// 4. sum：计算数组或多个数字的总和
const sum = (...args) => [...args].reduce((acc, val) => acc + val, 0);
console.log(sum(1,2,3,4)) // 10
console.log(sum(...[1,2,3,4,5])) // 15

// 5. toCurrency：简单的货币单位转换
const toCurrency = (n, curr, LanguageFormat = void 0) => {
    return Intl.NumberFormat(LanguageFormat, {
        style: 'currency',
        currency: curr
    }).format(n)
}
console.log(toCurrency(123456.789, 'EUR')) // € 123,456.79
console.log(toCurrency(123456.789, 'USD', 'en-us')) // 美元 $123,456.79
console.log(toCurrency(123456.789, 'USD', 'fa')) // US$ 123,456.79
console.log(toCurrency(322342436423.2435, 'JPY')) // JP¥ 322,342,436,423