'use strict';

// Coding Challenge #1
/*
function Car(make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(this.speed);
};

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.brake();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();
*/

// Coding Challenge #2
/*
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(this.speed);
    }

    brake() {
        this.speed -= 5;
        console.log(this.speed);
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(sp) {
        this.speed = sp * 1.6;
    }
}

const car1 = new CarCl('Ford', 120);
console.log(car1.speedUS); // 75
car1.accelerate();
car1.accelerate();
car1.brake(); // 135
car1.speedUS = 100;
console.log(car1); // CarCl {make: 'Ford', speed: 160}
*/

// Cooding Challenge #3

function Car(make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(this.speed);
};

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(this.speed);
};

function EC(make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
}

// linking prototypes
EC.prototype = Object.create(Car.prototype);

// If need...
// EC.prototype.constructor = EC;

EC.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
};

EC.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    console.log(
        `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
    );
};

const tesla = new EC('Tesla', 120, 23);
console.log(tesla);

tesla.accelerate();
console.log(tesla);
/* Polymorphism
⬆️ So we notice that the second accelerate function was called actually. So if there are multiple methods or properties in the prototype chain, the first one (in this case, the second accelerate) appears will be used.

That is, the child class could override the method/property that inherited from its parent class.
*/

tesla.brake();
console.log(tesla);

tesla.chargeBattery(90);
console.log(tesla);

// Coding Challenge #4
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(this.speed);
    }

    brake() {
        this.speed -= 5;
        console.log(this.speed);
        return this;
    }
}

class EVCl extends CarCl {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this;
    }

    accelerate() {
        this.speed += 20;
        this.#charge -= 1;
        console.log(
            `${this.make} going at ${this.speed} km/h, with a charge of ${
                this.#charge
            }%`
        );
        return this;
    }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(
    rivian
        .chargeBattery(90)
        .accelerate()
        .accelerate()
        .brake()
        .chargeBattery(100)
);
