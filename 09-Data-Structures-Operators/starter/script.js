'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const openingHours = {
    thu: {
        open: 12,
        close: 22,
    },
    fri: {
        open: 11,
        close: 23,
    },
    sat: {
        open: 0, // Open 24 hours
        close: 24,
    },
};

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    // ES6 enhanced object literals
    // We don't have to use the function keyword
    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    // ES6 enhanced object literals
    openingHours,

    // when we have lots of arguments to be passed into the function, we could use the following method, join the arguments into a object, and then when we call the function, the order of the arguments in calling DON'T have to be the same as in the declaration.
    orderDelivery({
        starterIndex = 2,
        mainIndex = 2,
        address,
        time = '18:00',
    }) {
        console.log(
            `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
        );
    },

    orderPasta(ingre1, ingre2, ingre3) {
        console.log(
            `Here is your pasta with ${ingre1}, ${ingre2} and ${ingre3}!`
        );
    },
};

////////////////////////////////Strings///////////////////////////////
// const announcement =
//     'All passengers come to boarding door 23. Boarding door 23!';
// // console.log(announcement.replaceAll('door', 'gate'));
// console.log(announcement.replace(/door/g, 'gate'));

// function capitalizeName(name) {
//     const names = name.split(' ');
//     const namesUpperCase = [];

//     for (const w of names) {
//         // Two methods to change the first letter of each word into Capitalized
//         // namesUpperCase.push(w[0].toUpperCase() + w.slice(1));
//         namesUpperCase.push(w.replace(w[0], w[0].toUpperCase()));
//     }

//     console.log(namesUpperCase.join(' '));
// }

// capitalizeName('qianwei yin');
// capitalizeName('jessica ann smith davis');

// function maskCreditCard(number) {
//     const str = number + '';
//     const lastFour = str.slice(-4);
//     console.log(lastFour.padStart(str.length, '*'));
// }

// maskCreditCard(3293369927937290);
// maskCreditCard('6492629');
// maskCreditCard(84030283932);

////////////////////////////////Maps//////////////////////////////////
// // In maps, the key can be any data type
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// // set() method also returns the updated map.
// console.log(rest.set(2, 'Lisbon, Portugal'));
// // So we can also do like this:
// rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//     .set('open', 11)
//     .set('close', 23)
//     .set(true, 'We are open.')
//     .set(false, 'We are closed.');

// console.log(rest.get('name'));
// console.log(rest.get(1));

// const time = 21;
// console.log(rest.get(time >= rest.get('open') && time <= rest.get('close')));

// console.log(rest.has('categories'));
// rest.delete(2);
// console.log(rest);
// console.log(rest.size);
// // rest.clear();
// // console.log(rest.size);

// // The key can also be an array
// rest.set([1, 2], 'test');
// console.log(rest);
// // However, we cannot get the value. Because the [1,2] we set in is different from the [1,2] below.
// console.log(rest.get([1, 2]));

// // Therefore, we can only do this:
// const arr = [2, 3];
// rest.set(arr, 'test2');
// console.log(rest.get(arr));

// // Amazingly, we can do this:
// rest.set(document.querySelector('h1'), 'Heading');
// console.log(rest);

// // iteration
// const question = new Map([
//     ['question', 'What is the best programming language in the world?'],
//     [1, 'C'],
//     [2, 'Java'],
//     [3, 'JavaScript'],
//     ['correct', 3],
//     [true, 'Correct'],
//     [false, 'Try again'],
// ]);
// console.log(question);

// // convert object to map
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// console.log(question.get('question'));
// for (const [key, value] of question) {
//     if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }
// const answer = Number(prompt('Your answer'));
// console.log(question.get(answer === question.get('correct')));

// // convert map to array
// console.log([...question]);
// console.log([...question.entries()]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

////////////////////////////////Sets//////////////////////////////////
// const ordersSet = new Set([
//     'pasta',
//     'pizza',
//     'pizza',
//     'risotto',
//     'pizza',
//     'pasta',
// ]);
// console.log(ordersSet);

// // counting different letters
// const lettersSet = new Set('qianwei');
// console.log(lettersSet);

// console.log(ordersSet.size);
// console.log(ordersSet.has('pizza'));
// console.log(ordersSet.has('bread'));
// ordersSet.add('Garlic Bread');
// ordersSet.delete('pizza');
// // ordersSet.clear(); // delete all the values in a set

// // p.s. No index in a set, so we can only use for-of to get all the data
// for (const order of ordersSet) console.log(order);

// // However, the values in a set are in a {}, so if we want them in an array?
// const ordersSetArray = [...ordersSet];
// console.log(ordersSetArray);

////////////////////////////Looping Objects///////////////////////////
// // Property Name
// const propertyName = Object.keys(openingHours); // return an array
// console.log(propertyName);
// let openStr = `We are open on ${propertyName.length} days: `;
// for (const day of propertyName) {
//     openStr += `${day}, `;
// }
// console.log(openStr);

// // Property Values
// const propertyValues = Object.values(openingHours);
// console.log(propertyValues);

// // The entire object
// const entireProperty = Object.entries(openingHours);
// console.log(entireProperty);
// for (const [day, { open, close }] of entireProperty) {
//     console.log(`On ${day}, we open at ${open} and close at ${close}.`);
// }

/////////////////////////Optional Chaining(?.)////////////////////////
// // In real world, we could not know whether there is a variable in an object, so if we want to deep down into the object, it may return error. ⬇️
// // See? Because the 'mon' does not exist
// // console.log(restaurant.openingHours.mon.open); // Error
// // However, if we use ?. then it will return undefined when there is no such variable in the chain.
// console.log(restaurant.openingHours?.mon?.open); // Undefined
// console.log(restaurant.openingHours?.sat?.close); // 24

// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (const day of weekdays) {
//     const open = restaurant.openingHours[day]?.open ?? 'closed';
//     console.log(`On ${day}, we open at ${open}.`);
// }

// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// // Arrays, to check if an array is empty
// const users = [{ name: 'qianwei', emial: 'qianwei@io.com' }];
// console.log(users[0]?.name ?? 'empty');
// console.log(users[1]?.name ?? 'empty');

//////////////////////////////FOR-OF Loop/////////////////////////////
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// for (const x of menu) {
//     console.log(x);
// }

// for (const item of menu.entries()) {
//     console.log(item);
// }

// for (const [i, el] of menu.entries()) {
//     console.log(`${i + 1}: ${el}`);
// }

////////////////////OR|NC|AND Assignment Operator/////////////////////
// const rest = {
//     name: 'Capri',
// };
// // The following two statements are equivalent
// rest.guestNum = rest.guestNum || 10;
// rest.guestNum ||= 10;

// console.log(rest.guestNum);

// And also, we have ??=, &&=

////////////////////////Nullish Coalescing Operator///////////////////
// restaurant.numGuests = 0;
// const guestNum = restaurant.numGuests || 10;
// // However, when there IS numGuests in restaurant and the value happens to be 0, then the below statement will return an unexpected result.
// console.log(guestNum); // 10

// // Therefore, we could use the Nullish Coalescing Operator - - ??
// // Principle: ?? works with nullish value but falsy values
// // Nullish: null, undefined
// // which means 0 and '' will be true in ??
// const guestNumCorrect = restaurant.numGuests ?? 10;
// console.log(guestNumCorrect);

////////////////////////////////AND   OR//////////////////////////////
// // use ANY data type, return ANY data type
// // short-circuiting
// // ⬇️ if there is numGuests variable in restaurant, the  return it, else set the default value as 10
// const guestNum = restaurant.numGuests || 10;
// console.log(guestNum);
// // ⬆️ as we can see, this is much easier than if-else statement or ternary

// console.log(0 && 'qianwei'); // 0
// console.log(7 && 'qianwei'); // qianwei

//////////////////////////////Rest operator///////////////////////////
// // SPREAD, because on RIGHT side of =
// const arr = [1, 2, ...[3, 4]];

// // REST, because on LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
//     ...restaurant.mainMenu,
//     ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// // However, rest operators must be the last element. ⬇️ This is error.
// // const [pizza, , risotto, ...otherFood, salad] = [
// //     ...restaurant.mainMenu,
// //     ...restaurant.starterMenu,
// // ];

// // objects
// // Remember? We don't have to keep the order because IT'S objects.
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// function add(...numbers) {
//     let sum = 0;
//     for (let i = 0; i < numbers.length; i++) {
//         sum += numbers[i];
//     }
//     console.log(sum);
// }
// add(1, 2);
// add(2, 4, 6, 3, 2, 2);
// // ⬇️ Obviously, we cannot write 10 arguments in the declaration of function
// add(5, 5, 6, 3, 8, 9, 3, 45, 6, 7);

// const x = [1, 4, 7];
// add(...x);

/////////////////////////////Spread operator//////////////////////////
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);
// const goodNewArr = [1, 2, ...arr];
// console.log(goodNewArr);

// console.log(...goodNewArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // copy array (shallow-copy)
// const mainMenuCopy = [...restaurant.mainMenu];
// // copy 2 arrays
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// // Iterable: arrays, strings, maps, sets. NOT objects
// const str = 'qianwei';
// const letters = [...str, ' ', 'Y.'];
// console.log(letters);

// // Real-world example
// const ingredients = [
//     // prompt("Let's make pasta! Ingredient1?"),
//     // prompt('Ingredient2?'),
//     // prompt('Ingredient3?'),
// ];
// restaurant.orderPasta(...ingredients);

// // objects
// const newRestaurant = { foundedIn: 2001, ...restaurant, founder: 'qianwei' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ris';
// console.log(restaurant.name);
// console.log(restaurantCopy.name);

//////////////////////////////////////////////////////////////////////
////////////////////////Destructuring objects/////////////////////////
// restaurant.orderDelivery({
//     address: '3501 NE 146 PI',
//     time: '12:00',
//     starterIndex: 1,
//     mainIndex: 0,
// });

// restaurant.orderDelivery({
//     address: '3501 NE 146 PI',
//     mainIndex: 0,
// });

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// const {
//     name: restaurantName,
//     openingHours: hours,
//     categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// // We usually have to get data from other places, so we could not know what the data looks like, and the following codes are a good example to show how could we get defined variable from an object. Setting the default value.
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj); // must have the brackets outside, otherwise will be an error
// console.log(a, b);

// // nested objects
// const {
//     fri: { open: o = -1, close: c = -1 },
// } = restaurant.openingHours;
// console.log(o, c);

//////////////////////////////////////////////////////////////////////
////////////////////////Destructuring arrays//////////////////////////
// const [a, b, c] = restaurant.mainMenu;
// console.log(a, b, c);

// let [first, , third] = restaurant.categories;
// console.log(first, third);

// [first, third] = [third, first];
// console.log(first, third);

// // receive 2 return values from a function
// const [starterCourse, mainCourse] = restaurant.order(0, 2);
// console.log(starterCourse, mainCourse);

// // nested arrays
// const nested = [2, 3, [4, 5]];
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // default values
// let [p, q, r] = [8, 9];
// console.log(p, q, r);
// let [x = 1, y = 1, z = 1] = [8, 9];
// console.log(x, y, z);
