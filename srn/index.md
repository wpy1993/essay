### 英菲尼迪开发总结

> 我主要负责了客户整个模块，全是RN，当然，一半是基于大风车的新版RN的修改。也算有点收获吧

#### 基础
- SRNPage 用来放置页面级别的东西， class中内置了`route`, `navigation` 罢了
- SRNStore 用来放置数据，内置了`fetch`, `getCache`, `setCache`的封装 罢了
- SRNModel 用来存放模型的，就是不想写在store中的字段，就剥离出来放在model中，内置了`__map`(浅拷贝), `toJSON`罢了

#### 公司架构
- this.route.open(protocol, data, cb)
    - 关于其callback，好坑。。。参数有2， (res, ret) `(可能以后的SRNNative的node包升级和native进行变革会改这个问题吧)`
    - 如果是打开别的RN容器的某页面，返回的参数在`ret`
    - 如果打开的是当前RN容器的其他页面，返回的参数在`res`

#### 开发踩坑
- `scrollView`(`FlatList`, `ListView`同理)中放置scrollView是一种错误的方式，滚动中滚动在Android不会被很好的执行。即使监听手势也会有别的问题
- iOS不支持 `borderLeftWidth`这种单一的边线。建议用`<View style={{height: StyleSheet.hairlineWidth}} />`代替
- Android 不一定支持`lineHeight`。 建议用`<View><Text style={{alignItems: 'center'}}></Text></View>`代替
- 键盘弹出时有大片空白，那么解决方案貌似官方的也并不是很友好，可以使用第三方的一个组件`react-native-keyboard-aware-scroll-view`[好人传送门](https://github.com/APSL/react-native-keyboard-aware-scroll-view)
- Android不支持本地图片的打包。。。（貌似是通病，不是公司架构遗留的问题），所以建议把静态资源放在远程服务器上

#### react的坑
- setState竟然是异步的。。。可以把它看作是setTimeout，支持回调，所以如果需要进行与该state有关的后续操作的话，在cb中进行操作