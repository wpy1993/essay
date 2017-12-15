## nrm


### 什么是nrm
> nrm依旧是一个第三方的node包
> npm 安装第三方的package都是走的默认registry(源)
> registry有淘宝镜像, cnpm, npm等，当然可能公司内部也会有自己的源，比如大搜车的snpm
> 默认的registry在国外，需要翻墙
> 旨在帮助用户在不同的npm的源中自如切换

### 为什么需要nrm
> 我曾经以为我也不需要nrm，我会保留npm，但是也可以设置繁琐的cnpm，snpm等等，来作为不同的源，`npm list -g --depth 0`可以查看安装的所有的包依赖
> 但是后来我发现，create-react-app, 会在init的时候便把`node_module`全都安装成功，默认使用npm指令下的registry,傲娇的我不愿意更改npm指向的registry，所以屡装屡败

### nrm安装
- nrm是个包，所以直接 `npm install -g nrm` 即可

### nrm指令
- nrm ls  **查看nrm提供的所有的源的list,其中星号代表当前使用的源**
- nrm use <registry>  **使用某个源（填写名称即可）**
- nrm add <registry> <url> [home]  **添加某个源（可以设置昵称和路径）**
- nrm home <registry> [browser] **使用浏览器（可指定）打开某个源的官网**
- nrm del <registry>  **删除某个源**
- nrm test [registry]  **测试所有源（指定源）的速度**
- nrm help  **帮助**