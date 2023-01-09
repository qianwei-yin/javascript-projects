'use strict';

// Coding Challenge #1
// const poll = {
//     question: 'What is your favourite programming language?',
//     options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//     // This generates [0, 0, 0, 0]. More in the next section!
//     answers: new Array(4).fill(0),
// };

// poll.registerNewAnswer = function () {
//     const input = Number(
//         prompt(
//             `${this.question}\n${this.options.join(
//                 '\n'
//             )}\n(Write option number)`
//         )
//     );
//     if (input >= 0 && input <= 3) {
//         this.answers[input] += 1;
//         // console.log(this.answers);
//     } else alert('Invalid Number!');

//     // the result of bind is an new function/method, so we must call it to execute.
//     displayResults.bind(poll)();
//     displayResults.bind(poll)('string');
// };

// document
//     .querySelector('.poll')
//     .addEventListener('click', poll.registerNewAnswer.bind(poll));

// function displayResults(type = 'array') {
//     if (type === 'string') {
//         console.log(`Poll results are ${this.answers.join(', ')}`);
//     } else {
//         console.log(this.answers);
//     }
// }

// // Bonus
// const test1 = {
//     // answers: [5, 2, 3],
//     answers: [1, 5, 3, 9, 6, 1],
// };
// displayResults.call(test1, 'string');
// displayResults.bind(test1)('string');
// displayResults.call(test1);
// displayResults.bind(test1)();

// Coding Challenge #2
(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.body.addEventListener('click', function () {
        header.style.color = 'blue';
    });
})();
