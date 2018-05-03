### 这里用来记录一些linux-shell指令

#### 通用的参数
- -f `--force` **强制执行**
- -v `--verbose`  **显示指令执行进程**
- `--version` **查看版本** 貌似没有缩写


#### 指令
- rm -rf xxx `-rf等放在 文件/文件夹 前面` **删除文件/文件夹**
    - `rm`remove **注意，linux没有回收站**
    - -r `--recursive` **递归的** 主要用于删除文件夹（递归的遍历内部文件）
    - -f `--force`
    - -d `--directory` **目录** 删除硬连接（不懂什么叫硬连接）
    - [参考](https://blog.csdn.net/leon1741/article/details/54425683)

    > 思考，1.貌似删除文件夹，我已知的能够成功的是`-rf` 和 `-d`.其他的都失败。。。 2.什么是硬连接`-d`

- `mv [source & name] [aim & newName] ` **移动并且重命名文件夹**

- `ls` **list** 查看当前文件夹下的所有文件/文件夹
- `mkdir [dirName]` **make directory** 创建文件夹