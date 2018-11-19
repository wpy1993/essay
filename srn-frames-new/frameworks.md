## srn-frameworks v0.5.2

- SRNApp
- SRNPage
- SRNConfig
- SRNModel
- SRNStore
- decorators


### SRNApp
- `AppRegistry.registerComponent`中的`return (props)`, `props`指的是什么？
    - A: `props`正是我们跳转时使用的`this.route.open(path, {props}, cb)`中的props，据猜测，这个是native在中间做了处理

- init时，对navigator进行了`load`和`push`操作


### SRNPage

> 除了 open 和 navigation ，其余都貌似都需要LifeCircle的支持才能够发挥更好的用途

- open
    - 打开三种页面
        1. `/SubPage`, 当前rn模块的其他页面，无需新开容器，这样子componentWillUnmount可用
        2. `appScheme://open/reactnative` 打开新的rn模块
        3. `appScheme://open/dfcArticleWebv`  app提供的自己做的webview页面  
           `https://www.souche-inc.com`  打开html页面


### SRNConfig

> 优先选择NativeModules.SCCRNHostData，其次才是rnHost

- load  `存储所有环境的host`
    - (将`default.config`和 `[env].config`)合并
    - 将所有的config中涉及http的地方都剔除 （除非手动在`arguments[1]`中添加`useEventHost: true`字段）
    - 重新设置ua
- hostConfig  `加载所在环境的host`
    - getHostData `切换host时触发`
    - getStaticHostData `首次调用hostConfig时触发`


### SRNModel

> 用到了装饰器中的 Unit, checker

- __mapping
    - this指向实例对象，this.constructor__aliasNames即给字段的装饰器
    - 暂时没有看懂。。。？？？
- __map
    - 是`__mapping`的原版，但是由于在for循环时不断的`重写this中的被@observable的数据`，所以可能造成性能问题，弃用
- toJSON
    - 如果总体支持unit并且该字段支持unitOriginals，就给该字段增加`_$[unitsType]`，不清楚具体用途


### SRNStore

> store

- __axios  **估计** 通过`this.__axios[method]`来使用 - method包括`delete/get/head/post/put/patch`
- __fetch  通过`this.__fetch(params)`直接使用
- __getCache  `AsyncStorage.getItem`
- __setCache  `AsyncStorage.setItem`

- Axios  `res.config.hide可以帮助你隐藏报错toast`
- redefineAxiosMethods
    - getDefaultHeaders
        - getAppData
            - SRNNativeUtil
                - getAppData
                - reLogin
    - defaultHandelResponse
    - handelErrorToast

- Fetch `global.SHOW_NETWORK_ERROR_TOAST = false`可以帮助隐藏错误提示

Axios
    - 支持是否自定义处理返回数据
Fetch
    - 根据后台返回数据的合理程度决定是否返回所有数据

- new Error().stack是？


### decorators

> 如何使用decorators可以参考 [Metaprogramming with decorators](https://github.com/tc39/proposal-decorators/blob/master/METAPROGRAMMING.md)
> [阮一峰es6-decorator](http://es6.ruanyifeng.com/#docs/decorator#%E6%96%B9%E6%B3%95%E7%9A%84%E4%BF%AE%E9%A5%B0)

- LifeCircle
- Check    `添加__checkers__`
- ServerName    `添加__aliasNames__`
- Unit    `添加__unitOriginals__`

#### LifeCircle

> 向 componentWillMount, componentDidMount, componentWillUnmount 混合一些新的内容  
> 可以看到， componentWillUnmount虽然不一定每次都执行，但是viewDidDisappear一定会每次都执行

- `view_appear` 和 `view_disappear` 在`Navigator的NavigationState`里面被`emit`