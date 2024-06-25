import { MyPromise } from './tools/MyPromise'

// const promise = new MyPromise<string>((reslove, reject) => {
//   setTimeout(() => {
//     reject("success");
//   }, 1000);
// })

// promise.then((data) => {
//   console.log(data, 'reslove');
// }, (error) => {
//   console.log(error, 'reject');
//   return new MyPromise<string>((reslove) => {
//     setTimeout(() => {
//       reslove("456");
//     }, 1000);
//   })
// }).then((data) => {
//   console.log(data, 'reslove1');
//   return 123
// }).then((data) => {
//   console.log(data, 'reslove2');
// })

// new MyPromise<number>((reslove, reject) => {
//   reslove(123)
// }).then(res => {
//   console.log(res, 'then1')
// }).catch(rej => {
//   console.log(rej, 'catch1')
//   return 123
// }).then(res => {
//    console.log(res, 'then2')
//   return 123
// }, rej => {
//    console.log(rej, 'rej')
//   return 123
// }).catch(rej => {
//    console.log(rej, 'catch2')
// })

// MyPromise.reject(123).catch(res => {
//   console.log(res, 'catch3')
// })

// const promise1 = new Promise((reslove) => {
//   setTimeout(() => {
//     reslove("success");
//   }, 1000);
// })

// promise1.then(null, rej => {
//   console.log(rej);
// })

import { Task } from './tools/Task'

let tasker = new Task(2)

const getData = () =>
	new Promise<number>(reslove => {
		setTimeout(() => {
			reslove(Date.now())
		}, 1000)
	})
const now = Date.now()
tasker.add<number>([getData, getData, getData, getData, getData, getData, getData, getData, getData, getData]).then(res => {
	console.log(res)
	console.log(Date.now() - now)
})
tasker.add<number>([getData, getData, getData, getData, getData, getData, getData, getData, getData, getData]).then(res => {
	console.log(res)
	console.log(Date.now() - now)
})

MyPromise.all([
	getData(),
	getData(),
	getData(),
	getData(),
	getData(),
	getData(),
	getData(),
	getData(),
	getData(),
	getData()
]).then(res => {
	console.log(res)
})
