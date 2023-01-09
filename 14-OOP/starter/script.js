'use strict';

// // Constructor function
// /*
// We usually capitalize the first letter of a constructor function.

// We can use function declaration or function expression to build a constructor function, but not an arrow function, since we have to use the 'this' keyword and arrow function itself does NOT have 'this'.

// The only differece between constructor functions and regular functions is that we use 'new' operator to call a constructor function.
// */
// function Person(firstName, birthYear) {
//     // Instance properties
//     this.firstName = firstName;
//     this.birthYear = birthYear;

//     // Never do this
//     /*
//     Never create a method inside a constructor function. Because imagine if we need to create thousands of instances of Person, then the fact is that each of the objects will carry the method, which means thousands of function copies. This is bad for performance.
//     */
//     // this.calcAge = function () {
//     //     console.log(2037 - this.birthYear);
//     // };
// }

// const jonas = new Person('Jonas', 1991);
// const matilda = new Person('Matilda', 2001);

// console.log(jonas);

// /* The NEW operator
// 1. New {} is created
// 2. function is called, 'this' = {}
// 3. {} linked to prototype. The new object is linked (__proto__ property) to the constructor function's prototype property.
// 4. function automatically return {}
// */

// console.log(jonas instanceof Person); // true

// // Prototypes
// Person.prototype.calcAge = function () {
//     console.log(2037 - this.birthYear);
// };

// // static methods
// Person.hey = function () {
//     console.log('hey there!');
// };
// Person.hey(); // hey there!
// // jonas.hey(); // Uncaught TypeError: jonas.hey is not a function

// jonas.calcAge(); // 46
// matilda.calcAge(); // 36
// /*
// We cannot find the calcAge function in jonas, the  it will automatically turn to the jonas.__proto__.
// This is called Prototypal Inheritance/Delegation.
// */

// console.log(jonas.__proto__);
// console.log(jonas.__proto__ === Person.prototype); // true

// console.log(Person.prototype.isPrototypeOf(jonas)); // true
// console.log(Person.prototype.isPrototypeOf(Person)); // false
// /*
// Person.prototype is not the prototype of Person, but of all the objects that created through the Person function.
// */

// // We could also add properties to the prototype, not just method.
// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species);

// console.log(jonas.hasOwnProperty('firstName')); // true
// console.log(jonas.hasOwnProperty('species')); // false

// console.log(jonas.__proto__);
// console.log(jonas.__proto__.__proto__); // Object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__.__proto__); // null

// const arr = [3, 6, 5, 7, 6, 6, 9, 7, 5];
// console.log(arr.__proto__.__proto__); // Object.prototype (top of prototype chain)
// console.log(arr.__proto__ === Array.prototype); // true

// // Add a method to Array.prototype
// /*
// Extending the prototype of a built-in object is not really a good idea, so we could only use this for experiment or using in our own little project. Reasons:
// 1. The next version of JavaScript may add an method that has the same name we create here.
// 2. During a team work, there may be many developers that use different names to declare a same method.
// */
// Array.prototype.unique = function () {
//     return [...new Set(this)];
// };
// console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.dir(h1);
// /*
// Searching deep into the directory, you will find this is a very very huge prototype chain, and it will still point to Object at last.
// */

// // ES6 Classes
// /*
// ES6 Classes allows us to do the same thing as in the declaring a constructor function, but with better and more modern syntax.

// Classes in JavaScript do not work as classes in other languages. It is just a syntaxic sugar. It still implement prototype inheritance behind the scenes, but the syntax makes more sense to developers using other languages.
// */

// // class expression
// // const PersonCl = class {}

// // class decalration
// class PersonCl {
//     constructor(firstName, birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     }

//     // Methods will be added to .prototype property, but wrote inside of class and outside of constructor function.
//     calcAge() {
//         console.log(2037 - this.birthYear);
//     }

//     greet() {
//         console.log(`Hey ${this.firstName}`);
//     }
//     // ⬆️ These above are Instance Methods, which will be added to .prototype property, so all the instances can access them.
//     // ⬇️ this below is static method.
//     static hey() {
//         console.log('hey there!');
//     }
// }

// const jessica = new PersonCl('Jessica', 2001);
// console.log(jessica);
// jessica.calcAge();

