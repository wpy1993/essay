// 测试一下promise

const basicPromise = (bool = true) => {
    return new Promise((resolve, reject) => {
        bool ?
            resolve(true)
            :
            reject(false)
    })
}

let result = basicPromise(true).then((res, rej) => {
    console.log('res && rej', res, rej)
    return Promise.reject('reject haha')
}, (res, rej) => {
    console.log('reject --> res && rej', res, rej)
})
.catch((e) => {
    console.log('error', e)
    return Promise.reject()
})

// 发现，如果你写了catch，那么Promise.reject('reject haha')
// 就会被catch拦截，那么就需要 1. 你取消掉上面的拦截
// 2. 进入下面以后，认同result.then里面的res是空这个事实

result.then((res, rej) => {
    console.log('result res rej', res, rej)
}, (e) => {
    console.log('result reject', e)
})
.catch(e => {
    console.log('res error', e)  // 基本上进不来，除非res.then的代码错误
})
// consoles below
// res && rej true undefined
// error reject haha
// result res rej undefined undefined