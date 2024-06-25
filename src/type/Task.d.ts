type StateType = 'REJECTED' | 'FULLFILLED' | 'PENDING'

type ReturnData<T> = {
	state: StateType
	data?: T
	index: number
}

type TaskFn<T> = () => Promise<T>

type TaskNode<T> = {
	tasks: TaskFn<T>[]
	resolve: (data: ReturnData<T>[]) => void
}

interface ITask {
	add<T>(task: TaskFn<T> | TaskFn<T>[]): Promise<ReturnData<T> | ReturnData<T>[]>
}
