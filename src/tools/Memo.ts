class DictNode {
	res = undefined
	save = false
	primitive = new Map()
	object = new WeakMap()
	setResult = (res: any) => ((this.res = res), (this.save = true), res)
}

function isObject(arg: unknown) {
	return typeof arg === 'function' || (typeof arg === 'object' && arg !== null)
}

type Fn = (...args: any[]) => any

function memoize(fn: Fn) {
	const root = new DictNode()
	return function (...args: any[]) {
		let dict = root,
			map
		for (let item of args) {
			map = isObject(item) ? dict.object : dict.primitive
			if (!map.has(item)) map.set(item, new DictNode())
			dict = map.get(item)
		}
		if (dict.save) return dict.res
		else return dict.setResult(fn(...args))
	}
}

let callCount = 0
const memoizedFn = memoize(function (a, b) {
	callCount += 1
	return a + b
})
memoizedFn(2, 3) // 5
memoizedFn(2, 3) // 5
console.log(callCount) // 1
