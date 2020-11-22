# 阿里云部署node项目


> 记录一次将阿里云部署到server服务器上的经历和坑

## 前置条件
- node项目使用了express
- 有自己的阿里云ecs服务器和域名

### 生成express项目
- 不再赘述，反正可以 `npm run start` 跑起来，默认的端口是3000

### 服务器项目操作
1. 项目通过ftp上传到服务器
2. 通过git和wget全局安装nvm管理node版本
3. `nvm install node@v14.15.0` 大概是这个指令
4. `npm install pm2 -g` pm2管理(开启/关闭/查看进程)node项目
5. `pm start 项目根路径/bin/www` 因为`npm run start` 指令的操作就是 `node ./bin/www`

- 说明
  - 通过`npm run start`也能够跑起来项目，但是这样以来你的终端就被占用了，你需要新开启一个窗口，麻烦，pm2 的`start / stop / delete`更方便一些
  - node被安装后怎么绑定到.bashrc中，下次打开终端依旧not found，暂未解决，可能是我需要在 ～/ 下新建一个.bashrc等文件吧
  - `pm start /bin/www`这个第五步操作，可能要放在[服务器配置操作](###服务器配置操作)后再执行吧


### 服务器配置操作
1. ecs服务器`安全组规则`，`入规则`中将 3000端口 放开
2. **如果有防火墙**，`防火墙`放开 3000端口
3. **如果有其他进程占用3000端口**，酌情干掉它
4. 这时候我们通过`http://[ip]:3000`就可以访问我们的express_node项目了

- 说明
  - [这篇文章最全，我就是参考这个和其他的琐碎的文章的](https://blog.csdn.net/putao2062/article/details/79688020)
  - `netstat -tpln` 或者 `netstat -nultp`，查看端口号和被使用情况，最好记住
  - 关于阿里云管理，我用的是宝塔面板，里面可以配置防火墙和安装配置nginx等

### 配置域名

> 能够通过ip访问后，心又膨胀了，想要用域名访问它了

1. 配置nginx，我只是搜索时偶尔看到了 `proxy_pass` 字样，原来这个就是反向代理的使用方式之一啊, 具体`nginx伪代码`如下

  ```code
    http {
      // ...省略多余

      server {
        listen 80;
        server_name node.axeloli.com;
        location / {
            proxy_pass http://[ip]:3000;
      }
  }
    }
  ```
2. 重载(reload) nginx
3. 既然决定了`node.axeloli.com`，那么还要去域名的`云解析DNS`中去配置一下，把`node`前缀支持一下

- 说明
  - [反向代理我搜到了这篇](https://www.cnblogs.com/tugenhua0707/p/9880515.html)
  - 关于反向代理，最后有没有 `/` 我还没去理解这件事，回头仔细看看 @TODO




> 好了，大功告成了，现在可以通过`node.axeloli.com`访问我的项目了，虽然里面空空如也，没接口也没有数据库，但我乐意



### 插曲，使用自己的terminal远程连接阿里云数据库

> 实在不想用阿里云的那个workbench，部署node项目时顺手搜索的，有教程的，贴最下面，我稍微补充几个细节算了

[使用本机mac终端连接阿里云服务器教程](https://help.aliyun.com/document_detail/51798.html)

- 说明
1. 前提条件的，`为实例绑定密钥对`，没操作的请添加一下
2. 目录直接看 `在支持SSH命令的环境中使用密钥对（通过config文件配置信息）`， 毕竟我们的目的是想要通过 `ssh wplay`即可输入密码访问到远程服务器的（wplay是随便起的别名）
3. 关于`chmod 400 ~/.ssh/ecs.pem`，不必追求这个`.pem`文件，直接就是在说你的私钥`id_rsa` （RFC4716格式）
4. `ssh wplay` 连接到服务器后，想要退出，输入`exit`即可退出

- 说明2
  - [不要强求pem后缀，文章看这个](https://qastack.cn/server/706336/how-to-get-a-pem-file-from-ssh-key-pair)
  - [如何退出远程连接，看这个](https://blog.csdn.net/zhichaosong/article/details/89193767)