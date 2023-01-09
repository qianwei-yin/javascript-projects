'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////////////////////////////
///////////////////////////////////////
function createUsernames(accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map((word) => word[0])
            .join('');
    });
}
createUsernames(accounts);

function displayMovements(movements, sort = false) {
    containerMovements.innerHTML = '';

    // we do not want to change the original movements, so we use the .slice()
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}
            </div>
            <div class="movements__date">3 days ago</div>
            <div class="movements__value">${mov}€</div>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}

function calcPrintBalance(acc) {
    acc.balance = acc.movements.reduce((accu, move) => accu + move, 0);
    labelBalance.textContent = `${acc.balance}€`;
}

function calcDisplaySummary(acc) {
    labelSumIn.textContent = `${acc.movements
        .filter((mov) => mov > 0)
        .reduce((accu, mov) => accu + mov, 0)}€`;
    labelSumOut.textContent = `${Math.abs(
        acc.movements
            .filter((mov) => mov < 0)
            .reduce((accu, mov) => accu + mov, 0)
    )}€`;
    labelSumInterest.textContent = `${acc.movements
        .filter((mov) => mov > 0)
        .map((mov) => (mov * acc.interestRate) / 100)
        .filter((int) => int >= 1) // when a movement's interest >= 1 then bank pay for it.
        .reduce((accu, int) => accu + int, 0)}€`;
}

function updateUI(acc) {
    // Display the movements
    displayMovements(acc.movements);

    // Display the balance
    calcPrintBalance(acc);

    // Display the summary
    calcDisplaySummary(acc);
}

