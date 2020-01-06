## 阅读mobx源码

### background
- 使用mobx两年，知其然却不知其所以然
- read version: v5.15.0

### 构建相关
- 通过 `npm run small-build` 进行构建，生成 `lib/`, `.build.es5/`, `.build.es6/` 三个文件夹
- `tsConfig.json` 中指出了 `rootDir: src`, `outDir: lib`，供构建时生成目录使用


### 文件结构
  - api
  - core 核心概念
  - types 数据类型
  - utils 工具

### 常用功能
- observable
- observer
- computed
- autorun
- $mobx
- globalState

### 核心概念
- action
  - {interface}    `IAction`
  - {func}         `createAction`
  - {func}         `executeAction`
  - {interface}    `IActionRunInfo`
  - {func}         `_startAction`
  - {func}         `_endAction`
  - {func}         `allowStateChanges`
  - {func}         `allowStateChangesStart`
  - {func}         `allowStateChangesEnd`
  - {func}         `allowStateChangesInsideComputed`

- atom
  - {variable} $mobx
  - {interface} IAtom
  - {class} Atom
    - {func} onBecomeObserved
    - {func} onBecomeUnobserved
    - {func} reportObserved
    - {func} reportChanged
  - {variable} isAtom
  - {function} createAtom

- computedvalue
  - {class}    `ComputedValue`
  - {bool}  `isComputedValue`

- derivation

- globalstate
  - 真正的状态存储位置
  - {class} MobXGlobals
  - {variable} globalState
  - {func} isolateGlobalState
  - {func} getGlobalState
  - {func} resetGlobalState

- observable
  - 所有的函数，第一个入参就是observable对象，
  - {func} hasobservers
  - {func} getObservers
  - {func} addObserver
  - {func} removeObserver
  - {func} queueForUnbservation
  - {func} startBatch
  - {func} endBatch
  - {func} reportObserved
  - {func} propagateChanged
  - {func} propagateChangeConfirmed
  - {func} propagateMaybeChanged
  - {func} logTraceInfo
  - {func} printDepTree


### utils

- comparer
  - identityComparer  `a === b`
  - deepEqual `equal(a, b)`
  - shallowComparer `equal(a, b, 1)`
  - defaultComparer `Object.is(a, b) 最严格, 可参考mdn`

- decorators
  - createPropertyInitializerDescriptor [internal]
  - initializeInstance  `将target的所有的属性和symbol遍历且装饰起来`
  - createPropDecorator `配合上一条阅读更容易一些，这里create，然后才能够initialInstance`

- eq
  - deelEqual `一个可以指定深度的deep equal`

- iterable
  - makeIterable `使target变成可迭代的，创造一个指向自己的名为iterator属性`

- utils
  - 其余的工具 -> 变量/方法，包括 `getNextid`, `once`, `unique`, `isObject`,  
    `isPlainObject(无多余继承的对象)`, `makeNonEnumerable`, `isArrayLike`等

#### globalState创建逻辑
  1. 预判断是否支持合并state（使用旧的state），不支持的条件：暂不存在globalState或两个版本不对
  2. 是否支持合并state
    - --> 否 --> 新建一个globalState并且return
    - --> 是 --> 是否已经存在state
      - 是 --> 直接使用旧的globalState并且__mobxInstanceCount++，return该state
      - 否 --> __mobxInstanceCount = 1, 新建一个globalState，赋值给globalState，并且retur

#### global实例内容
  - enforceAction: boolean | 'strict' = false  非strict模式下，不要求必须通过action才能改变observable的值