## webpack 之 plugin

### 重点
- plugin是为了解决 loader 无法解决的问题
- plugin类，自执行apply方法，注入complier对象

### Questions
- loader无法解决什么问题？
- entry 动态加载的模块不是入口起点?