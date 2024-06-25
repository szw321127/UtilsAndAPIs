enum State {
	PENDING = 'PENDING',
	RUNNING = 'RUNNING',
	DONE = 'DONE'
}

enum ResultState {
	PENDING = 'PENDING',
	REJECTED = 'REJECTED',
	FULLFILLED = 'FULLFILLED'
}

export class Task implements ITask {
	private _state: State = State.PENDING
	private taskQueue: TaskNode<any>[] = []
	private reslove: (value: any) => void = () => {}
	private taskList: (() => Promise<any>)[] = []
	private results: ReturnData<unknown>[] = []
	private limit: number = 10

	constructor(limit: number) {
		this.limit = limit || this.limit
	}
	private runALL<T>(tasks: TaskFn<T>[]) {
		let rLen = this.results.length
		for (let i = 0, len = tasks.length; i < len; i++) {
			const task = tasks[i]
			task()
				.then(res => {
					this.results.push({
						state: ResultState.FULLFILLED,
						data: res,
						index: rLen + i
					})
				})
				.catch(rej => {
					this.results.push({
						state: ResultState.REJECTED,
						data: rej,
						index: rLen + i
					})
				})
				.finally(() => {
					this._state = State.DONE
					if (this.results.length === tasks.length + rLen) {
						this.run<T>()
					}
				})
		}
	}

	private run<T>() {
		if (this._state === State.RUNNING) return
		this._state = State.RUNNING
		if (this.results.length === this.taskList.length) {
			this._state = State.DONE
			this.reslove(this.results)
			return
		}
		let runList: TaskFn<T>[] = []
		let i = 0,
			rLen = this.results.length
		while (i < this.limit && i + rLen < this.taskList.length) {
			runList.push(this.taskList[i++])
		}
		this.runALL<T>(runList)
	}

	add<T>(tasks: TaskFn<T>[]): Promise<ReturnData<T>[]> {
		return new Promise<ReturnData<T>[]>(resolve => {
			this.taskList = [...tasks]
			this.reslove = resolve
			this.run<T>()
		})
	}
}
