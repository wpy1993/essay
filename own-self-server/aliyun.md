## 个人服务器

> 从阿里云购买了三年的服务器和一年的域名

- 服务器公网 47.97.1.183
- 域名 axeloli.com
- emm...都还不知道怎么用

### 服务器使用宝塔面板流程
1. 按照阿里云的这个[智(zhi)能(zhang)](https://edu.aliyun.com/course/147)课程上面的`课时二: 安装网页运行环境`，只不过在和他里面不同的是他安装LAMP环境，我们安装宝塔环境
2. 等待宝塔购买（免费）成功后，通过公网 + 端口（默认8888）的方式可以进行访问页面
3. 如果不知道端口是多少，可以使用指令`cat /www/server/panel/data/port.pl`获取端口
4. 第一次进入宝塔，会设置用户名和密码

### step
1. 购买服务器
2. 购买域名
3. 域名实名认证+报案
4. 服务器安装LNMP或者LAMP(linux nginx/apacha mySQL php)或者宝塔
5. 在宝塔安装ngnix
6. nginx默认配置+改动http的server内容即可。改动包含server_name root location

### nginx指令
- nginx -h | -? `get help`
- nginx -t  `test configuration and exit`
- nginx -s reload()  `send a signal to a master process: stop quit reopen reload`


### extra
- `whereis` whereis可以查找安装程序，比如whereis php、whereis nginx


### 参考
- [宝塔官网-指令合集](https://www.bt.cn/btcode.html)
- [centos7上使用宝塔面板配置LNMP环境安装zabbix4.2](https://blog.51cto.com/11555417/2415805)
- [nginx静态资源配置](https://blog.csdn.net/youxiu326/article/details/89347317)
- [nginx静态资源server配置和nginx指令](https://blog.csdn.net/youxiu326/article/details/89347317)