/*
	Object Destructuring
*/
const person = {
	name: 'Aayush',
	age: 26,
	location: {
		city: 'Utica',
		temp: 72
	}
};

const {name, age} = person;

console.log(`${name} is ${age}`);

const {city, temp:temperature} = person.location;
if(temperature && city){
	console.log(`It is ${temperature} in ${city}`);
}

const person2 = {
	old: 27,
};

const {title = 'Anonymous', old} = person2;

console.log(`${title} is ${old}`);

const book = {
	title: 'Harry Potter',
	author: 'J.K.Rowling',
	publisher:{
		//name: 'Cambridge'
	}
};

const {name: publisherName = 'self-published'} = book.publisher;

console.log(publisherName);

/*
	Array Destructuring
*/

const address = ['1299 S Juniper St', 'Philadelphia', 'Pennsylvaia', '19147'];
const [street, , state, zip, country='USA'] = address;
console.log(`You are in ${street}, ${state}, ${country}`);

const item = ['Coffee(hot)', '$2.00', '$2.50', '$2.75'];
const [beverage, ,medium, ] = item;
console.log(`A medium ${beverage} costs ${medium}`);