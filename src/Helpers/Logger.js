export const Logger = (store) => (next) => (action) => {
	// next(action);
	// console.log(action);
	console.group(action.type);
	const oldState = store.getState();
	console.log('current state', oldState);
	console.info(`dispatching`, action);
	let result = next(action);
	const newState = store.getState();
	console.log('next state', newState);
	// console.info('state diff', diff(oldState, newState))
	console.groupEnd();
	return result;
};
