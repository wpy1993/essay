## decorators

> 在 srn-framework 中封装的装饰器, 只研究一下 LifeCircle 吧暂时

**SRNModel专用**
- Check
- ServerName
- Unit

**SRNPage专用**
- LifeCircle

### LifeCircle

> NativeAppEventEmitter 用来订阅 native 发送来的事件，这里主要订阅了 AppearAction DisappearAction 两个事件，然后发送   
> 给 rn 的 emitter，按照我的预计，这个主要是页面已经被加载完毕了，后期modal显示隐藏，打开新页面再关闭，native会发送上述两个事件吧

- **ReactMixin**
    - 在LifeCircle中被调用，this指向了调用装饰器的地方（也就是SRNPage）,是吗？
    - componentWillMount
        - 修改 `this.route`的一些属性 （why do it?）
        - `this.emitter` 订阅了 `view_appear` 和 `view_disappear` 两个来自于 `NativeAppEventEmitter` 的转发事件
            - `this.emitter`貌似是rn的吧？还是我们哪里写的呢？
        - 调用 `this.viewDidAppear`
    - componentDidMount
        - 调用 `this.viewDidAppear`
    - componentWillUnmount
        - 解除订阅事件`AppearAction` `DisappearAction`的发送（`activeEmitter = null`）
        - 调用 `this.dealloc`
    - props from parent (咦？没看懂，干什么用呢？)
        - _route_path
        - _route_referrer
        - _route_params
    
- **LifeCircle**
    - 如果使用了这个decorator， SRNPage的几个生命周期会被重写（其实就是增加一下功能）
        - 比如`componentWillMount`, 首先把`target.prototype.componentWillMount`存储起来，然后重写
            `target.prototype.componentWillMount`, 把旧的`componentWillMount`继续调用，然后添加
            `ReactMixin.componentWillMount`
    - 被重写的 **生命周期** ： `componentWillMount`, `componentDidMount`, `componentWillUnmount`

```疑点
1. ReactMixin 的 componentWillMount中，if (this.emitter) ，这里面的处理什么时候会用到呢？
    因为componentWillMount只会被调用一次吧？但是第一次被调用的时候，this.emitter貌似为fa
2. 装饰器中的target 指向了构造器，this呢？是不是随着构造器，指向实例？
3. ReactMinxin 中， this.route 的 path referrer params 不是天然存在的吗？毕竟有的srnpage 不使用 LifeCircle，
    在这里进行赋值，有什么用呢？
```