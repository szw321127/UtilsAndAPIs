class HeapNode {
	key: number
	value: number
	prev: HeapNode | null
	next: HeapNode | null
	constructor(key: number, value: number) {
		this.key = key
		this.value = value
		this.prev = null
		this.next = null
	}
}

class LRUCache {
	private capacity: number
	private cache: Map<number, HeapNode> = new Map()
	private head: HeapNode
	constructor(capacity: number) {
		this.capacity = capacity
		this.head = new HeapNode(0, 0)
		this.head.next = this.head
		this.head.prev = this.head
	}

	get(key: number): number {
		if (this.cache.has(key)) {
			let node = this.cache.get(key) as HeapNode
			this.remove(node)
			this.putFront(node)
			return node.value
		}
		return -1
	}

	put(key: number, value: number): void {
		if (this.capacity === 0) return
		if (this.cache.has(key)) {
			let node = this.cache.get(key) as HeapNode
			node.value = value
			this.remove(node)
			this.putFront(node)
			return
		}
		let node = new HeapNode(key, value)
		this.cache.set(key, node)
		this.putFront(node)
		if (this.cache.size > this.capacity) {
			let last = this.head.prev as HeapNode
			this.cache.delete(last.key)
			this.remove(last)
		}
	}

	putFront(node: HeapNode): void {
		let top = this.head.next as HeapNode
		this.head.next = node
		node.prev = this.head
		node.next = top
		top.prev = node
	}

	remove(node: HeapNode): void {
		let prev = node.prev as HeapNode
		let next = node.next as HeapNode
		prev.next = next
		next.prev = prev
	}
}
const cache = new LRUCache(2 /* 缓存容量 */)

debugger
cache.put(1, 1)
cache.put(2, 2)
console.log(cache.get(1)) // 1
cache.put(3, 3) // 该操作会使得密钥 2 作废
console.log(cache.get(2)) // -1
cache.put(4, 4) // 该操作会使得密钥 1 作废
console.log(cache.get(1)) // -1
console.log(cache.get(3)) // 3
console.log(cache.get(4)) // 4