// console.log(jessica.__proto__ === PersonCl.prototype); // true

// PersonCl.hey();

// /*
// 1. Classes are NOT hoisted, even they are class declarations. Remember the functions are hoisted so that we can use them before they are declared.

// 2. Classes are first-class citizens, which means they can be passed into functions and also be returned from functions. Because classes are basically special functions behind the scene.

// 3. Classes are executed in strict mode.
// */

// // Getters and Setters
// const account = {
//     owner: 'Jonas',
//     movements: [200, 300, -100, 750],

//     // Actually the belows are properties.
//     get latest() {
//         return this.movements.slice(-1).pop();
//     },

//     set latest(mov) {
//         this.movements.push(mov);
//     },
// };

// // See how we use the latest property.
// console.log(account.latest); // 750
// account.latest = 50;
// console.log(account.movements); // [200, 300, -100, 750, 50]
// console.log(account.latest); // 50

// // Static Methods
// const array = Array.from(document.querySelectorAll('h1'));
// console.log(array);
// // array.from(); // Uncaught TypeError: array.from is not a function
// /*
// FROM method is actually attached to the entire constructor function, but not a method of its prototype.

// So all the arrays built by Array will not be inherited this method from constructor.

// We also say this From method is in the Array namespace. We call this Static method.

// For other examples, please turn to // Constructor function
// and // ES6 Classes
// */

// // Object.create()
// /*
// There are no properties involved, no constructor functions and no NEW operator. So we could manually set the prototype. And now we create an object that can be the prototype of any objects.
// */
// const PersonProto = {
//     calcAge() {
//         console.log(2037 - this.birthYear);
//     },

//     // A bit like the constructor function, but they really have nothing to do with each other, because we do NOT use NEW to call init().
//     init(firstName, birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     },
// };

// // ⬇️ link the PersonProto (a prototype) to steven
// const steven = Object.create(PersonProto);
// steven.init('Steven', 1991);
// steven.calcAge();

// console.log(steven.__proto__ === PersonProto); // true

// Inheritance between "classes": Constructor Functions
/*
function Person(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};

function Student(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
}

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

console.dir(Student.prototype.constructor); // Person
// ⬆️ this is not we want! Theoretically the constructor function of mike's prototype should be Student. So we do this...
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // Student
*/

// Inheritance between "classes": ES6 Classses
/*
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Instance methods
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.fullName}`);
    }

    get age() {
        return 2037 - this.birthYear;
    }

    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }

    // static method
    static hey() {
        console.log('hey there!');
    }
}

class StudentCl extends PersonCl {
    // If we do NOT have any new propertity to add, just wanna add some methods, then the whole constructor(){} is NO MORE needed.
    constructor(fullName, birthYear, course) {
        // Always needs to happen first! So that 'this' can be accessed.
        super(fullName, birthYear);
        this.course = course;
    }

    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    // override parent's method
    calcAge() {
        console.log(`I'm ${2037 - this.birthYear} years old.`);
    }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
*/

// Inheritance between "classes": Object.create()
/*
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
};

StudentProto.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);

jay.init('Jay', 2001, 'Computer Science');
jay.introduce();
jay.calcAge();
*/

// Encapsulation: Private Class Fields and Methods
class Account {
    // 1. Public fields (instances)
    locale = navigator.language;
    // Yes, we need the ; at last!

    // 2. Private fields (instances)
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;

        console.log(`Thanks for opening an account, ${owner}.`);
    }

    // 3. Public methods
    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
        return this;
    }

    requestLoad(val) {
        if (this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved!`);
            return this;
        }
    }

    // 4. Private methods
    // We can not use # so far. Waiting...
    _approveLoan(val) {
        // No need to add any logic here, just wanna show.
        return true;
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(100);
acc1.withdraw(50);
acc1.requestLoad(1000);

// We can still use ⬇️ to access...
console.log(acc1.getMovements());

// console.log(acc1.#pin); // Uncaught SyntaxError: Private field '#pin' must be declared in an enclosing class

// Chaining methods
console.log(
    acc1.deposit(100).deposit(300).withdraw(40).requestLoad(1000).withdraw(500)
);
