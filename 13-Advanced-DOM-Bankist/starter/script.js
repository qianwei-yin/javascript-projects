'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
    e.preventDefault(); // if not include this line, then when we click the button, the page will jump to the top, that's ugly.
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Button 'Learn more'
btnScrollTo.addEventListener('click', function (e) {
    const s1Coords = section1.getBoundingClientRect();
    console.log(s1Coords);
    // ⬆️ return a DOMRect, and the y/top means the distance between element and browser top (not the HTML top).
    // And top/left is usable for all browsers.

    // e.target stands for btnScrollTo
    console.log(e.target.getBoundingClientRect());

    console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

    // Scrolling: old-school method
    // window.scrollTo({
    //     left: s1Coords.left + window.pageXOffset,
    //     top: s1Coords.top + window.pageYOffset,
    //     behavior: 'smooth',
    // });

    // Scrolling: new, simpler method
    // Firstly, what is view?
    console.log(
        'height/width viewpoint',
        document.documentElement.clientHeight,
        document.documentElement.clientWidth
    );
    // view means the page you can see in the browser, even when the 'Inspect' functionality make the working-area larger/smaller, the view size will also change.

    section1.scrollIntoView({
        behavior: 'smooth',
    });
});

// Page navigation
/*
// The not-so-good method
document.querySelectorAll('.nav__link').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault();

        const jumpToId = this.getAttribute('href');
        document.querySelector(jumpToId).scrollIntoView({ behavior: 'smooth' });
    });
});
// But in this way, we create many function(e) {} copies in the memory, so imagine if there are 1000 nav__link, then this is a bad method.
*/

// Good method: Event Delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    // Matching Strategy: Only when we click the nav__link then the action is gonna be executed. So if we click the space between the nav__link, there won't be any actions.
    // e.target stands for the actual element that the click happens on; And e.currentTarget stands for 'this' keyword, which is 'document.querySelector('.nav__links')' in this case.
    if (e.target.classList.contains('nav__link')) {
        const jumpToId = e.target.getAttribute('href');
        document.querySelector(jumpToId).scrollIntoView({ behavior: 'smooth' });
    }
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
    e.preventDefault();

    // Matching Strategy
    // if (e.target.classList.contains('operations__tab'))
    // ⬆️ In this way, when we click the span element in the button (01, 02, 03 in this case), the if-result will be false, which is not we want. So...
    const clicked = e.target.closest('.operations__tab');

    // Guard clause. Use return to break a falsy condition is moderner than writing all the statements in an if-true block.
    if (!clicked) return;

    // Remove active classes for both tabs and contents
    tabs.forEach((t) => t.classList.remove('operations__tab--active'));
    tabsContent.forEach((tc) =>
        tc.classList.remove('operations__content--active')
    );

    // Active tab
    clicked.classList.add('operations__tab--active');

    // Active content area
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

// Menu fade animation
const nav = document.querySelector('.nav');

