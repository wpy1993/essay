## postMessage


### 改造起因

> 我们现在的pc后台框架，基本上都是 nav + iframe 的页面模式，通过监听url的参数的变更，动态的控制iframe的src

- dashboard项目， 页面代码简化如下

```html
    <!-- dashboard整体结构 -->
    <div>
        <div class="my-iframe">
        <iframe v-if="url" :src="url" frameborder="0"></iframe>
    </div>

    <!-- nav关键代码 -->
    <li>
        <a :href="firstLevelItem.link">{{ firstLevelItem.title }}</a>
    </li>
```
```js
    <!-- iframe js关键代码 -->
    created() {
        // 更改this.url
        this.initUrl();
    }
    mounted() {
        window.addEventListener('hashchange', () => {
            this.initUrl();
        });
    }
```

我们可以看到，初始化时iframe所在的代码会执行 `this.initUrl()` 来改变iframe的src，window监听 `hashchange` 状态来动态的改变iframe的src。然后很可惜的一点，1. 菜单栏的点击使用的直接是`tag a`，2. 该dashbaord项目其余部分并没有改变url（触发hashchange）的操作，3. iframe里面的页面，根据我们的业务现状，基本上都处于**跨域状态**，在子页面无法获取到`window.top` 或 `window.parent`， 所以，
    1. window监听的hashchange从来没有触发过（浪费了一些性能）
    2. 跨域让我们无法在iframe内部控制dashboard的url

所以，现阶段，除了导航栏的菜单被点击会改变url，单纯的在iframe内部进行 `window.location = target.url` 的操作，经不起用户刷新的考验 —— 一旦刷新就会回到最初的页面。之前的解决方案是新开一个tab标签页 `window.open(baseUrl + '?url=' + target.url, '_blank')`，这种方案对于内部页面的连续跳转很不友好 —— **要开N个tab标签**。所以就想办法让 `iframe向父级进行通信` —— [postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage).


### postMessage简单使用

1. 在iframe中发起通信 `window.parent.postMessage(message, '*');`
    - `*` 是为了偷懒，允许所有的父级都可以接收。虽然可能会被恶意拦截，但是暂时没想到能够对相关业务场景的危害。

2. 父级接收 `window.addEventListener('message', (event) => { })`
    - `event.origin` 指iframe的host
    - `event.data` 对应iframe发送的message


### 具体业务实现

1. 在各个项目中新写一个routeGo方法

```js
Vue.prototype.routeGo = function changeFrameUrl(url, params) {
    // 处理url的参数
    let paramsStr = '';
    if (params && typeof params === 'object') {
        for (let i in params) {  // eslint-disable-line
            paramsStr += `&${i}=${params[i]}`;
        }
    }
    if (paramsStr) {
        url.match(/\?/) ?
            paramsStr = `${paramsStr.slice(1)}` :
            paramsStr = `?${paramsStr.slice(1)}`;
    }
    url += paramsStr;

    // 发起postMessage通信
    window.parent.postMessage({
        type: 'url',
        value: url
    }, '*');
};
```

2. 在dashboard项目中写一个postMessage的接收

```js
window.addEventListener('message', (e) => {
    // 如果是自己发出的，就return
    let windowHref = window.location.href && window.location.href.split('url=')[0];
    if (windowHref.indexOf(e.origin) === 0) {
        return;
    }

    /**
     * 简单处理数据
     * 仅支持http开头的字符串或者是带有属性type: url的对象
     */
    let data = {};
    let msg = e.data;
    if (typeof msg === 'string') {
        msg.match(/^http/) && (data = {
            type: 'url',
            value: msg
        });
    } else if (typeof msg === 'object') {
        data = Object.assign({}, msg);

    }

    // 暂时仅仅支持change url 功能
    if (data.type && data.type === 'url') {
        if (window.location && window.location.href) {
            window.location.href = `${window.location.href.split('url=')[0]}url=${data.value}`;
        }
    }
});
```


### 然而，遇到了问题

> 我们看到，上面是最终是通过window.location进行的页面的切换。但是遇到了bug —— 切换页面后，history生成了两条记录！

#### bug分析

1. `window.location.href = ''` 如果仅仅是 `hash`改变，**并不会导致html的改变**。当 `window.location.href` 和 `iframe src` 并存时（前提条件：`hash`会影响`src`），会导致url改变一次，但是history增加了2。 [参考](https://stackoverflow.com/questions/821359/reload-an-iframe-without-adding-to-the-history)

2. 那么为什么导航栏的`<a href="" />`并不会导致这样的bug呢？推测`<a href="" />` 等价于 `window.open(target, '_self')`，**会导致整个html的改变**。[参考](https://stackoverflow.com/questions/6931914/what-s-the-difference-between-a-href-url-and-window-location-url-on-ios)

#### 解决方案

1. 使用window.open(target, '_self')
2. 彻底销毁iframe，然后新建一个iframe并且把新的src赋值进去

方案1就是直接在postMessage的接收中，使用window.open的方式进行页面的跳转。下面是方案2的代码 —— 修改initUrl方法

```js
initUrl() {
    let tmpArr = window.location.href && window.location.href.split('url=');
    let url = tmpArr && tmpArr[1];

    // 旧的方法
    // this.url = url
    // 新的hack方法
    this.url = '';
    setTimeout(() => {
        this.url = url;
    }, 0);
}

<!-- html部分 -->
<iframe v-if="url" :src="url"/>
```


### 项目相关

- 以单店的代码为示例
    - [routeGo所在位置](https://git.souche-inc.com/workcodeFE/PCWorkCode/blob/master/src/main.js)
    - [iframe所在位置](https://git.souche-inc.com/single-unit/frontend/dafengche-shop-dashboard/blob/master/src/components-index/App/MyIframe.vue)


### 写在最后的话

> 其实这个代码写的并不好，postMessage的安全隐患在那里放着，发送的message应该支持更多的参数写法，最重要的是缺少replace方法，代码应该有更好的扩展性和更优的写法，后期会对其进行扩展和优化