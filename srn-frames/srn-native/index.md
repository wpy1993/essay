## srn-native —— 跟App库的交互封装（ 盗用官方说明:) ）

[back](../index.md)

> 实际使用中，它就是一个实例对象（据猜测）,因为无论是项目还是框架，都引用SRNNative.Loading.hide()诸如此类的，所以Loading一定
> 是具体的某个实例中的，不然不可能共享（据猜测）

- 


### 方法列表

- common
    - relogin
    - open
    - popAndOpen
    - popAllAndOpen
    - openWebview
    - openGuideView
    - openDatePicker
    - getContacts
    - saveContracts
    - bury
    - log
    - getChannelUserInfo
- getData
    - getAppData
    - getGPSData
    - getDeviceData
- img
    - uploadImg
    - cutImg
    - seeBigImg
- prompt
    - toast
    - Loading
    - alert
    - confirm
    - setDefaultLoadingIcon
- share
    - share
- other
    - closeView 没懂。。。

> SRNNative 是个对象，this自动指向本身

**common**
- relogin
    - 监听RefreshLoginEvent 
        - `监听这个的作用是什么呢？因为在我看来，打开了登录页面,就再也没有之前的容器打开记录了。。。？？？`
    - 打开`loginScheme`(native登录页面)
    - 这个本身是个Promise封装
- open `params: protocol, data = {}`
    - Promise，返回的参数是arguments[0]
- popAndOpen `同上 open, 关闭当前容器所有项目并且打开新页面`  ？？？ 关闭当前容器还是关闭所有项目的容器
- popAllAndOpen `同上 open, 关闭当前页面并且打开新页面`
- openWebview `params: url, data = {}`
    - url为`http || https`开头 （ip可以吗？开发测试时127.0.0.1）
    - 参数建议放在data中 ？？？是吗？
- openGuideView `params: data = []` 新用户引导页面
    - data 见官方文档，没懂，data是个[{}, {}]，里面的对象应该有几个？
- openDatePicker `params: params = {}` 打开日期选择器
    - params 见官方文档
- getContacts 获取通讯录
    - Promise, res即为通讯录
    - 貌似，Android是按照拼音排序的，iOS是无序的
- bury `typeId, vals = {}` 埋点
- buryPage `pageID, pageAction, pageType = 3`
    - pageID `h5: url` || `RN: ${业务模块名称} _ ${route name}`
    - pageType `Android: 1` `iOS: 2` `RN: 3` `H5: 4`
    - pageAction: `begin 进入页面` `end 离开页面`
- log ``