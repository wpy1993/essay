## srn-navigator

[back](../index.md)

> new Navigator(NavigationViewBuilder) `史称 NavHelper :)`
> Navigator没看到render啊, navigationViewBuilder里面有render，但是怎么用到的呢？

- Navigator
    - NavigationState
    - server
- navigationViewBuilder
- TabBar 哪里用到？



### Navigator

> 以 routeConfig 为存储，backAndroidBind (Boolean) 辅助判断android物理返回键   
> 然后以引入的 navState 进行一系列的操作  
> EventEmitter （fbemitter） 进行事件的接收
> navigationViewBuilder 作为视图，但是不清楚 view/View 在哪里被用到了

- **static**
    - routeConfig


- **constructor**
    - emitter
    - navState
    - view

- **methods**
    - push
        - handleDataForPush
            - 将父级的args前三个参数处理一下，然后将整个`args(数组)`返回
        - buildNavState
            - 嗯。没看懂，主要是不知道component是什么样子的？
            - this.navState.getIndex() 预测是当前页面的index
    - pop
        - 我很好奇，看到pop最后的while循环，是不是到了顶层就不会再在pop了？假设当前页面不是顶层，却pop(3)
            - 原因还没有探究，pop(3)不会退出，但是不清楚如果是多个rn容器呢？
        - this.navState.pop有进行过上述的处理吗？
    - back
    - forward
    - jumpTo
    - clear
    - reset
    - load

```疑点
1. constructor 中，this.view 的用途？
1. push 中, navState 是什么样的形式？具体表现是什么，为什么可以forEach
```

push中，如果是字符串，就去routeconfig中找
nowRoutes = this.navState.state.routes 是什么
lastRoute = nowRoutes的最后一条 || null

### NavigationViewBuilder

> import `NavigationCardStack` `NavigationHeader`  `navUtil(assignItem)` `StaticComponent`  
> GESTURE_RESPONSE_DISTANCE (gesture_response_distance) = 30  
> Direction `horizontal` `vertical`



- B both
- Navgator
    |__ NavigationViewBuilder
    |     |
    |_____|_ NavigationState
    |     |_ NavigationCardStack