import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDySlQDxqTSrdn2kiQRzRnUDltsvoekIvI",
    authDomain: "expensify-c0a8e.firebaseapp.com",
    databaseURL: "https://expensify-c0a8e.firebaseio.com",
    projectId: "expensify-c0a8e",
    storageBucket: "expensify-c0a8e.appspot.com",
    messagingSenderId: "243397787555"
  };
  
firebase.initializeApp(config);

const database = firebase.database();

/*
database.ref().set({
	name: 'Aayush Vetwal',
	age: 26,
	stressLevel: 6,
	job: {
		title: 'Developer',
		company: 'Sivic Solutions'
	},
	isSingle: true,
	location: {
		city: 'Utica',
		country: 'USA'
	}
}).then(() => {
	console.log('data is saved');
}).catch((e) => {
	console.log('error: ', e);
}); */


//database.ref().set('This is my data');

//database.ref('age').set(27);

//database.ref('location/city').set('San Franscisco');

/*
database.ref('attributes').set({
	height: 70,
	weight: 159
}).then(() => {
	console.log('second data is saved');
}).catch((e) => {
	console.log('error: ', e);
});
*/

/*
database.ref().update({
	job: 'Manager',		
	age: 29,
	'location/city': 'San Franscisco'
});
*/

/*
database.ref().update({
	name: 'Mike',
	age: 29,
	job: 'Software Developer',	//can add new property
	isSingle: null				//can delete
}).then(() => {
	console.log('data is updated');
}).catch((e) => {
	console.log('data not updated: ', e);
});
*/

/*
database.ref().update({
	stressLevel: 9,
	'job/company': 'Google',
	'location/city': 'San Franscisco'
}).then(() => {
	console.log('data is updated');
}).catch((e) => {
	console.log('data not updated: ',e);
})
*/

//database.ref().remove(); //removes everything

/*
database.ref('isSingle').remove()
	.then(() => {
		console.log('data is removed');
	})
	.catch((e) => {
		console.log('did not remove data: ', e);
	});
	*/
	
//database.ref('isSingle').set(null);	//also removes

/*
database.ref()	//can keep 'location' or 'location/city' ... inside to get more specific data
	.once('value')
	.then((snapshot) => {
		const val = snapshot.val();
		console.log(val);
	})
	.catch((e) => {
		console.log('error fetching data', e);
	});
*/


//this subscription runs everytime data changes	
/*
database.ref().on('value', (snapshot) => {
	console.log(snapshot.val());
});
*/

//alternate syntax
/*
const onValueChange = (snapshot) => {
	console.log(snapshot.val());
};
database.ref().on('value', onValueChange);	
*/

/*
//another alternate
const onValueChange = database.ref().on('value', (snapshot) => {
	console.log(snapshot.val());
}, (e) => {
	console.log('error with data fetching', e);
});
	
setTimeout(() => {
	database.ref('stressLevel').set(5);
}, 3500);

setTimeout(() => {
	//database.ref().off();	//cancels all subscriptions
	//alternate syntax
	database.ref().off('value', onValueChange);	//unsubscribes only onValueChange
}, 7000);

setTimeout(() => {
	database.ref('stressLevel').set(5.1);
}, 10500);
*/

const onValueChange = database.ref().on('value', (snapshot) => {
	const val = snapshot.val();
	console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
}, (e) => {
	console.log('error fetching data', e);
});