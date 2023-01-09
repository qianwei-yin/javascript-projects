'use strict';

////////////////////////////128 Default Parameters////////////////////
// const bookings = [];
// const createBooking = function (
//     flightNum,
//     numPassengers = 1, // default value
//     price = 100 * numPassengers
// ) {
//     const booking = {
//         flightNum,
//         numPassengers,
//         price,
//     };
//     console.log(booking);
//     bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 30, 4998);
// // ⬇️ cannot miss the second argument
// createBooking('LH123', undefined, 300);
// // ⬇️ The price will automatically be 100 * 30
// createBooking('LH123', 30);

////////////////////////////129 Passing arguments/////////////////////
// const flight = 'LH123';
// const person = {
//     name: 'qianwei',
//     passport: 737293628,
// };

// const checkIn = function (flightNum, passenger) {
//     flightNum = 'LH999';
//     passenger.name = 'Mr. ' + passenger.name;
// };

// checkIn(flight, person);

// /*
// The flight number did not change, but the name was changed.
// Because when copying primitive values, the copy is exactly an new variable with the same value.
// However, when copying reference values (like objects, arrays...), the copy has the same value (but the value is the address of the object in heap), so if you change the info in object in a function, the it will truly be change!
// */
// console.log(flight, person);

/////////////131 Functions accepting callback functions///////////////
// // The callback function
// const firstUpperCase = function (str) {
//     const [first, ...other] = str.split(' ');
//     return [first.toUpperCase(), ...other].join(' ');
// };

// // The higher-order function
// const transform = function (str, func) {
//     console.log(`The original string: ${str}`);
//     console.log(`The transformed string: ${func(str)}`);
//     console.log(`By using the ${func.name} function`);
// };

// transform('JavaScript is the best programming language!', firstUpperCase);

// // The callback function
// const high5 = function () {
//     console.log('yeah!');
// };
// // The higher-order function
// document.body.addEventListener('click', high5);

//////////////////132 Functions returning functions///////////////////
// // Arrow version
// const greetArr = (greeting) => (Name) => console.log(`${greeting} ${Name}`);
// greetArr('Hey!')('qianwei');

// // regular version
// function greet(greeting) {
//     return function (name) {
//         console.log(`${greeting} ${name}`);
//     };
// }
// greet('Hello!')('qianwei');

////////////133&134 The call, apply and bind methods//////////////////
// const lufthansa = {
//     airline: 'Lufthansa',
//     iataCode: 'LH',
//     bookings: [],

//     book(flightNum, name) {
//         console.log(
//             `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//         );
//         this.bookings.push({
//             flight: `${this.iataCode}${flightNum}`,
//             name,
//         });
//     },
// };
// lufthansa.book(239, 'qianwei yin');
// lufthansa.book(396, 'jonas schmedtmann');

// const eurowings = {
//     airline: 'Eurowings',
//     iataCode: 'EW',
//     bookings: [],
// };
// const book = lufthansa.book;

// // The first parameter is to determine that the 'this' keyword should point to eurowings
// book.call(eurowings, 12, 'jiaying liu');
// book.call(lufthansa, 1282, 'jiaying liu');
// book.apply(eurowings, [28, 'jonas cooper']);

// // bind methods
// const bookEW = book.bind(eurowings);
// bookEW(76, 'steven cook');

// const bookEW49 = book.bind(eurowings, 49);
// bookEW49('martha yin');

// // bind with event listeners
// lufthansa.planes = 200;
// lufthansa.buyPlane = function () {
//     this.planes++;
//     console.log(this.planes);
// };

// // ⬇️ print NaN
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// // Because the 'this' keyword in lufthansa.buyPlane is attached to document.querySelector('.buy'), which is the button.

// // So, we should doing like this...
// document
//     .querySelector('.buy')
//     .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// // Partial application
// const addTax = (rate, bill) => bill + bill * rate;
// console.log(addTax(0.2, 100));

// // If we know that the tax rate in WA is 0.3, then...
// // the reason why the first argument is null is, we don't have 'this' keyword in the addTax function, so there is no need to bind 'this' to addTax itself. But we can write null also, and no unexpected error will occur.
// const taxWA = addTax.bind(null, 0.3);
// console.log(taxWA(300));

// // So partial application means we determine some parameters value in advance. And notice that this is not the same as setting default values. Because partial application creates a brand NEW function.

// // Rewrite the partial application using functions returning another function.
// // const taxCA = (rate) => (bill) => bill + bill * rate;
// function taxCA(rate) {
//     return function (bill) {
//         return bill + bill * rate;
//     };
// }

// console.log(taxCA(0.35)(100));

//////////136 Immediately Invoked Function Expressions (IIFE)/////////
// // In modern day web applications, almost every web page has js included from different sources and scripts. Therefore, there can be situations that some variables names are used in different places.
// // IIFE can reduce the global variable namespace pollution and improves performance. Since we do NOT give a name to that function, we only use it once, so we can also call it Self-Executing Anonymous Function.

// // This is not a rule in js, but a method that many programmers use.
// (function () {
//     console.log('This will never run again');
// })();

// (() => console.log('This will also never run again'))();

////////////////////////////137 Closures//////////////////////////////
// const secureBooking = function () {
//     let passengerCount = 0;

//     return function () {
//         passengerCount++;
//         console.log(`${passengerCount} passengers`);
//     };
// };

// const booker = secureBooking();
// // Now, 'booker' is a function

// booker(); // 1 passengers
// booker(); // 2 passengers
// booker(); // 3 passengers
// // And the result is different from what we thought. 'secureBooking' is over, so the passengerCount must have gone. But the 'book' still can access and manipulate it!

// // Thanks to closures, book (child function) preserves the scope chain to its parent function (secureBooking) throughout the time.

// console.dir(booker);
// /* There is something in the console...
// [[Scopes]]: Scopes[3]
// 0: Closure (secureBooking) {passengerCount: 3}
// */

// // Example #1
// let f;

// function g() {
//     const a = 2;
//     f = () => console.log(a * 2);
// }

// function h() {
//     const b = 100;
//     f = () => console.log(b * 2);
// }

// g();
// f();
// console.dir(f);
// /*
// [[Scopes]]: Scopes[3]
// 0: Closure (g) {a: 2}
// */

// // Re-assigning f function
// h();
// f();
// console.dir(f);
// /*
// [[Scopes]]: Scopes[3]
// 0: Closure (h) {b: 100}
// */

// // Example #2
// const boardPassengers = function (n, wait) {
//     const perGroup = n / 3;

//     // after 'wait' seconds, the function will be executed
//     setTimeout(function () {
//         console.log(`We are now boarding all ${n} passengers`);
//         console.log(`There are 3 groups, each with ${perGroup} passengers`);
//     }, wait * 1000);

//     // however, before the function above be executed, the following will be executed. Which means that the 'boardPassengers' is finished when the function above is being executed. But it can still access the 'boardPassengers' arguments.
//     console.log(`Will start boarding in ${wait} seconds...`);
// };

// const perGroup = 1000;
// boardPassengers(30, 3); //There are 3 groups, each with 10 passengers
// // So we can see that closure has priority over scope chain. The result is 10 but not 1000.
