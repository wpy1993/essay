### node


#### node bug

> error unexpected json parse '...'

- npm cache clear -f
- sudo npm cache clear -f
直到 `~/.npm/_cacache/cotext-v2这个文件夹被删除
同样，可以配合着
- npm cache verify
- sudo npm cache verify
我也不清楚为什么有时候必须配合着verify才有效

> nvm use node 重启terminal之后无效
- 明明.zshrc里面也有那两句话，可能是zsh进程没有被杀死，也可能是因为那两句话真的需要在.bashrc里面写入才行。如何写入见我上一次提交，忘记在哪一个md里面了