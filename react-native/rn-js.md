## 开发遇到的问题


### config

- 在souche-f2e/srn-toolchain/script/start.js中，将原本的js Bundle 打包指令修改成如下
    - `const bundleServer = crossSpawn('react-native', [ 'start', '--port', '8082' ].concat(extraArgs));`
    - 然后再在get_qr_content.js中改一下`8081`为`8082`即可

### JS

- 不能给自定义组件命名的父级进行style的设置
- 不在class中的方法，无法调用到this
- super和constructor是否（props）完全没有作用是吗？反正都可以获取到this.props
- 父子组件传递方法时， 需要绑定this， `method = {this.method.bind(this)}`

### JSX

- top, left, right, bottom, 这些是可以直接使用的，不一定需要position(额，现在看看，貌似并非如此)
- Text 不知道border，也不报错。。。

### 数据传递

> 使用this.route(假设在SRNPage页面)，或者SRNNative

- this.route.open(url, params) / SRNNative.open(同上)
    - 粘贴代码如下
    **示例1**
    ```
    let data = {
            module: 'infinitiQuotation',
            props: {
                route: '/carDetail',
                carModelCode: this.store.carModelCode,
                carModelName: this.store.baseMsg.name
            }
        }

        this.route.open("yingfeinidi://open/reactnative", data, (res, ret) => {
            console.log(res, ret) // 失败了给你res，没有ret，成功了res为null，ret为返回值
            
        })
    ```
    ========================
    **示例2**
    ```
    let params = {
        route: '/carDetail',
        carModelCode: this.store.carModelCode,
        carModalName: this.store.baseMsg.name,
        mainPic: (this.imgList && this.imgList.length) ? this.imgList[0] : '',
        goPage: 'orderFromCarDetail'
    }
    this.route.open('/Follow', params, (res) => {
        // 打开容器内部的其他页面，res为成功的返回值
    })
    ```
    ========================
    - **说明** data如何接收？
    - `this.route.params`即代表了data
    - `props`
    - `this.props` === `this.route.params`

- this.route.close(params)

- 组件传递同理

- 不出意外，直接 `this.props` || `this.route.params` 指向了props


### 必知

#### Image图片
> rn不能使用本地图片，需要上传到远程，然后uri调用
- 远程服务器: `http://sccimg.sqaproxy.souche.com/list?path=/`