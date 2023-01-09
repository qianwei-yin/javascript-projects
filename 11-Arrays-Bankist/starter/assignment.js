// function checkDogs(dogsJulia, dogsKate) {
//     let dogsJuliaCorrect = [...dogsJulia];
//     dogsJuliaCorrect = dogsJuliaCorrect.slice(1, 3);

//     dogs = [...dogsJuliaCorrect, ...dogsKate];

//     dogs.forEach(function (dogAge, i) {
//         if (dogAge < 3) console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//         else
//             console.log(
//                 `Dog number ${i + 1} is an adult, and is ${dogAge} years old`
//             );
//     });
// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// Coding Challenge #2#3
// function calcAverageHumanAge(ages) {
//     return ages
//         .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
//         .filter((age) => age >= 18)
//         .reduce((accu, age, i, arr) => accu + age / arr.length, 0);
// }
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// Coding Challenge #4
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach((dog) => {
    dog.recommendedFood = dog.weight ** 0.75 * 28;
});

// 2.
function eat(dog) {
    dog.eat = 'EatingOkay';
    if (dog.curFood >= 1.1 * dog.recommendedFood) {
        dog.eat = 'EatingTooMuch';
    } else if (dog.curFood <= 0.9 * dog.recommendedFood) {
        dog.eat = 'EatingTooLittle';
    } else if (dog.curFood === dog.recommendedFood) {
        dog.eat = 'EatingExactly';
    }
    return dog.eat;
}
console.log(eat(dogs.find((dog) => dog.owners.includes('Sarah'))));

// 3. ?
const ownersEatTooMuch = dogs
    .filter((dog) => eat(dog) === 'EatingTooMuch')
    .map((dog) => dog.owners)
    .flat();

const ownersEatTooLittle = dogs
    .filter((dog) => eat(dog) === 'EatingTooLittle')
    .map((dog) => dog.owners)
    .flat();

console.log(ownersEatTooMuch, ownersEatTooLittle);

// 4. ok
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some((dog) => eat(dog) === 'EatingExactly'));

// 6.
const eatOkay = (dog) => eat(dog) === 'EatingOkay';
console.log(dogs.some(eatOkay));

// 7.
const dogsEatingOkay = dogs.filter(eatOkay);
console.log(dogsEatingOkay);

// 8.
const dogsSorted = dogs
    .slice()
    .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsSorted);
