/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
function cancellable<T>(generator: Generator<Promise<any>, T, unknown>): [Function, Promise<any>] {
	let cancel = () => {}
	const promise = new Promise<T>((reslove, reject) => {
		const run = async (result?: any, property: 'next' | 'throw' = 'next') => {
			try {
				const { value, done } = generator[property](result)
				if (done) return reslove(value as T)
				value.then(run).catch(err => run(err, 'throw'))
			} catch (error) {
				return reject(error)
			}
		}
		cancel = (msg = 'Cancelled') => {
			run(msg, 'throw')
		}
		run()
	})
	return [cancel, promise]
}

function* tasks(): Generator<Promise<number>> {
	try {
		yield new Promise((resolve, reject) => reject('Promise Rejected'))
	} catch (e) {
		let a = (yield new Promise(resolve => resolve(2))) as number
		let b = (yield new Promise(resolve => resolve(2))) as number
		return a + b
	}
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [cancel, promise] = cancellable(tasks())
promise.then(console.log).catch(console.log)
