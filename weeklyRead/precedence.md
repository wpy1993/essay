## 关于JS操作符的优先级

> 起因，true && true || false 这句话我总是凭感觉去使用的，从来没有思考过 && 和 || 会不会存在优先级的区别，而且代码到底是从左往右读还是从右往左读，仅仅是在chrome控制台确定了一下答案，从来没有深究过。

真正的优先级
20. 括号 | () | 无阅读顺序区别
19. member access | object.property | eg: foo.value1 | 从左往右读取
19. computed member access | object[property_name] | eg: foo['name'] |  从左往右

<!-- 特别关注1 -->
19. new (with args) |  | 无序
19. function call |  | 从左向右
18. new (without args)  |  | 从右向左

<!-- 特别关注2 -->
17. postfix increment | i++ 优先return i , 然后i = i + 1
17. postfix decrement | i--

16. logical not | !true

<!-- 特别关注3 -->
16. bitwise not | ~i | ~i = -(i + 1)
16. unary plus | +i | 
16. prefix increment | ++i
16. prefix decrement | --i


<!-- 注释1 -->
new foo(), foo(), new foo(args), 那么其执行顺序就是 args --> foo() --> new

1. define the object type by writing a function 定义一个function类型的对象（本质是对象）
2. create an instance of the object with new 通过new关键字创建一个对象实例

如果没有args，那么 new foo == new foo()  --> 


<!-- 注释2 -->
prefix优先于postfix, 也就是说 ++i 优先于 i++ , 那么 ++2++ --> 
阿咧？++i++ 报错了， // Uncaught ReferenceError: Invalid left-hand side expression in postfix operation
但是可以证明后执行的是postfix (i++)
<!-- 注释3 -->
~i = -(i + 1) 在js中，可以简单的认为0没有正负号，所以 ~-1 = 0

<!-- 注释4 -->