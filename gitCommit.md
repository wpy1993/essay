种种原因，想要在git commit时，强制提交规范

在prettier和eslint之间犹豫了很久

- prettier + husky
参考了pretty-quick，可以看大搜的[这篇文章](https://blog.souche.com/prettier-your-project/)

- eslint-staged + yorkie
参考了尤大大的vue的提交规范

我暂时没有过多的尝试，所以prettier和eslint兼得的eslint-plugin-prettier，格式化出来的风格不是我想要的，所以选择性放弃，可能有更好的出路，但是放弃了

最终决定
eslint-staged + husky + vue的commit-msg

在package.json写入

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "node build/verify-commit-msg.js"
    }
  },
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "git add"
    ],
    "*.vue": [
      "eslint --fix",
      "git add"
    ]
  },
}

```
`verify-commit-msg.js`来自于vue，由于使用了husky，所以环境变量改为 `HUSKY_GIT_PARAMS`
