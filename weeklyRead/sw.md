## sw

- 仓库 `https://git.souche-inc.com/souche-f2e/souche-publish`

- 判断发布的环境是否是测试环境
    - 测试环境 `rollingPublish.publish`
    - 非测试环境 `semverPublish.publish`

- global_data
    - 存储package.json为绝对路径 `PACKAGE_JSON_PATH`
    - 存储config/project.config.js为绝对路径 `PROJECT_CONFIG_PATH`
    - `package.json --> packageJsonContent`
        - 使用 `version`
    - `config/project.config.js --> projectConfigContent`
        - 使用 `organization`, `serverRelativePath`, `department`, `name`, `publishSourceFolder`
    - SERVER_RELATIVE_PATH = `serverr\RelativePath || department/name`
    - zip文件名 process.cwd + `SERVER_RELATIVE_PATH (处理 \ --> -)` + `version`  ？？？
    - DIST_FOLDER `publishSourceFolder` 或者 `dist文件夹`

- rollingPublish
    - cmd `ssh scdev@115.29.202.141 'mkdir -p ${serverAssetsPath}'`
        - 关于 serverAssetsPath (远程文件夹)
        - if `organization === 'souche'` --> /home/scdev/vip/ + `orgazation/SERVER_RELATIVE_PATH`
        - else --> /home/scdev/ + `envPath` + /souche-f2e/project/ + `SERVER_RELATIVE_PATH`