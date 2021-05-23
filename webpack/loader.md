## webpack 之 loader


### 重点
- loader执行顺序是从右向左`compose`的顺序
  - [函数组合 - compose和pipe](https://www.jianshu.com/p/eb268cb0f913)

- enforce字段可以改变执行优先级

### Qusetion
- loader的顺序，包含两部分（不同的test之间，同一test内）这个compose顺序指的是哪里？还是两个都是
- 学会自己写loader