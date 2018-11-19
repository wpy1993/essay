### 构造函数

```
function ConstructorFunc () {
    // 私有对象，貌似永远不可见，至少ConstructorFunc.privateName和InstanceObj无法获取到
    var privateName = 'wpy'

    this.name = 'wplay'
}

// 打印ConstructorFunc时看不到，但是ConstructorFunc.age可以读取出来，即使是后期再创建的实例对象也无法读取到
ConstructorFunc.age = 25

// 只有实例对象可以获取到,prototype也无法获取到
ConstructorFunc.prototype.name = 'wangpingyuan'
ConstructorFunc.prototype.age = 24.9

let InstanceObj = new ConstructorFunc  // 壹

consoloe.log(ConstructorFunc) // a function; no age; return the whole function
console.log(InstanceObj)  // a Object; ; base on CosntructorFunc function

```

- 壹 对于构造函数（使用new的函数），如果在创建实例(对象)时不传递参数，可以不带 ()
- 贰 很小白的知识点，构造函数是函数，实例对象是实例

