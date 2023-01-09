// Values and Variables
/*
let country = 'China';
let continent = 'Asia';
let population = 1400;

console.log(country);
console.log(continent);
console.log(population);
*/


// Data Types
/*
let isIsland = false;
let language;

console.log(typeof country);
console.log(typeof continent);
console.log(typeof population);
console.log(typeof isIsland);
*/

// Coding Challenge #1
/*
const markWeight = 78;
const markHeight = 1.69;
const johnWeight = 92;
const johnHeight = 1.95;

const markBMI = markWeight / markHeight ** 2;
const johnBMI = johnWeight / johnHeight ** 2;

const markHigherBMI = markBMI > johnBMI;

console.log(markHigherBMI);
*/


// Coding Challenge #2
/*
const markWeight = 78;
const markHeight = 1.69;
const johnWeight = 92;
const johnHeight = 1.95;

const markBMI = markWeight / markHeight ** 2;
const johnBMI = johnWeight / johnHeight ** 2;

if (markBMI > johnBMI) {
    console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI})!`);
} else {
    console.log(`John's (${johnBMI}) BMI is higher than Mark's (${markBMI})!`);
}
*/


// switch
/*
switch (day) {
    case "monday":
        statement;
        break;
    case "tuesday":
        statement;
        break;
    case "wednesday":
    case "thursday":
        statement;
        break;
    default:
        statement;
        break;
}
*/

// Coding Challenge #3
const bill = 430;
const tip = bill >= 50 && bill <= 300? bill * 0.15 : bill * 0.2;

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value was ${bill + tip}`);




