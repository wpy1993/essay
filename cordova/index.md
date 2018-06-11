### cordova / ionic 仅限打包方式

> 这两天帮布雷克索的一个妹子解决一些问题，她使用ionic2 + cordova + angular进行开发，
> angular不在这次研究之中，姑且说一些cordova plugin 相关

#### 安装
- sudo npm install -g ionic@2.2.0 (用3.x.x会有某个报错)

- cordova plugin add [plugin name]
- cordova plugin rm [plugin name]

- cordova run android

- [com.lampa.startapp 插件](https://github.com/Dranste/com.lampa.startapp)


### 排错
- [参考]（https://stackoverflow.com/questions/26654231/cordova-plugins-not-working）
- [PackageName in android.json](https://stackoverflow.com/questions/33020161/cordova-what-does-package-name-in-android-json-mean)
- [cordova-plugin-android-support-v4](https://github.com/vaenow/cordova-plugin-app-update/issues/58)
- [UnhandledPromiseRejectionWarning](https://objcer.com/2017/12/27/unhandled-promise-rejections-in-node-js/)


#### 指令
- ionic cordova plugin list
- cordova plugin ls

- npm包
- semver `比较版本号`
- xml2js 