// Event handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
    // Because the button is in a html form, so when we click this kind of button, the page will reload automatically, we have to avoid this happening.
    e.preventDefault();

    // Check if the username and PIN is in our data
    currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );

    // If right, Display all the stuff
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and welcome message
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(' ')[0]
        }`;

        // set the opacity to 100
        containerApp.style.opacity = 100;

        // Clear input fields and blur the cursor
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        // update UI
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const reveiverAccount = accounts.find(
        (acc) => inputTransferTo.value === acc.username
    );
    const amount = Number(inputTransferAmount.value);

    if (
        amount > 0 &&
        reveiverAccount &&
        amount <= currentAccount.balance &&
        reveiverAccount.username !== currentAccount.username
    ) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        reveiverAccount.movements.push(amount);

        // update UI
        updateUI(currentAccount);
    }

    inputTransferAmount.value = inputTransferTo.value = '';
});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        // add movements
        currentAccount.movements.push(amount);

        // update UI
        updateUI(currentAccount);
    }

    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    // check correct credentials
    if (
        inputCloseUsername.value === currentAccount.username &&
        inputClosePin.value == currentAccount.pin
    ) {
        // Find the closing account index in the accounts array
        const index = accounts.findIndex(
            (acc) => acc.username === inputCloseUsername.value
        );

        // delete the account
        accounts.splice(index, 1);

        // hide UI
        containerApp.style.opacity = 0;

        // alter the welcome message
        labelWelcome.textContent = 'Log in to get started';
    }

    // no matter if the username and pin are correct, we should clean the input fields.
    inputClosePin.value = inputCloseUsername.value = '';
    inputClosePin.blur();
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// /////////////////////////////////////////////////
// let arr = [1, 2, 3, 4, 5, 6];

// // SLICE
// console.log(arr.slice());
// console.log([...arr]);
// // ⬆️ These two are the shallow copy

// // SPLICE
// console.log(arr.splice(-1));
// console.log(arr);
// // Actually change the original array
// arr.splice(1, 2); // The second parameter is deleteCount
// console.log(arr);

// // REVERSE
// arr = [1, 2, 3, 4, 5, 6];
// console.log(arr.reverse());
// console.log(arr);
// // Actually mutate the original array

// // CONCAT
// const arr2 = ['a', 'b', 'c'];
// const letters = arr.concat(arr2);
// console.log(letters);

// // JOIN
// console.log(letters.join(' - '));

// // AT
// arr = [1, 2, 3, 4, 5, 6];
// console.log(arr.at(0));
// console.log(arr.at(-1));
// //console.log(arr[-1]); // undefined. The brackets cannot use -1
// // ⬇️ also applicable to strings
// const str = 'jonas';
// console.log(str.at(2));

// // FOREACH
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // The forEach method is a higher-order function, in every loop, it will call an anonymous function
// // The passed-in parameters contains 3 parts: element, index and the whole array. The name of each is not crucial, but the order matters.
// movements.forEach(function (movement, i, arr) {
//     movement > 0
//         ? console.log(`Movement ${i + 1}: You deposited ${movement}`)
//         : console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//     console.log(arr);
// });
// // However, you cannot use continue/break to jump out of forEach

// // FOREACH with Maps and Sets
// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach(function (value, key, map) {
//     console.log(`${key}: ${value}`);
// });

// const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'Pound', 'USD', 'EUR']);
// console.log(currenciesUnique);
// // In a set, we have no key concepts, because the order is not important in a set. But in order not to confuse users, we still reserve the key parameter.
// currenciesUnique.forEach(function (value, key, set) {
//     console.log(`${key}: ${value}`);
// });

// MAP method
// // The same as forEach, but MAP return a brand new array after some manipulations. MAP can also access 3 parameters: elements, indexes and the whole array.
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//     return mov * eurToUsd;
// });
// const movementsUsdArrow = movements.map((mov) => mov * eurToUsd);
// console.log(movements);
// console.log(movementsUSD);
// console.log(movementsUsdArrow);

// FILTER method
// // Put those elements meet the requirements into a new array
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const withdrawals = movements.filter((mov) => mov < 0);
// console.log(withdrawals);

// REDUCE method
// // Boil down an array into ONE single element
// // REDUCE accesses FOUR parameters: accumulators, elements, indexes and the whole array. And the accumulators is like a snowball, it continues to add some manipulations on itself.
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const balance = movements.reduce((accu, val) => accu + val, 0);
// console.log(balance);

// const max = movements.reduce(
//     (max, val) => (max > val ? max : val),
//     movements[0]
// );
// console.log(max);

// FIND method
// // The same as filter, but only returns the first element that meet the requirement
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.find((mov) => mov < 0));

// SOME method
// // the same as .includes(), but SOME can be used to check conditions, includes can only check if the value is in the array.
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.some((mov) => mov > 0));

// EVERY method
// const movements = [430, 1000, 700, 50, 90];
// console.log(movements.every((mov) => mov > 0));

// FLAT method
// const arr = [[1, 2, 3], [4, 5], 6, 7, [8, 9]];
// console.log(arr.flat());
// const arrDeeper = [[1, 2, [3, 4], 5], 6, [7, [8, 9]]];
// console.log(arrDeeper.flat());
// // ⬆️ now the flat method is not going to work, because the it can only flat (verb.) one-level nested arrays. So we can do this...
// console.log(arrDeeper.flat(2));
// // ⬆️ the parameter represents the levels we want to flat (verb.)

// // Now we want to calculate the bank balance after four people's movements.
// const accsMovements = accounts.map((acc) => acc.movements);
// const allMovements = accsMovements.flat();
// const overallBalance = allMovements.reduce((accu, mov) => accu + mov, 0);
// console.log(overallBalance);

// FLATMAP method
// // as we can see, doing MAP and then FLAT is a quite common manipulation, so we have FLATMAP method.
// const allMovements = accounts.flatMap((acc) => acc.movements);
// const overallBalance = allMovements.reduce((accu, mov) => accu + mov, 0);
// console.log(overallBalance);
// // However, flatMap can only flat ONE-level nested arrays.

// SORT method
// const names = ['jonas', 'qianwei', 'zach', 'bobby'];
// console.log(names.sort()); // correctly sorted
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.sort()); // incorrectly sorted
// // ⬆️ because sort method take the numbers as strings

// // in order to solve the number sort, we have to...
// // return sth. < 0, keep order A->B
// // return sth. > 0, switch order B->A

// // Ascending
// movements.sort((a, b) => a - b);
// console.log(movements);

// // Descending
// movements.sort((a, b) => b - a);
// console.log(movements);

// NEW ARRAY method
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(arr);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// FILL method + empty array
// const x = new Array(7);
// console.log(x);
// // we cannot use map method on an empty array, but we can use FILL to assign
// x.fill(1);
// console.log(x);
// // ⬇️ let the index (2,3,4) be 3.
// x.fill(3, 2, 5);
// console.log(x);

// ARRAY.FROM
// // The second parameter is a callback function that is exactly the same as in the MAP method.
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// const diceArr = Array.from(
//     { length: 100 },
//     () => Math.trunc(Math.random() * 6) + 1
// );
// console.log(diceArr);
// console.log(diceArr.every((dice) => dice >= 1 && dice <= 6));

// BONUS: use REDUCE to calculate the deposits and withdrawals at the same time
// // #1: The accumulator is an object
// const { deposits, withdrawals } = accounts
//     .flatMap((acc) => acc.movements)
//     .reduce(
//         (sums, cur) => {
//             sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//             return sums;
//         },
//         { deposits: 0, withdrawals: 0 }
//     );
// console.log(deposits, withdrawals);

// // #2: The accumulator is an array
// const summary2 = accounts
//     .flatMap((acc) => acc.movements)
//     .reduce(
//         (sums, cur) => {
//             cur > 0 ? (sums[0] += cur) : (sums[1] += cur);
//             return sums;
//         },
//         [0, 0]
//     );
// console.log(summary2);
