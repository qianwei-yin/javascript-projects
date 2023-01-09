'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function renderError(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
}

function renderCountry(data, className = '') {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.toUpperCase()}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                    data.population / 1000000
                ).toFixed(2)} million people</p>
                <p class="country__row"><span>🗣️</span>${
                    data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                    data.currencies[0].name
                }</p>
            </div>
        </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

///////////////////////////////////////
/*
function getCountryData(country) {
    const request = new XMLHttpRequest();

    // type of request. The http request type to get data is GET.
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        const html = `
        <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.toUpperCase()}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                    data.population / 1000000
                ).toFixed(2)} million people</p>
                <p class="country__row"><span>🗣️</span>${
                    data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                    data.currencies[0].name
                }</p>
            </div>
        </article>
    `;

        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    });
}

getCountryData('china');
getCountryData('usa');
// ⬆️ We have two asynchronous code above. So if you keep freshing the page, you'll find the two countries come in different order each time. Because every time their 'load' event comes at different times.
*/

// Callback Hell
// Imagine if we want to firstly render a country, and THEN render its border country.
/*
function renderCountry(data, className = '') {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.toUpperCase()}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                    data.population / 1000000
                ).toFixed(2)} million people</p>
                <p class="country__row"><span>🗣️</span>${
                    data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                    data.currencies[0].name
                }</p>
            </div>
        </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

function getCountryData(country) {
    const request = new XMLHttpRequest();

    // type of request. The http request type to get data is GET.
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
        // get data of country 1
        const data = JSON.parse(this.responseText)[0];
        console.log(data);

        // render country 1
        renderCountry(data);

        // get data of country 2
        const neighbour = data.borders?.[0];
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener('load', function () {
            const data2 = JSON.parse(this.responseText);
            console.log(data2);
            renderCountry(data2, 'neighbour');
        });
    });
}

getCountryData('china');

setTimeout(() => {
    console.log('1 second passed.');
    setTimeout(() => {
        console.log('2 second passed.');
        setTimeout(() => {
            console.log('3 second passed.');
            setTimeout(() => {
                console.log('4 second passed.');
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);
*/

// Consuming promises

// function getCountryData(country) {
//     fetch(`https://restcountries.com/v2/name/${country}`) // return a promise
//         .then((response) => {
//             response
//                 .json() // also asynchronous, return a promise
//                 .then((data) => {
//                     console.log(data);
//                     renderCountry(data[0]);
//                 });
//         });
// }

// Add some error situations
// function getCountryData(country) {
//     // ⬇️ fetch status turn to 'rejected' when the situation only is no Internet.
//     fetch(`https://restcountries.com/v2/name/${country}`)
//         .then((response) => {
//             if (!response.ok)
//                 throw new Error(`Country not found (${response.status})`);
//             // throwing an error will directly lead to .catch
//             return response.json();
//         })
//         .then((data) => {
//             renderCountry(data[0]);

//             const neighbour = data[0].borders?.[0];
//             if (!neighbour) return;

//             return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//         })
//         .then((response) => response.json())
//         .then((data) => renderCountry(data, 'neighbour'))
//         .catch((err) => {
//             console.error(`${err}`); // A method to log the error to console.
//             renderError(`Something went wrong. ${err.message}. Try again!`);
//         }) // ⬆️ CATCH can catch any errors happening at anywhere in the promise chain
//         .finally(() => (countriesContainer.style.opacity = 1));
//     // .then only works when the promise status is 'fulfilled', .catch only works when the promise status is 'rejected', and .finally works whatever the status is.
//     // These three method are all following an promise, so we can know that .catch also returns a promise.
//     // We could find that in function<renderError> and function<renderCountry>, we all have a statement 'countriesContainer.style.opacity = 1', so we could get this statement in the .finally callback function.
// }

// Throwing errors manually
/*
function getJSON(url) {
    return fetch(url).then((response) => {
        if (!response.ok)
            throw new Error(`Country not found (${response.status})`);
        return response.json();
    });
}

function getCountryData(country) {
    // ⬇️ fetch status turn to 'rejected' when the situation only is no Internet.
    getJSON(`https://restcountries.com/v2/name/${country}`)
        .then((data) => {
            renderCountry(data[0]);
            const neighbour = data[0].borders?.[0];
            if (!neighbour) throw new Error(`Neighbour not found!`);
            return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`);
        })
        .then((data) => renderCountry(data, 'neighbour'))
        .catch((err) => {
            console.error(`${err}`);
            renderError(`Something went wrong. ${err.message}. Try again!`);
        })
        .finally(() => (countriesContainer.style.opacity = 1));
}

btn.addEventListener('click', () => getCountryData('australia'));
*/

// Building a simple promise
/*
const lotteryPromise = new Promise((resolve, reject) => {
    console.log('Lotter draw is happening');
    setTimeout(function () {
        if (Math.random() >= 0.5) resolve('You win.');
        else reject(new Error('You lost.'));
    }, 2000);
});

lotteryPromise
    .then((res) => console.log(res))
    .catch((rej) => console.error(rej));

function wait(second) {
    return new Promise((resolve) => {
        setTimeout(resolve, second * 1000);
    });
}

wait(1)
    .then((res) => {
        console.log('1 second passed');
        return wait(1);
    })
    .then((res) => console.log('1 second passed'));

// microtasks
Promise.resolve('abc').then((r) => console.log(r));
Promise.reject(new Error('def')).catch((r) => console.error(r));
*/

