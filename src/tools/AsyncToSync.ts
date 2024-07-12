function fetchSync(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> {
	let cache: CacheType = {
		state: 'pending',
		value: null
	}
	return new Promise((resolve, reject) => {
		const oldFetch = window.fetch
		;(window.fetch as any) = (input: RequestInfo | URL, init?: RequestInit | undefined) => {
			if (cache.state === 'fulfilled') {
				return resolve(cache.value)
			} else if (cache.state === 'rejected') {
				return reject(cache.value)
			} else {
				throw oldFetch(input, init)
					.then(res => {
						cache.state = 'fulfilled'
						cache.value = res
					})
					.catch(rej => {
						cache.state = 'rejected'
						cache.value = rej
					})
					.finally(() => {
						window.fetch(input, init)
					})
			}
		}
		window.fetch(input, init)
		window.fetch = oldFetch
	})
}

function getUserInfo() {
	return fetchSync('/jsons/userInfo.json').then(res => res.json())
}

async function m1() {
	console.log('m1')
	return await getUserInfo()
}

async function m2() {
	console.log('m2')
	return await m1()
}

async function m3() {
	console.log('m3')
	return await m2()
}

async function main() {
	console.log('main')
	const user = await m3()
	console.log('feng', user)
}

main()
