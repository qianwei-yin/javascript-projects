/*
'use strict';

// Function Declaration
function calcAge1(birthYear) {
    return 2022 - birthYear;
}
const age1 = calcAge1(2001);


// Function expression
const calcAge2 = function(birthYear) {
    return 2022 - birthYear;
}
const age2 = calcAge2(2001);


// Arrow Function
const calcAge3 = birthYear => 2022 - birthYear;
const age3 = calcAge3(2001);

console.log(age1, age2, age3);

const yearsUntilRetirement = birthYear => {
    const age = 2022 - birthYear;
    const retirement = 65 - age;
    return retirement;
}

console.log(yearsUntilRetirement(2001));
*/

// Coding Challenge #1
/*
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const avgDolphins = calcAverage(44, 23, 71);
const avgKoalas = calcAverage(65, 200, 49);

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= avgKoalas * 2) console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
    else if (avgKoalas >= avgDolphins * 2) console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
    else console.log(`No one wins (${avgKoalas} vs. ${avgDolphins})`);
}

checkWinner(avgDolphins, avgKoalas);
*/


// Coding Challenge #2
/*
function calcTip(bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(tips, total);
*/


// Object
/*
const qianwei = {
    firstName: 'Qianwei',
    lastName: 'Yin',
    birthYear: 2001,
    driversLicense: false,
    job: 'student',
    
    calcAge: function() {
        this.age = 2022 - this.birthYear; // 将计算的结果存储到object中
        return this.age;
    },

    getSummary: function() {
        return `${this.firstName} is a ${this.age}-year-old ${this.job}, he has ${this.driversLicense?'a':'no'} drivers license.`;
    }
};
console.log(qianwei.calcAge());
console.log(qianwei.age);

console.log(qianwei.getSummary());
*/


// Coading Challenge #3
/*
const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,

    calcBMI: function() {
        this.BMI = this.mass / this.height ** 2;
        return this.BMI;
    }
};

const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,

    calcBMI: function() {
        this.BMI = this.mass / this.height ** 2;
        return this.BMI;
    }
};

mark.calcBMI();
john.calcBMI();

if (mark.BMI > john.BMI) {
    console.log(`Mark's BMI (${mark.BMI}) is higher than John's (${john.BMI})!`);
} else {
    console.log(`John's BMI (${john.BMI}) is higher than Mark's (${mark.BMI})!`);
}
*/


// Coding Challenge #4
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

function calcTip(bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
    totals.push(tips[i] + bills[i]);
}

function calcAverage (totalArray) {
    let Sum = 0;
    for (let i = 0; i < totalArray.length; i++) {
        Sum += totalArray[i];
    }
    return Sum / totalArray.length;
}
console.log(tips);
console.log(totals);
console.log(calcAverage(totals));