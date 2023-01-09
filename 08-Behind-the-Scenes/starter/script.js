'use strict';

// Copy objects
const jessica = {
    name: 'Davis',
    age: 21,
    family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica);
jessicaCopy.name = 'Williams';

jessicaCopy.family.push('Conway');

console.log(jessica.name); // Davis
console.log(jessicaCopy.name); // Williams
console.log(jessica.family); // ['Alice', 'Bob', 'Conway']
console.log(jessicaCopy.family); // ['Alice', 'Bob', 'Conway']
