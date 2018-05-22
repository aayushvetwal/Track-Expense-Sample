const add= (a,b) => a + b;
const generateGreeting = (name='Anonymous') => `Hello ${name}!`;

test('should add two numbers', () => {
	const result = add(3,4);
	
	expect(result).toBe(7);
	/*if(result !== 7){
		throw new Error(`You added 4 & 3. The result was ${result}. Expected 7`);
	}*/
});

test('should generate valid greeting', () => {
	const greeting = generateGreeting('Aayush');
	expect(greeting).toBe('Hello Aayush!');
});

test('should generate greeting for no name', () => {
	const greeting = generateGreeting();
	expect(greeting).toBe('Hello Anonymous!');
});