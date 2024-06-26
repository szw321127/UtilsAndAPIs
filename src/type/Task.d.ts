type StateType = 'REJECTED' | 'FULLFILLED' | 'PENDING'

type TaskFn<T> = () => Promise<T>

type TaskNode<T> = {
	task: TaskFn<T>
	resolve: (value: T | PromiseLike<T>) => void
	reject: (reason?: any) => void
}

interface ITask {
	add<T>(task: TaskFn<T> | TaskFn<T>[]): Promise<T | T[]>
}
