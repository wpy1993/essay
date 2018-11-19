
### srn-framework

```bash
        
├── mobx                状态管理工具
├── SRNApp              初始化app
├── SRNPage             页面专用
├── SRNConfig           全局配置项
├── SRNModel            存储模型，快速map
├── SRNStore            状态存储
│   ├── Axios
│   ├── Fetch
│   ├── Storage
└── decorators          装饰器
    ├── LifeCircle      添加新的生命周期和route信息
    ├── ServerName      model字段别名
    ├── Check           
    └── Unit            
    
```

### app project
```bash
        
├── index.android.js          代码入口，无需关心
├── index.ios.js              代码入口，无需关心
├── package.json              依赖配置
└── src                       所有项目代码都应在此文件夹内
    ├── app.js                应用逻辑入口
    ├── components            通用模块请安排在此
    ├── config                所有环境的自定义配置请安排在此
    │   ├── default.config.js
    │   ├── dev.config.js
    │   ├── prepub.config.js
    │   └── prod.config.js
    ├── models                通用 Model 定义
    │   └── CarModel.js
    ├── pages                 所有页面都应该定义于此
    │   ├── Index
    │   │   ├── components    页面中抽离的子组件
    │   │   │   └── CarItemView.js
    │   │   └── index.js
    │   └── List
    │       └── index.js
    └── stores                页面中涉及到的 store 都应定义于此，可以分文件夹
        └── indexStore.js
```


