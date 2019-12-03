## 阅读mobx源码

### background
- 使用mobx两年，知其然却不知其所以然
- read version: v5.15.0

### 构建相关
- 通过 `npm run small-build` 进行构建，生成 `lib/`, `.build.es5/`, `.build.es6/` 三个文件夹
- `tsConfig.json` 中指出了 `rootDir: src`, `outDir: lib`，供构建时生成目录使用


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