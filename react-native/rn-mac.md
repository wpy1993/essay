### 在mac上面init rn遇到的坑

- npm view xxx versions `查看某个模块的历史版本`
    - npm view xxx versions --json `如果模块过多，会有... [num] more items`

- react-native init xxx `安装，注意项目名称禁止中划线 - `
    - react-native init xxx --version xxx --verbose  `--verbose 据说是显示详情，写不写没关系`
    - `http://www.jianshu.com/p/646c5fbd9659`

- npm info xxx [sth]




### init遇到的坑
- 编译失败（使用react-native run-ios）
`https://segmentfault.com/q/1010000012225930`  `https://stackoverflow.com/questions/46463536/coredata-annotation-failed-to-load-optimized-model-react-native`

- `ExceptionsManager.js:71 Unhandled JS Exception: Expected a component class, got [object Object].`
  - 基本上原因都是因为解析标签失败了。比如标签小写，或者是使用了div等不认识的标签
  - div， p标签等在react-native中都是不被识别的,当然，它们可能在react中是被识别的。
  - 因为在rn中，所有的东西是要被渲染成android或者ios认识的东西的，所以不能使用html

### 敏捷的开发
    - 在Xcode中的simulator中，`commad + D` 调出调试菜单，然后 `remote JS debug`可以使用chrome的devTool查看了
    - `http://blog.csdn.net/quanqinyang/article/details/52215652`
    - `http://blog.csdn.net/shan1991fei/article/details/54906758`
