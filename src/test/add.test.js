const add = (a,b) => a+b;
const generateGreeting = (name) => `Hello ${name}`;

test('should return a greeting', () => {
    const result = generateGreeting('Mike');
    expect(result).toBe('Hello Mike');
})

test ('should add two numbers', () => {
    const result = add(3,4);

    expect(result).toBe(7);
})