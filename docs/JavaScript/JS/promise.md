---
aside: true
layout: doc
---

## Promise 学习

一个 promise 对象有三种状态。pending（等待），fulfilled（已成功），rejected（失败）

```javascript
var thunder = new Promise((resolve, reject) => {
  resolve("123123");
});
console.log(thunder);
console.log(thunder.then());
console.log(
  thunder.then(() => {
    console.log("12313");
  })    
);
```
当promise对象状态时fulfilled时会调用后续的.then方法，同时.then本身会返回一个promise对象，并执行.then中的回调函数，如果不是fulfilled的状态则.then也不会执行。
```javascript
   var thunder=new Promise((
      resolve,reject)=>{
        reject('123123') 
      })
      console.log(thunder);
      console.log(thunder.catch(()=>{console.log('12313');}));
```
.catch和.then用法并无区别，只是是只有当promise对象是reject状态时才会触发
## promise解决了什么
在promise之前，处理多个异步操作时，使用的回调函数嵌套的写法
```javascript
//回调地狱
function fn(fn1) {
    fn1(function (fn3) {
        fn3(function (fn5) {
            fn5(function () {})
        });
    });
};
```
区别于上边的嵌套写法，配合.then和.catch Promise能够使用链式调用的方式
```javascript

```
