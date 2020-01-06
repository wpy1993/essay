# learn next.js

- next.config.js 
- 默认代码文件放在 `./pages/`里面，静态资源放在 `./static/`里面

- style可以写在jsx里面

```javascript
<style jsx>{`
   .content { ... }
`}</style>
```

- 额外的css预编译工具， @zeit/next-[css|sass|less|stylus]

- route
  - 读取
    ```javascript
      import { useRouter } from 'next/router'

      const router = useRouter()
      const { pid } from router.query
    ```
  - 使用 `<Link href="/post/[pid]" as="/apen/1">`, href指代码文件夹中的路径，as指浏览器中会显示的路径

- `next/head` 提供`Head`方法,可以当jsx的<Head>使用 ps:像html一样正常往里面塞东西即可
  - 每个页面都可以引入`Head`然后进行当前页的定制化

- class初始化，可以通过 `static async getInitialProps({req}) {}`
  - 参数完整包含：`{pathName, query, asPath, req, res, err}` 其中`req和res`是**server only**
  - 使用范围：只能在page中使用，不能在子组件中使用！
  - 触发条件：首次进入该页面时。 Q： 非首次呢？比如，后退，然后再前进？
  - If you are using some server only modules inside getInitialProps, make sure to [import them properly](https://arunoda.me/blog/ssr-and-server-only-modules), otherwise, it'll slow down your app.【啊哈？不懂，直接粘贴下来了】

- 如果给Link中间的子元素，是一个functional component，那么你需要用 `React.forwardRef` 包裹住它，然后放在Link中间

- Link标签，passHref可以把href暴露给子元素比如tag a，scroll={false} 可以阻止调准后滚动到页面的锚点或者顶部
  - Q：如果阻止滚动到顶部这件事，为什么说滚动到顶部呢？默认不就是顶部吗？

- 关于路由跳转，除了Link标签，还可以命令行跳转 `Router.push('/xxx'), push({pathname, query})`  import Router from 'next/router'

- Router的方法有 beforePopState( ({url, as}) => {} ), 通过return Boolean 控制是否执行 popState
- 关于Router对象的可见属性和方法有： route, pathname, query, asPath, push(url, as), replace(), beforePopState(cb)

- Router Events 单纯的可监听列表 通过 `Router.events.on(‘event’, foo) , off 同理 `
  - 事件列表 `routeChangeStart(url)`, `routeChangeComplete(url)`, `routeChangeError(err, url)`
  - `beforeHistoryChange(url)`, `hashChangeStart(url)`, `hashChangeComplete(url)`

- 不要在getInitialProps 使用 Router.event, 因为可以会导致不可预期的行为，推荐在useEffect, componentDidMount, componentWillUnmount中使用

- {shallow: true}, 信息会被注册进 useRouter，withRouter，也可以在componentDidUpdate中看到
  - 使用范围：仅仅是改一下hash，不跳转页面。如果as没有修改，但是实际的href修改了，也不会被使用
  - 局限性：getInitial因为没有跳转页面所以不会被触发
  - 使用方法： Router.push(href, as, {shallow: true})

- useRouter
  - 使用方式： import { useRouter } from 'next/router', const router = useRouter()
  - 优势：哪里都可以使用，比如任何组件中

- HOC（higher order component）高阶组件，中可以使用withRouter
  ```javascript
  import { withRouter } from 'next/router'
  function HocComp({ router }) {
    return <Comp router={router} />
  }
  export default withRouter(HocComp)

  ```

- prefetch 仅限产线环境
  - <link rel="preload"> 这个是属于html的规范
  - 对于Link，默认进行prefetch行为，可以手动设置关闭，<Link href="" prefetch={false}>
  - 另外，还可以用于 useRouter().prefetch(url)，为了防止某些错误，应该使用useEffect，或者componentDidMount

- API routes 写在`./pages/` 里面的`/api/`里
  - 默认request里面的body进行parsing，大小限制为1mb，可以手动关闭或者定制化更改
  - 可以引入`micro-cors`，干啥我还不清楚

- next自动在请求头添加 `x-powered-by: true`， 干啥子嘞？

- dynamic import --> 'next/dymnamic'  `dynamic(() => import(), [config]).then()`

- custom configuration ...不知道说了啥

- 关于babel的使用，`next/babel`包含了基本上所有的babel版本，比如`preset-env`, `preset-react`, `styled-jsx`等等
  - 这些配置不应该写在`./.babelrc`文件**的个性化配置？**中，而是应该写在`next/babel`中 ？疑惑。。。
  - 上一句的意思，我猜测是，要把`preset-env: {}`写在presets里面的`next/babel`中，感觉是这样的，并非不写在.babelrc文件中！

- `next/config` 这个node_module包作为中介，可以让代码获取到存储在`next.config.js`的`publicRuntimeConfig`和`serverRuntimeConfig`
  - 使用：`import getConfig from 'next/config'; const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()`
  - note: 一个依赖`publicRuntimeConfig`页面，必须通过`getInitialProps`去选择退出 **自动预加载**。 这是什么鬼意思？


- `--host [hostname]`或者 `-H [hostname]` 这个是干啥的？代理监听`[hostname]`这个域名吗？

- 当没有 `getInitialProps` 时，如果没有`blocking data (是啥)`，就支持prerender

- serverless deploy 无服务部署，怎么搞？ 反正在`next.config.js`中写上`target: 'serverless'`
  - split apps into smaller parts --> called **lambdas(匿名函数？)**

- function可以使用 `import { NextPage } from 'next'`, 或者class 可以使用 `NextPageContext`,具体的不懂咯

- AMP ？ Accelarated Mobile Pages



### 问题遗留

- Custom routes 是干啥的，看不懂
- client-side routing vs server-side routing


单词
intercept 拦截，窃听
owe to 由于
subsequent  随后的
scalability  可扩展的
sake  目的
manipulate  操控
invoke 唤起，调用
shallow 变浅
instant 立刻，紧急的
capibility 能力，功能，性能
rarely  很少见的
imperative  必要的事，命令，紧急的
augment  增加，增大
isomorphic  同构的
distinguish  区分， 辨别
unique  独一无二的
opt-out 选择推出，不参加
alternative  供选择的；供替代的选择
whatsoever 无论怎样，无论什么
absence of 缺少
optimize  优化
deploy  部署
performance 性能！表演，绩效
framatically  戏剧地，显著的，剧烈地
compatibility 兼容性
demonstrate  演示，论证
integrated 完整的
consistent  一致的，始终如一的
constant  常量
phase   阶段 相位
period  周期