// Promisifying the geolocation API
/*
// We can put every asynchronous operation into a promise
// navigator.geolocation.getCurrentPosition(
//     (pos) => console.log(pos),
//     (err) => console.error(err)
// );


function getPosition() {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     (pos) => resolve(pos),
        //     (err) => reject(err)
        // );

        // ⬆️ We can make this even simpler. If getCurrentPosition automatically calls those two functions, and automatically passes the position into functions, then...
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function whereAmI() {
    getPosition()
        .then((pos) => {
            const { latitude: lat, longitude: lng } = pos.coords;
            return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        })
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    `Refresh too fast (${response.status}). Please wait a few seconds...`
                );
            return response.json();
        })
        .then((data) => {
            console.log(`You are in ${data.city}, ${data.country}`);
            return fetch(`https://restcountries.com/v2/name/${data.country}`);
        })
        .then((response) => {
            if (!response.ok) throw new Error(`Location is not a country.`);
            return response.json();
        })
        .then((data) => renderCountry(data[0]))
        .catch((err) => console.error(`Something went wrong. ${err.message}`))
        .finally((countriesContainer.style.opacity = 1));
}

btn.addEventListener('click', whereAmI);

// Notice that the above has too many asynchronous operations, so instead of callback hell, we chain them in a long flat promise chain, easy to read and edit.
*/

// Async-Await
/*
// Remember, async-await is just a syntax sugar for consuming promises, behind the scene there is still the promise-then. However, async-await makes the syntax more like a synchronous operation.

function getPosition() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos),
            (err) => reject(new Error(err))
        );
    });
}

async function whereAmI() {
    try {
        // Get Geolocation
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        // Revers Geooding
        const resLoc = await fetch(
            `https://geocode.xyz/${lat},${lng}?geoit=json`
        );
        if (!resLoc.ok) throw new Error('Problem getting location data');
        const dataLoc = await resLoc.json();

        // Country data
        const resCtr = await fetch(
            `https://restcountries.com/v2/name/${dataLoc.country}`
        );
        if (!resCtr.ok) throw new Error('Problem getting country data');

        const dataCtr = await resCtr.json();

        renderCountry(dataCtr[0]);

        return `You are in ${dataLoc.city}, ${dataLoc.country}`;
    } catch (error) {
        console.log(err);
        renderError(`${err.message}`);
    }
    // So why do we have to manually add some error messages after fetch()? Because fetch returns reject only when there is no Internet. But there are lots of errros we could possibly meet, like refreshing too quick, falsy urls, etc.
}

// console.log('1: Will get location');
// const str = whereAmI();
// console.log(str); // Promise {<pending>}
// console.log('3: Finished getting location');
// Async Functions always return a promise.
// So, when defining the str, JS has no idea that at the end there is a return statement, because it's still running, so it can only returns a pending promise.
// When the async function finally runs successfully, the str 'You are in...' will be the fulfilled value of the promise/function.

// console.log('1: Will get location');
// whereAmI()
//     .then((str) => console.log(`2: ${str}`))
//     .catch((err) => console.error(`2: ${err.message}`))
//     .finally(() => console.log('3: Finished getting location'));

// The above still mix promise-then and async-await, how about using only async-await? Hint: we can use IIFE.
(async function () {
    console.log('1: Will get location');
    const str = await whereAmI();
    console.log(`2: ${str}`);
    console.log('3: Finished getting location');
})();
*/

// Running promises in parallel
async function get3Countries(c1, c2, c3) {
    // ⬇️ These three promises do NOT depend on the value of each other, so we could run them at the same time.
    const data = await Promise.all([
        getJSON(`https://restcountries.com/v2/name/${c1}`),
        getJSON(`https://restcountries.com/v2/name/${c2}`),
        getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data);
    console.log(data.map((d) => d[0].capital));
}

function getJSON(url) {
    return fetch(url).then((response) => {
        if (!response.ok)
            throw new Error(`Country not found (${response.status})`);
        return response.json();
    });
}

get3Countries('china', 'japan', 'usa');

// promise.race()
// this method retunrs a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.
(async function () {
    const data = await Promise.race([
        getJSON(`https://restcountries.com/v2/name/china`),
        getJSON(`https://restcountries.com/v2/name/usa`),
        getJSON(`https://restcountries.com/v2/name/canada`),
    ]);
    console.log(data);
})();

// Real-world use case: Stop request if it takes too long
function timeout(sec) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error('Request took too long!'));
        }, sec * 1000);
    });
}

Promise.race([
    getJSON(`https://restcountries.com/v2/name/canada`),
    timeout(1),
]).then((res) => console.log(res[0]));

// .allSettled(), .all(), .any()
// this method returns a promise that fulfills after all of the given promises have fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
// However, 'all' returns a single promise that resolves to an array of the results of the input promises. This returned promise will fulfill when all of the input's promises have fulfilled, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message/error.
// Promise.any() returns a single promise that fulfills as soon as any of the promises in the iterable fulfills, with the value of the fulfilled promise. If no promises in the iterable fulfill i.e. if all of the given promises are rejected, then the returned promise is rejected with an AggregateError, a new subclass of error that groups together individual errors.

Promise.allSettled([
    Promise.resolve('success'),
    Promise.reject('error 💥'),
    Promise.resolve('success'),
]).then((res) => console.log(res));
// (3) [{…}, {…}, {…}]

Promise.all([
    Promise.resolve('success'),
    Promise.reject('error 💥'),
    Promise.resolve('success'),
]).then((res) => console.log(res));
// Uncaught (in promise) error 💥

Promise.any([
    Promise.resolve('success'),
    Promise.reject('error 💥'),
    Promise.resolve('success'),
]).then((res) => console.log(res));
// success

Promise.any([
    Promise.reject('error 1'),
    Promise.reject('error 2'),
    Promise.reject('error 3'),
]).then((res) => console.log(res));
// Uncaught (in promise) AggregateError: All promises were rejected
