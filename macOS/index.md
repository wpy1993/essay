
## 记录一些操作

> 删除os x 回收站单一文件/文件夹

- cd ~/.Trash
- ls `watch the trash list`
- rm -rf [file/folder name]
- finish


nvm 安装后自动将

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

这两句话写入~/.zshrc，然并卵，第二次打开terminal（zsh版）的时候，依旧找不到node，`nvm ls`也是empty,方法就是将上面两句话写入 /etc/bashrc中或者是`/etc/profile`（profile里面很空，不敢写，待考证）中即可