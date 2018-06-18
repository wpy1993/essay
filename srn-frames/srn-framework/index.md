## srn-framework

[back](../index.md)

### what's real contain
- [SRNPage](#SRNPage)
- [SRNApp](#SRNApp)
- [SRNStore](#SRNStore)
- [SRNModel](#SRNModel)
- [SRNConfig](#SRNConfig)
- [fetch, console, etc...](./components)
- [decorators](./decorators)

---------------------------------------

### SRNPage
> 额外使用到了 `NavHelper`, `SRNNative`

- **navigation**
    - title
    - left
    - right

- **route**
    - open `params: path, params, callback`

        > path打开三种视图，  
        > not '/' start && http --> webview,    
        > not '/' start && !http --> new rn module/native module   
        > '/' start --> other page in current rn module
        
        **ps: 貌似cb返回的数据在arguments的位置（0 or 1）不同，记得整理一下 ？？？**
    - close `params: data`
        > 基本data没有被我使用到，如果想要使用呢？看一下`NavHelper.pop`接收的`argument`如何被使用吧 ？？？
    - reload `come soon`

- **hook** `搭配@LifeCircle使用`
    - viewDidLoad
    - viewDidAppear
    - viewDidDisapper
    - dealloc `unknown?`
    - viewWillAppear `unknown?`
    - wiewWillDisappear `unknown?`

- navigator = NavHelper **貌似不常被使用，如何用？？？**

```疑点
1. navigation 最底层的调用？
2. route 的cb 参数位置貌似不对，或者说和NavHelper.push的cb不同，对比一下？
3. 新的生命周期 hook，如何真正的嵌入的？
4. navigator是暴露给外部使用的吗？貌似我没用过，暴露出来的意义何在？
```


------------------------------------------------------------------------

### SRNApp
> 额外使用到了 `NavHelper`, [**Console**](./components.md#Console), `SRNConfig`, `AppRegister`

**props**
- navStyle
- navigation

**methods**
- styleNav
- setNavigation
- init
- initSentry

- **styleNav** `params: obj`
    - 设置navStyle = obj, 但是具体应用呢？obj应该写什么？？？

- **setNavigation** `params: obj = {title, left, top}`
    - 貌似obj中，并非每一项都是必填的，title|left|top 填哪个，就设置对应的

- **init**
    - NavHelper -- 1.clear 2.load local route
    - AppRegistry -- registerComponent `params: appNam, cb`
        - cb 如果没有指定route，就跳转defaultRoute
        - cb的参数是自己填写的 `params: props`
        - `archerWrap`是啥子？

- **initSentry** `params: version, dsn`
    - set window.console || global.console (诶？rn中有window吗？？？)

```疑点
1. SRNApp 和 SRNPage 的关系？constructor 吗？
2. navStyle 和 navigation 两个obj具体的形式
3. init  &&  initSentry 什么时候被调用的？
4. init中,  NavHelper.clear() 做了什么事情？也并没有清空一个app中所有的之前的视图栈吧？
5. AppRegistry的 registerComponent 的 callback 什么时候被调用的？
6. initSentry的意义？
```


------------------------------------------------------------------------

### SRNStore
> basic:  
> [**SRNAxios**](./components.md#SRNAxios), [**SRNFetch**](./components.md#SRNFetch),
> [**Storage**](./components.md#Storage)

**props**
- __axios

**methods**
- __fetch
- __getCache `params: key, callback(err, data)`
    - Storage.getItem
- __setCache `params: key, value`
    - Storage.setItem
> 明明是私有方法，但是实际工程中直接被外部拿来使用了。。。

```疑点
1. __getCache 的callback到底是什么样的？arguments[1]真的是data吗？data的表现形式？
2. __setCache 的value为什么最好是object呢？
```


------------------------------------------------------------------------

### SRNModel

> basic:  
> `price`, `distance`, `UnitType`, `checker`


> 概述:   
> SRNModel被实例化的时候 @observable let modelInstance = new ExampleModel(), 该model外部被监听   
> ExampleModel 里面的每一个属性和方法，普遍都会被添加上 @observable @alias(现在被改成@ServerName) @Unit, @Check, 
> 当然你也可以不加 :)   
> 刚去看了一些代码，包括简单看了一下mobx的源码`@observable @alias(现在被改成@ServerName) @Unit, @Check`果然都是通过
    Object.defineProperty进行设定的。`@observable`果然是设定了setter和getter（在mobx - generateObservablePropConfig$$1
    中）
> class 类的this默认指向实例(我机智的去看了一下阮一峰es6 :) )  
> 思绪好乱，技术水平有限，这一块暂时搁置吧

**Question:**
1. `ExampleModel`中，每个属性添加或者不添加 `@observable`, 有没有区别？
2. 使用Object.defineProperty,是不是我就可以认定__mapping时, `Object.assign({}, this, dealedData)`仅仅是更改了每个属性的value,
    其余内置属性（set, get, __aliasNames\_\_, etc...）不变
3. 刚发现技术水平太差了，class中无法直接定义一个属性，必须要在constructor中，而且只能被实例读取。那么为什么我们写的Model，属性可以随便写呢？
4. 貌似Model中 `@observable name = "wplay"` name为什么能被装饰器装饰呢？
5. this指向实例，但是为什么 `this.__aliasNames\_\_` 存在呢？它只是实例中的一个属性的内置属性吧？或者说我的想法是错的？

**constructor** `传说中，暂时还没找到。。。`
- __aliasNames\_\_
- __unitOriginals\_\_
- __checkers\_\_
- name

**methods**
- __mapping
- __map
- toJSON

- **__mapping** `数据的遍历·新`
    - 遍历this数据(仅限被`observable`的数据), 进行了`alias别名 的转换`、`checker数据类型 的检查`, `unit单位 (金钱/距离) 的转化`
    - 我很好奇，this指的是什么，仅仅是当前model的所有的被监测的属性吗？还是说整个store？
        - 为什么芋头注释，`for in this`时，仅仅遍历的是model中被observable的数据
        - 由于芋头的那行注释，所以我才有这个this到底是什么的疑惑 ？？？
    - 预测使用方式: `this.modelInstance = this.modelInstance.__mapping(data)`
        - 貌似预测错误了吧？直接这样子赋值，会导致this的原型被变更吧？ `emmm...有原型吗？`

- **__map**   `数据的遍历·旧`   _据说存在性能问题_
    - 和__mapping唯一的区别就是。。。for循环每次都直接更改this内部数据，不需要return
    - 预测使用方式: `this.modelInstance.__map(data)`

> emm...？？？上面两个（__mapping, __map）的使用方式我应该写错了  
> 仔细想想，性能问题就是this每次被修改，会一直被mobx监视，不行消耗内容的同时，可能也会一直重新renderDOM  
> 但是 mapping 要怎么使用呢？最后一步如何赋值上去呢？  
> 不过。。。稍等，停下来思考一下，当前SRNModel的顶部写一下说明文字

- **toJSON**
    - 额，这个是干啥的？就是单纯的遍历，然后把带有`@Unit`的属性转换一下吗？比如转换成 `20_$wy(万元)`?


```疑点
1. omg, this.constructor 到底是谁？？？难道来自于decorator？难道来自于mobx？
2. mapping中, json[alias[i]], 也就是 this.constructor.__aliasNames__[i] 哪来的？mobx吗？
3. mapping中，到底该怎么使用呢？最后再来一句 this = Object.assign({}, this, self)行不行呢？会不会消除掉mobx的装饰器。。。
4. 更多疑点，见顶部
```


------------------------------------------------------------------------

### SRNConfig

**static props**
一堆静态属性，关于配置的参数映射和默认值

**static methods**
- load
- getHostData
- getStaticHostData
- hostConfig

- **load** `params: default.config.js, {dev | prehub | prod}.config.js`
    - 遍历src/config里面的属性并且嵌入
    - 在`NativeModules.SCCRNHostData`(native可能会暴露的属性)存在的前提下，如果`{dev | prehub | prod}.config.js`中  
        没有声明`useEnvHost: true`（据猜测）,则不会读取其中文件的`host配置`
        - 纯属推测，待我查看一下文档吧。。。？？？
    - 最后设置`SRNConfig.ua`(标识吧)

- **getHostData**
    - 配置host, 同步 优先级: native host > rn host
- **getStaticHostData**
    - 配置host, 异步 优先级同上，代码也同上

> 上面的两个，貌似是供下面的 `hostConfig`使用的

- **hostConfig**
    - 貌似初始化设置host并且监听环境的变化更新host（如果可以监听-存在`NativeAppEventEmitter`）
        - ps: 额, `NativeAppEventEmitter`这个是rn module，100%存在啊。。。估计只是个兼容处理吧
    - 初始化使用异步的`getStaticHostData`， 然后监听变化并且使用同步的`getHostData`

```疑惑点
1. load中，猜测两个参数分别上上述两种文件，但是据说 {dev, prehub, prod} .config.js是同时被植入的，那么里面的属性名一致的情况下，   
    是如何让三个文件的属性并存的呢？
2. 为什么会存在 getHostData 和 getStaticHostData 两种，同步和异步区别？毕竟异步也不是一个promise
3. 什么时候调用hostConfig? 什么时候调用load？
4. 为什么初始化使用异步的 getStaticHostData, 监听时使用同步的 getHostData
```

------------------------------------------------------------------------

### PS: what's exported by this module
- SRNPage
- SRNApp
- SRNConfig
- SRNModel
- SRNStore
- SRNNative
- SRNFetch
- Unit
- UnitType
- Check
- CheckType
- ServerName
- observable
- computed
- observer
- action
- autorun
- LifeCircle