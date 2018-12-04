## 工作号改造为通用版说明

> 之前杭州native大佬在迁移工作号时吐槽太麻烦了，后来上海前端掀起了沉淀热潮，适逢工作号完全  
> 开发完毕，看了下，改造成通用版可行，于是就有了这个文档

1. [vue改造](###pc项目改造)
2. [RN改造](###rn项目改造)

### PC项目改造

> pc端共计三个项目，大搜车统一工作台一个，私有化业务两个，迁移时是针对私有化业务两个项目  
> （集团/dealer-workcode， 门店/shop-workcode）。看了下代码，src文件夹中没有区别，  
> 主要区别在于 `config/` 下面的几个文件以及`package.json`

1. 预备 - 首先要知道，生成压缩文件，并且发布（sw）到服务器，到底是哪几个文件在起作用
    
    ```bash
        # dev/build 涉及的文件
        ├── config/dev.env.js               测试环境配置，uri等
        ├── config/prepub.env.js            预发环境配置，同上
        ├── config/prod.env.js              产线环境配置，同上
        └── config/project.config.js        通用配置，存储一些配置

        # sw 涉及的文件
        ├── dist/                           被上传的文件夹的主体
        ├── package.json                    配置版本号
        └── config/project.config.js        通用配置，关于服务器存储位置等
    ```


2. 思路 - 根据预备的知识，我能够想到的方式有两种
    - 在 `dev/build/publish` 上面做手脚，把不同的配置放置在执行上面三个指令的里面
    - 做一个新的命令，将所有的配置都存储起来，手动的切换环境，然后执行原版的 `dev/build/publish`

3. 分析了之后，自我感觉第一种把配置写入对应指令执行的代码中，这种行为可能会导致埋的有点深，不方便以后的扩展，如果有新人来接手的话，可读性可能会受到轻微的影响，第二种做法很小白，挺low的，会存储大量的文件。但是为了方便阅读，决定采用第二种方式

4. 实操
    - config文件夹下同级创建一个configs文件夹，里面根据业务进行分类创建子文件夹 eg: su/ ， 里面放置真正的配置

        ```
            ├── config
            └── configs
                ├── su
                │   ├── dev.env.js
                │   ├── prepub.env.js
                │   ├── prod.env.js
                │   └── project.config.js
                └── gh
        ```
    - package.json 中新建一个 `switch` 指令，运行 `build/switch-host.js（新建）`文件
    - 在`switch-host.js`文件中进行业务的切换，关键代码如下

        ```code

            function setHost(id) {
                // 把configs/下面对应的业务的配置copy到config/中
                let cmd = `cp -r ./configs/${id}/ ./config/`

                execSync(cmd)

                // 修改package.json内部的name和description属性
                cmd =
                    `sed -i '' 's#"name": ".*"#"name": "${hostInfo[id].name}"#g' package.json &&
                    sed -i '' 's#"description": ".*"#"description": "${hostInfo[id].description}"#g' package.json`

                execSync(cmd)
            }
        ```

    - 最后，就可以通过 `npm run switch su/gh/os/yf` 或者 `npm run switch`(弹选择窗进行业务的切换)

5. ps: 
    - 建议把config/ 里面对应的配置文件放入 .gitignore，否则每次切换环境都会发现有大量的修改记录挺麻烦的
    - sed 指令在mac的node中被exec会报错，找史华帮忙hack了一下 sed -i 尾随了一个 空值 ''

### RN项目改造

> 由于我们的RN模块里面的api配置都改为了native配置，让我们无需关注api接口的域名
> 代码中唯一不同的地方就是页面进行跳转时的路径。

1. 预备 - 一个完整的未编码的`protocol协议`如下例子
    - `guanghui://open/reactnative?module=SUGHCustomerInfo&props={"route": "/newInfo"}`  
    我们可以看到，有且仅有`guanghui`(app scheme)， `SURNWorkCode`(module name) 这两个字段是不同的

2. 进行配置
    - **app scheme** 可以通过`SRNConfig.appScheme`货渠道
    - **module name** 现在并不存在，我们可能需要做一个由appScheme进行判断的映射，比如下面的代码
    
        ```
            // 新建客户的枚举 appScheme : moduleName
            const customInfoMap = {
                'yingfeinidi': 'custom_info_rn',
                'guanghui': 'RNGHCustomerInfo',
                'oushang': 'RNOSCustomerInfo',
                'singleunit': 'SUGHCustomerInfo'
            };
            // 获取新建客户的模块名
            function getCusInfoModuleName() {
                return customInfoMap[appScheme] || '';
            }
        ```
        该代码可以放在一个`utils.js`中，哪里需要哪里引入

3. 最终一个动态的跳转协议应该如下
    - `${ SRNConfig.appScheme }://open/reactnative?module=${ getCusInfoModuleName() }&props={"route": "/newInfo"}`

4. ps： 如果是老项目，建议修改rn模块的名字，同时需要修改的还有`Makefile的Path`

> 以上就是对于工作号改为通用版进行的思考和操作。但是感觉还是不是特别理想。应该还有更优 ——易读且高效 的方法。
> 但是由于对node和linux指令并不熟，所以基本上一边百度一边拼凑出来。