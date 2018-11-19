## 点击下载文件直接打开的解决方式 (share by 谢万琴)

### 1.出现场景

一般一个a链接指定了一个文件的路径，想实现点击直接下载的功能

``` bash
<a href='文件地址' download='文件名'>下载文件</a>
```

想要通过这种方式实现，这个方法受到浏览器的限制以及文件地址类型的限制。到底是如何限制的，我用node.js进行了一个简单的API测试，文件目录如下，可通过localhost:8888访问index.html,

```bash
└── src
    ├── main.js                          API控制
    ├── index.html                       主页面(一个a链接作测试)
    ├── flower.png                        文件
    ├── share.pptx
    └── test.docs
```

#### 1.1 Chrome测试

``` bash
//引用本地文件
<a href="flower.png">不加download属性</a>
<a href="flower.png" download="newName.png">加download属性</a>
```

1. 经过测试，加上download属性会强制立即下载，并且download属性的值就是保存的文件的名字；不加不能进行下载
2. 图片格式的文件浏览器可以自己打开，加上download属性才会有下载的区别，但是如果是浏览器不能打开的文件比如.pptx的文件，此时download属性加不加都无所谓了

#### 1.2 Firefox测试

``` bash
//引用本地文件
<a href="flower.png">不加download属性</a>
<a href="flower.png" download="newName.png">加download属性</a>
```

1. 经过测试，加上download属性不会立即强制进行下载，而是有一个弹框提示用户是选择本地打开还是保存到本地，并且文件名是download的属性值，不加直接打开
2. 不同格式的文件处理 `Firefox` 与 `chrome` 差不多，只要是浏览器不能直接打开的文件浏览器都会直接进行下载，不需要通过download属性，不同的点在于 `Firefox` 会进行询问

#### 1.3 Safari测试

Safari效果与Chrome相同

如果是网络地址，download属性会因为浏览器不同而可能无效，因此不推荐使用

### 2.如何让文件不受浏览器限制做到兼容下载呢？

> **Content-Type** —— 查阅了资料，发现只要是文件地址的响应头的Content-Type为 `application/octet-stream` 或者 `application/force-download` 即可

```bash
app.get('/download/:fileName', (req, res) => {
    let fileName = req.params.fileName;
    let filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.end('Read file failed');
            return;
        }
        //第一种： res.send(data)会自动将响应头的Content-Type设置为 `application/octet-stream`
        //res.send(data);

        //第二种
        res.set('Content-Type', 'application/octet-stream');
        res.end(data);
    });
});
```

如果要阻止res.send()的自动下载功能，可以通过 `res.set('Content-Type', 'image/png')` 或其他有效的  `Content-Type` 值来让某种文件显示。

### 写在最后的话(只有这句话是我写的，逃-。-)
> 感谢万琴同学的新人分享，另外我只是搬运工，这篇文章也是她自己进行输出的(赞)。其代码仓库还没有来得及找她放上去。如果各位有什么见解，欢迎继续来补充到这篇文档上。