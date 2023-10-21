export function sleep(time = 2000) {
	return new Promise((r) => setTimeout(r, time));
}
