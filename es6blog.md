## 阅读es6
** 计划一周，一天4小时。共4*7=28h，共计275页 **

***
[TOC]
***

### 2. let和const []

- let 
- const  
- do {} 
- Object.freeze
- 六种声明方式：var function let const class import
- 顶层浏览器：浏览器：window   Node：global
- window.a和 a 基本等价，该一个，就会牵动另一个的变化
	+ let a != window.a
	+ var a == window.a
- self是？windows有，node没有，指向顶层对象a
- if浏览器设置了CSP,那么无法使用new Function和eval

### 3. 变量的解构赋值 []
- `let [a, b, c] = [1, 2, 3]`
- 解构不成功，不完全解构
- 里面部分是Set和Iterator章节的
- 惰性求值 `let [x=fn()] = [1]  ==>  x = 1,fn只是个默认值`
- 数组解构，对象解构
- `({x} = {x:1})` **如果开头就是{的话** 必须大括号，**而且大括号包住整行**之类的帮助，才能防止{x}被解析成代码块(es6提出的代码块概念)
- 函数中的解构默认值，是为参数提供默认值，并不是为参数中的具体的x参，y参提供默认值


### 4. 字符串的扩展 

### 5. 正则的扩展 

### 6. 数值的扩展

### 7. 数组



### 8. Function []
- 给参数设默认值
- 解构式，如果是参数是一个对象，调用时参数没有定义为一个对象，就报错(p70)


### 9. Object

### 10. Symbol

### 11. Proxy和Reflect

### 12. 二进制数组


### 13. `Set`和`Map`数据结构

- `Set` `WeakSet` `Map` `WeakMap`


### 14. Iterator  for...of

### 15. Generator函数


### 16. promise []

- new Promise(function () {}).then(() => {}, () => {}).catch(() => {})
- `Promise.resolve()` / `Promise.reject()` / `Promise.all([])` / =>diy: `Promise.done()` / `Promise.finally()` 


### 17. 异步操作和Async函数

- 


### 18. Class

> 举个栗子, Demo 是类， demoIns 是实例  
> Demo中，this默认指向demoIns, 但是static的属性/方法 中 , this 指向 Demo
> static 的属性只能被Demo使用，即使是外界，也要 Demo.staticAttr/ Demo.staticFunc 这样使用
> 补充，或者在实例 demoIns 中，this.constructor.staticAttr 调用

- class 不会被变量提升
- class 两种声明方式，函数表达式和声明变量 class Demo [extends] {} || var Demo = class [trueName] [extends] {}
- Demo.name 是有默认值的，是Demo, 如果是变量声明并且`trueName`存在，就是`trueName`

### 19. 修饰器

### 20. Module
- export {} / var / function
- export default 
- import * as module1 from ''
- import module1 from '' **对应default的export**
- <script defer async></script>  `script的js方式默认同步加载`
- <script tpye="module"></script>  `script的module方式默认异步加载`
- 如果输出有default的话，单纯地`import val from 'a.js'`，默认val == default，如果想要全部的，就`import * as val from 'a.js'`

> export default new Foo()，可以认为拆分成 const foo = new Foo(); export foo; 所以多处import它，得到的是同一个东西！！

### 21. 编码风格 []

- const > let > var 
- ``` const [a, b, c] = [1, 2, 3]; ```
- `多线程`是啥？js是单线程？
- '' 和 `` 这两个符号，前者放置静态字符串，后者可以放置动态字符串（比如vue的mustache）
- 优先使用解构赋值
- 单行定义的对象，最后一个成员不加`,`，多行定义的对象，最后一个成员加上`,`。
- 如果不可避免的给静态对象添加新键值对，用 `Object.assign(obj, {key: val})`
- `{obj: obj, ...}` => `{obj, ...}`
- ** 使用扩展运算符(...)拷贝数组**  `Array.from()`将类似数组的对象转为数组
- 箭头函数自带绑定了this，也就是说等价于`Function.prototype.bind()`
- 复杂的，行数较为多的函数体，还是使用传统的写法吧
- 不推荐使用arguments，如果想用，建议用(...args) `rest运算符`
- 用`Class`取代`prototype`
- 推荐使用`Module`语法替代`CommonJS`，也就是`import` 取代`require` ， `export` 取代 `module.exports`
- `export default` 和 `export` 不推荐同时使用
- 如果模块默认输出的是一个`Function` ，函数名首字母小写，如果是`Object`，对象名首字母大写
- 记得使用`ESLint`， 依靠语法`Airbnb`, `npm i -g eslint eslint-config-airbnb`, 指令`eslint index.js`






```
const obj = {
	id: 5,
	name: 'wplay',
	[getKey('enabled')]: true,
}

```