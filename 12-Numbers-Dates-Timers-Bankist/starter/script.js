'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2022-07-29T23:36:17.929Z',
        '2022-07-30T10:51:36.790Z',
    ],
    currency: 'CNY',
    locale: 'zh',
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2022-07-29T18:49:59.371Z',
        '2022-08-02T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
    // http://www.lingoes.net/en/translator/langcode.htm
    // ISO language code table
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
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

function formatDate(date, locale, type = 'mov') {
    function calcDaysPassed() {
        return Math.floor(Math.abs(new Date() - date) / (1000 * 60 * 60 * 24));
    }

    const optionsLabelDate = {
        day: '2-digit',
        month: '2-digit', // 'long', 'numeric'
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    if (type === 'labelDate')
        return new Intl.DateTimeFormat(locale, optionsLabelDate).format(date);

    const daysPassed = calcDaysPassed();

    if (daysPassed === 0) return 'today';
    else if (daysPassed === 1) return 'yesterday';
    else if (daysPassed <= 7) return `${daysPassed} days ago`;
    else {
        return new Intl.DateTimeFormat(locale).format(date);
        // ⬆️ if just year/month.date, then the option is unnecessary
    }
}

function formatCurrency(num, locale, currency) {
    const options = {
        style: 'currency',
        currency: currency,
    };
    return new Intl.NumberFormat(locale, options).format(num);
}

function displayMovements(acc, sort = false) {
    containerMovements.innerHTML = '';

    // we do not want to change the original movements, so we use the .slice()
    const movs = sort
        ? acc.movements.slice().sort((a, b) => a - b)
        : acc.movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const displayDate = formatDate(
            new Date(acc.movementsDates[i]),
            acc.locale
        );

        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}
            </div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${formatCurrency(
                mov,
                acc.locale,
                acc.currency
            )}</div>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}

function calcDisplayBalance(acc) {
    acc.balance = acc.movements.reduce((accu, move) => accu + move, 0);
    labelBalance.textContent = formatCurrency(
        acc.balance,
        acc.locale,
        acc.currency
    );
}

function calcDisplaySummary(acc) {
    labelSumIn.textContent = formatCurrency(
        acc.movements
            .filter((mov) => mov > 0)
            .reduce((accu, mov) => accu + mov, 0),
        acc.locale,
        acc.currency
    );
    labelSumOut.textContent = formatCurrency(
        Math.abs(
            acc.movements
                .filter((mov) => mov < 0)
                .reduce((accu, mov) => accu + mov, 0)
        ),
        acc.locale,
        acc.currency
    );
    labelSumInterest.textContent = formatCurrency(
        acc.movements
            .filter((mov) => mov > 0)
            .map((mov) => (mov * acc.interestRate) / 100)
            .filter((int) => int >= 1) // when a movement's interest >= 1 then bank pay for it.
            .reduce((accu, int) => accu + int, 0),
        acc.locale,
        acc.currency
    );
}

function updateUI(acc) {
    // Display the movements
    displayMovements(acc);

    // Display the balance
    calcDisplayBalance(acc);

    // Display the summary
    calcDisplaySummary(acc);
}

function startLogOutTimer() {
    const tick = function () {
        // set the style as mm:ss
        const min = String(Math.trunc(time / 60)).padStart(2, '0');
        const sec = String(time % 60).padStart(2, '0');

        // display
        labelTimer.textContent = `${min}:${sec}`;

        // check if 00:00
        if (time === 0) {
            clearInterval(timer);

            // hide UI
            containerApp.style.opacity = 0;

            // alter the welcome message
            labelWelcome.textContent = 'Log in to get started';
        }

        // decrease the time by 1 seconds
        time--;
    };
    let time = 10;

    tick();
    const timer = setInterval(tick, 1000);

    return timer;
}

// Event handlers
let currentAccount, timer;

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

        // create current date and time
        const now = new Date();
        labelDate.textContent = formatDate(
            now,
            currentAccount.locale,
            'labelDate'
        );

        // Clear input fields and blur the cursor
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        // update UI
        updateUI(currentAccount);

        // timer
        if (timer) clearInterval(timer);
        // ⬆️ if we switch the user during the timer, then we have to clear the timer of the user before.
        timer = startLogOutTimer();
    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const receiverAccount = accounts.find(
        (acc) => inputTransferTo.value === acc.username
    );
    const amount = Number(inputTransferAmount.value);

    if (
        amount > 0 &&
        receiverAccount &&
        amount <= currentAccount.balance &&
        receiverAccount.username !== currentAccount.username
    ) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAccount.movements.push(amount);

        // add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAccount.movementsDates.push(new Date().toISOString());

        // update UI
        updateUI(currentAccount);

        // reset timer
        clearInterval(timer);
        timer = startLogOutTimer();
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

        // add loan date
        currentAccount.movementsDates.push(new Date().toISOString());

        // update UI
        updateUI(currentAccount);

        // reset timer
        clearInterval(timer);
        timer = startLogOutTimer();
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
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;

    // reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
});

/////////////////////////////////////////////////
// Lectures

// // JS cannot be used to do really precise scientific or financial calculations.
// console.log(0.1 + 0.2); //0.30000000000000004

// // Parsing
// // Functions are also kinds of objects, so we can use method on functions (in this case, Number())
// console.log(Number.parseInt('   30px', 10)); // 30, 10 means
// console.log(Number.parseInt('e23', 10)); // NaN, must start with numbers
// console.log(Number.parseFloat('2.5rem')); // 2.5

// // check if value is a number
// console.log(Number.isFinite(20)); // true
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(20 / 0));
// console.log(Number.isFinite(+'20X'));

// // check if value is an integer
// console.log(Number.isInteger(20)); // true
// console.log(Number.isInteger(20.0)); // true
// console.log(Number.isInteger('20'));
// console.log(Number.isInteger(20 / 0));
// console.log(Number.isInteger(+'20X'));

// // max safe integer
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);

// // bigInt
// console.log(638362037368262803003271514632839093n);

// // operations: cannot mix BigInt and general numbers
// // console.log(389273986386193791793627971932n + 1); //Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
// // console.log(Math.sqrt(792796297307296386297397293n)); // Uncaught TypeError: Cannot convert a BigInt value to a number at Math.sqrt

// console.log(20n > 15); // true
// console.log(20n === 20); // false
// console.log(20n == 20); // true
// console.log(728739712992781083013n + ' is really big'); // 728739712992781083013 is really big
// console.log(11n / 3n); // 3n, simply cut off the decimal part

//////////////////////////////////////
//////DATES and TIMES

// // create a date
// const now = new Date();
// console.log(now);

// console.log(new Date(2037, 10, 19, 15, 23, 20));
// // ⬆️ Month starts at 0
// console.log(new Date('Dec 24, 2015'));

// // Timestamp - - the miniseconds past after Jan 01 1970 00:00:00
// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// console.log('-----------------');
// // working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth()); // Month starts at 0
// console.log(future.getDate());
// console.log(future.getDay()); // which day of a week? 0-Sunday
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime()); // Timestamp
// console.log('-------');
// console.log(new Date(2142228180000));
// console.log(Date.now());
// future.setFullYear(2040);
// console.log(future);

// setTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
    (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}.`),
    3000,
    ...ingredients
);
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
// setInterval(() => {
//     const now = Intl.DateTimeFormat('zh', {
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//     }).format(new Date());
//     console.log(now);
// }, 1000);
