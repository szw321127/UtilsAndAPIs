export const isPromiseLike = (obj: any): boolean => {
	const isObjOrFn = obj && (typeof obj === 'object' || typeof obj === 'function')
	return isObjOrFn && typeof obj.then === 'function'
}