// mouseover is like mouseenter, the difference is mouseenter does NOT have the Bubbling Phase, but in this case we do need the bubbling, because we need Event Delegation.
function handleHover(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link
            .closest('.nav__links')
            .querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('.nav__logo');

        siblings.forEach((s) => {
            if (s !== link) s.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}

// ⬇️ This will not gonna work. Because addEventListener need a function but not a result that returned from the handleHover function.
// nav.addEventListener('mouseover', handleHover(e, 0.5));

// So maybe we can do like this...
// nav.addEventListener('mouseover', function (e) {
//     handleHover(e, 0.5);
// });

// However, ⬆️ this is a little bit ugly and dirty, so we need some improvements, which is using bind()...
nav.addEventListener('mouseover', handleHover.bind(0.5));
// ⬆️ By doing so... handleHover.bind(0.5) is a function and 'this' for it is 0.5!!!
nav.addEventListener('mouseout', handleHover.bind(1));

/*
We knew that 'this' and 'e.currentTarget' are the same in an event handler function, but that works when we do not manually set the 'this' value. Therefore, in this case, we set the 'this' value to opacity, then 'this' === opacity, and e.currentTarget === nav element.

And we all know that event handler function can only have one REAL argument, that is the EVENT itself. So 'this' is not a real argument.

In a word, this is the method to pass additional parameters into an event handler function, and if we need to pass more parameters, we could use arrays/objects.
*/

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//     if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
// });
// ⬆️ However, we can notice that when we scroll the window, the event listener fires all the time, and this leads to very bad perfomance.

// Sticky navigation: Intersection Observer API
// Experiment
// function obsCallback(entries, observer) {
//     entries.forEach((entry) => console.log(entry));
// }

// const obsOptions = {
//     root: null,
//     threshold: [0, 0.1],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

function stickyNav(entries) {
    // It seems like: when we have two thresholds, which means we have two IntersectionRatio to observe, then the 'entries' is an array of 2 elements. But now we have only one threshold, the 'entries' is an array of ONE element.
    const entry = entries[0];
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    // rootMargin is like adding some more spaces to root, which is our viewport. And when the value is negative, then like narrowing some spaces from the viewport.
    // Classic example: When we have some images in a page, we want it to be loaded before we scroll to it. So we can set the rootMargin as 100px, then when we have 100px left to scroll, the image starts to load at that moment.

    // And in this case, tha rootMargin is set to be negative, so we show the sticky navigation bar before the header completely disappear.
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

function revealSection(entries, observer) {
    const entry = entries[0];

    // We don't know why there is an IntersectionObserverEntry record at first when we refresh the page. Then the section--1 won't show the revealing animation. So we use ⬇️ to matching strategy.
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');

    // When the section has been revealed once, then we stop observing it. So that the sections won't keep revealing when we scroll up and down through the page.
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach((sec) => {
    sectionObserver.observe(sec);
    sec.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]'); // select all the img elements that have an data-src property in them.

function loadImg(entries, observer) {
    const entry = entries[0];

    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    // When ⬆️ have been loaded, it will throw out a 'load' signal, so we can use the EventListener, in order to remove the blur overlay right AFTER the high-quality image has loaded completely.
    // If we do not use this EventListener, then there may be a situation that when the Internet speed is low, the blur overlay has been removed early, the image is still loading and low-quality image presents to users.
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '100px',
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currSlide = 0;
const maxSlide = slides.length;
const dotsContainer = document.querySelector('.dots');

/* To make the slides smaller, so that we can see how we are going on
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(-800px)';
slider.style.overflow = 'visible';
*/

init();

// Functions
function goToSlide(curr) {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${(i - curr) * 100}%)`;
    });
}

function createDots() {
    slides.forEach((_, i) => {
        dotsContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
}

function activateDot(curr) {
    document
        .querySelectorAll('.dots__dot')
        .forEach((d) => d.classList.remove('dots__dot--active'));

    // ⬇️ remember the way to select the active dot!
    dotsContainer
        .querySelector(`.dots__dot[data-slide="${curr}"]`)
        .classList.add('dots__dot--active');
}

function nextSlide() {
    if (currSlide === maxSlide - 1) {
        currSlide = 0;
    } else {
        currSlide++;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
}

function prevSlide() {
    if (currSlide === 0) {
        currSlide = maxSlide - 1;
    } else {
        currSlide--;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
}

function init() {
    goToSlide(currSlide);
    createDots();
    activateDot(currSlide);
}

// Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// Make it usable when we hit the ArrowLeft/ArrowRight on the keyboard
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        currSlide = Number(e.target.dataset.slide);
        goToSlide(currSlide);
        activateDot(currSlide);
    }
});

///////////////////////////////////////
///////////////////////////////////////
// Lecture

////////////////////////////////////
/* Selecting, Creating and Deleting Elements
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections); // return a NodeList

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // return a HTMLCollection

console.log(document.getElementsByClassName('btn')); // return a HTMLCollection

// create and insert elements
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
    'We use cookie for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';

header.append(message);

// delete element
document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
        message.remove();
    });
*/

//////////////////////////////////
/* Styles, Attributes and Classes
// styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // This return nothing, because this method only access the inline styles, which is in the HTML file. And the above two lines add backgroundColor and width to the inline styles.
console.log(message.style.backgroundColor); // rgb(55, 56, 61)

console.log(getComputedStyle(message)); // return a huge object: CSSStyleDeclaration, this is the style info computed when executed.
console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 48.2344px

message.style.height =
    Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
console.log(getComputedStyle(message).height); // 78.2344px

// ⬇️ documentElement stands for the ':root' in the CSS file.
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // Bankist logo

// Non-standard
console.log(logo.designer); // undefined. Because only alt and src are the standard attributes of image.
console.log(logo.getAttribute('designer')); // jonas

// change or set attribute
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'bankist');

// absolute and relative link
console.log(logo.src); // http://127.0.0.1:8080/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png

// Data attributes
console.log(logo.dataset.versionNumber); //  '3.0'

// classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
console.log(logo.classList.contains('c')); // true
logo.classList.remove('c');

// DON'T USE, this will replace all the class names.
// logo.className = 'jonas';
*/

///////////////////////////////////////
/* Other Event Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
    alert('addEventListener: You are reading the heading!');
};
h1.addEventListener('mouseenter', alertH1);

// And you obviously do not want the alert continues to happen all the time. So you can let the EventListener disappear after some time.
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 10000);
*/

////////////////////////////////////
/* DOM Traversing
const h1 = document.querySelector('h1');
console.log(h1);

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children); // Only the direct children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parent
console.log(h1.parentNode);
console.log(h1.parentElement);

// 'closest' is nearly the opposite of 'querySelector', it selects the closest element no matter how far up the DOM tree. While querySelector selects the child element no matter how far down the DOM tree.
h1.closest('.header').style.background = 'var(--gradient-secondary)';
// the closest h1 of h1 is itself.
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling); // return null. Because h1 is the first child of its parent element
console.log(h1.nextElementSibling);

// If we want to select all its siblings...
console.log(h1.parentElement.children); // also includes itself
*/

////////////////////////////////////
// Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function (e) {
    console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
    console.log('Page fully loaded!', e);
});

// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault();
//     console.log(e);
//     e.returnValue = '';
// });
