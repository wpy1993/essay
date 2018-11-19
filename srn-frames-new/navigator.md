## srn-navigator v1.7.5

> srn-nativetor 整个的活动区域仅限于当前的rn模块，  
> 所以下面的类似 前进(push) / 后退(back) 的方法，都具有局限性

> NavHelper (export default) --> new Navigator(NavigationViewBuilder)  
> export --> {Navigator, NavigationViewBuilder, TabBar}

> 终于了然，一切还是要回归 SRNApp 的 app init，在 registerApp 的时候return了一个View(app)


### Navigator

> 只会被 new 一次

- emitter
- navState `NavigationState`
- **view**  `NavigationViewBuilder`

- push `仅仅支持在当前的rn module中进行跳转，不支持跳往别的rn模块`
    - callBack(function)是隐藏的第四个参数 `arguments[3]`
- pop  `var popedRoute = this.navState.pop()`就已经让state pop一次了
- back
- forward
- jumpTo
- clear
- reset `清空当前的模块栈中之前的栈，保留当前栈`
- load

- Navigator
    - NavigationState
    - service `handleDataForPush`  `buildNavState`

### NavigationViewBuilder

> 这就是一个 rn view 组件，通过监听state而动态的变化内容，将 ComponentInstance 渲染进去