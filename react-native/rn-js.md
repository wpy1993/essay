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

- top, left, right, bottom, 这些是可以直接使用的，不一定需要position
- Text 不知道border，也不报错。。。