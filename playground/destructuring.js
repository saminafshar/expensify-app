console.log('destructuring');

const Person = {
    age: 27,
    location: {
        city: 'Hamburg',
        temperature: 10,
    }
}

const {name : firstName = 'Samy', age} = Person;
const {city, temperature} = Person.location;
if(firstName && age) {
    console.log(`${firstName} is ${age} years old`);
}
console.log (`It's ${temperature} degree in ${city}`)

const book = {
    author: 'Samy',
    publisher: {
        name: 'Penguin'
    }
}

const {name: publisherName} = book.publisher;

console.log(publisherName);


const adress = ['Eiffestr', 'Hamburg', 'Hamburg', 20537];

const [, , state, ] = adress;
console.log("You are in " + state); 

const item = ['Coffee(hot)', 2, 3, 4 ];
const [name, smallPrice, mediumPrice, largePrize] = item;
console.log('The price for a small ' + name +'is ' +smallPrice );