## srn-framework用到的components

- [SRNAxios](#SRNAxios)
- [SRNFetch](#SRNFetch)
- [Storage](#Storage)
- [Console](#Console)

### SRNAxios

> 哦哦，我以前做的项目，没有用到过，用的是__fetch

- **SRNNativeUtil** `utils`
    - getAppData
    - relogin

> 我很好奇，在 relogin 中，OpenVCBridge 打开的 protocol 是 global.LOGIN_PROTOCOL (咦，这个是什么时候填入global的？)，  
> 那么是不是意味着native会主动把容器关闭？如果是主动把容器关闭了，第二个参数func很明显是 callback，还有什么存在的意义呢？

- **SRNAxios** `class` 

    - **methods**
        - getAppData
        - async getDefaultHeaders
        - redefineAxiosMethods
        - defaultHandelResponse (handle拼错了但不重要)
        - handelErrorToast

- getAppData
    - 疑惑，这里调用了SRNNativeUtil.getAppData，但是呢，SRNNativeUtil.getAppData的写法貌似如果真的error，是不会调用cb()的，那么
        假设真的失败了（调用native，可能性很低）,是不是SRNAxios.getAppData() 被await调用，阻断了getDefaultHeader的进程？

- getDefaultheaders
    - 设置默认`axios request headers`，添加了`token`, `Version`
        - token用来做验证，某些接口根据Version区分版本返回不同的数据（大风车）
        - 上面的说法中，用的是`Version`还是`BundleVersion`我不是很清楚，他俩区别是啥？
            或者其实用的`version`并非上面两个的任意一个，而是url中的。。。

- redefineAxiosMethods
    - 好奇，怎么调用的？仅仅是constructor中设置`SRNAxios.prototype[method]`，但是实际使用呢？
    - __DEV\_\_ 在哪里呢？执行这里的时候，这里有window吗？是在global中吗？在哪里声明的呢？
    - `allResponse` 如果请求参数存在这个 **boolean** 并且为true，那么就返回未被处理的数据
    - `handelResponse` 如果请求参数存在这个 **函数** ，那么就由这个函数来处理res `仅限http请求成功（非后台返回成功）时`
    - `statusErrorMessage` 如果请求参数存在这个 **string** ，那么`http请求失败`报错信息就使用这个
    - 好奇，第二个参数`args`哪来的？虽然猜测是实例调用时传递的，但是技术水平有限，无法证明 ？？？

- defaultHandelResponse `（仅限 http status 200 && params.handelResponse !== 'function'）`
    - `res.config.dataResponse` 如果后台返回参数存在这个 **boolean** 并且为true， 那么就返回后台全部数据
        否则返回后台数据的data部分

- handelErrorToast
    - 默认toast弹窗提示，除非后台配置了`res.config.errorToastConfig.hide` **boolean** 并且为true
    - 但是呢，我个人觉得，既然`SRNNative.Loading.hide()`在这里被调用了，应该无论是否有 `res.config.errorToastConfig.hide`，
        都应该调用这个`SRNNative.Loaidng.hide()`吧

### SRNFetch

> 这个就是以前常用的 __fetch 的内部

- **SRNNativeUtil**
    - 同上 `SRNAxios`
- **getDefaultHeader**
    - 类似 `SRNAxios.getDefaultHeaders`
- **showToast**
    - 调用native的toast， 但是 `global.SHOW_NETWORK_ERROR_TOAST` 是做什么的，为什么用它来进行判断

- **SRNFetch**
    - `options`是 `arguments[1]`， 开发者可以传递参数 `timeout: diyTime(Number)` 进行超时的时间设置
    - method && method === 'post' --> content-type = 'application/x-www-form-urlencoded' 类似qs.stringify 天龙说的，是吗？
        - post就转换成`FormData`， 但是没看到哪里用到了formdata ??? 
        - if `options.json` else if `options.data` 然后else,else中的处理，options.data不存在，那么赋值有何意义？
    - json --> content-type = 'application/json'
    - 后台报错 (code === '10001' || code === '10004') && global.LOGIN_PROTOCOL ==> 登录超时


```疑惑点
1. this.__fetch使用的应该是同一个SRNFetch实例吧，里面的一些变量有被重置吗？实例看作函数，只有外部变量才不会被重置。。。想多了
2. 还是那个问题咯， SRNNativeUtil.reLogin还会定时器后调用cb吗？cb是重新进行这个超时的请求
```


### Storage

> 利用react native提供的 AsyncStorage  
> 共计有两个方法， setItem ， getItem， 都是 AsyncStorage 本身就集成的，稍做了封装，不做赘述

### Console

> 大佬，你是来干啥子的？

> 额，看了下，原来新项目中，`SRNApp`的`initSentry`方法，进行了设置   
> `SRNConfig.env === SRNConfig.ENV_PROD || SRNConfig.disable_console` ==> {window.console = new Console()}

> 然后，这个Console就是用来干掉window.console，然后把Raven植入进来的

> Raven怎么使用的？一脸懵逼，好耳熟，貌似清华跟我讲过。。。专门针对RN的错误抓取吗？或者是我记错了吧

- 萌新重复提问： rn中有window吗？尴尬。。。有global吗？尴尬。。。 逃:)

- PS: 涉及到raven，不懂，所以暂时战略性放弃研究，反正它干掉了console.log，并且把console.error变成了raven模式(矩阵懵逼脸。。。)
