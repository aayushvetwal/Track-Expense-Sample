const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		//resolve('This is my resolved data');
		reject('something went wrong');
	}, 1500);
});

console.log('before');

promise.then((data) => {
	console.log(data);
}).catch((e) => {
	console.log('error: ', e);
}); 

/*
//Promise Chaining
promise.then((data) => {
	console.log(data);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('This is other promise');
		}, 1500);
	});
}).then((str) => {	//this then will only run if the promise returned abvove is successful/resolved
	console.log('does this run with', str);
}).catch((e) => {
	console.log('error: ', e);
});
*/


/*
promise.then((data) => {
	console.log(data);
}, (e) => {
	console.log('error: ', e);
});
*/

console.log('after');