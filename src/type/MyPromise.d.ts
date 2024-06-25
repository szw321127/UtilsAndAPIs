interface IMyPromise<T> {
	then<TResult1, TResult2>(
		onfullfilled?: OnFullFilledType<T, TResult1>,
		onrejected?: OnRejectedType<TResult2>
	): PromiseLike<TResult1 | TResult2>

	catch<TResult>(onrejected?: OnRejectedType<TResult>): PromiseLike<TResult>
}

type ResloveType<T> = (result?: T | PromiseLike<T>) => void

type RejectType<T = any> = (reason?: T) => void

type OnFullFilledType<T, TR> = ((result: T) => TR | PromiseLike<TR>) | null

type OnRejectedType<T> = ((...args: any) => T | PromiseLike<T>) | null

type HandlerType = {
	onfullfilled?: OnFullFilledType<any, any>
	onrejected?: OnRejectedType<any>
	reslove: ResloveType<any>
	reject: RejectType
}

type AllResult<T extends readonly unknown[] | []> = {
	-readonly [P in keyof T]: Awaited<T[P]>
}
