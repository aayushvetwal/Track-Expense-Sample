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
promise.then((data) => {
	console.log(data);
}, (e) => {
	console.log('error: ', e);
});
*/

console.log('after');