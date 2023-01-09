'use strict';

// Coding challenge #1
/*
const countriesContainer = document.querySelector('.countries');

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
}

function whereAmI(lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
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

// whereAmI(52.508, 13.381);

whereAmI(19.037, 72.873);

// whereAmI(-33.933, 18.474);
*/

// Coding challenge #2
/*
function createImage(imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', () => {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', () => {
            reject(new Error('Image Path not found'));
        });
    });
}

const imgContainer = document.querySelector('.images');

function wait(second) {
    return new Promise((resolve) => {
        setTimeout(resolve, second * 1000);
    });
}

let currentImage;
createImage('img/img-1.jpg')
    .then((img) => {
        currentImage = img;
        return wait(2);
    })
    .then(() => {
        currentImage.style.display = 'none';
        return createImage('img/img-2.jpg');
    })
    .then((img) => {
        currentImage = img;
        return wait(2);
    })
    .then(() => {
        currentImage.style.display = 'none';
    })
    .catch((err) => console.error(err));
*/

// Coding challenge #3
const imgContainer = document.querySelector('.images');

function createImage(imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', () => {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', () => {
            reject(new Error('Image Path not found'));
        });
    });
}

function wait(sec) {
    return new Promise(function (resolve) {
        setTimeout(resolve, sec * 1000);
    });
}

async function loadNPause() {
    try {
        let currentImg = await createImage('img/img-1.jpg');
        await wait(2);
        currentImg.style.display = 'none';

        currentImg = await createImage('img/img-2.jpg');
        await wait(2);
        currentImg.style.display = 'none';
    } catch (err) {
        console.error(err);
    }
}

// loadNPause();

async function loadAll(imgArr) {
    try {
        const imgsP = imgArr.map(async (img) => await createImage(img));
        console.log(imgsP);

        const imgs = await Promise.all(imgsP);
        console.log(imgs);

        imgs.forEach((img) => img.classList.add('parallel'));
    } catch (err) {
        console.error(err);
    }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
