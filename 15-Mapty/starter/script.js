'use strict';

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; // km
        this.duration = duration; // min
    }

    // Running on April 14
    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
            months[this.date.getMonth()]
        } ${this.date.getDate()}`;
    }
}

class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.clacPace();
        this.description = this._setDescription();
    }

    clacPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.clacSpeed();
        this.description = this._setDescription();
    }

    clacSpeed() {
        // km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    #mapEvent;
    #map;
    #workouts = [];
    #mapZoomLevel = 14;

    constructor() {
        // Get user's position
        this._getPosition();

        // Set event handlers
        inputType.addEventListener('change', this._toggleElevationField);
        form.addEventListener('submit', this._newWorkout.bind(this));
        containerWorkouts.addEventListener(
            'click',
            this._moveToPopup.bind(this)
        );
    }

    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),

                function () {
                    alert('Could not get your position.');
                }
            );
    }

    _loadMap(position) {
        // ⬇️ This is the location where user's computer is.
        const { latitude, longitude } = position.coords;
        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
        // The second parameter is the zoom level of the map.

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);

        // Handling clicks on map
        this.#map.on('click', this._showForm.bind(this));
        // ⬆️ Why this cannot be wrote in the constructor function? Because constructor function is the first place to be executed, at that time, the #map is an undefined.

        // After the map is rendered...
        this._getlocalStorage();
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm() {
        // Empty inputs
        // prettier-ignore
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1000);
    }

    _toggleElevationField() {
        inputCadence
            .closest('.form__row')
            .classList.toggle('form__row--hidden');
        inputElevation
            .closest('.form__row')
            .classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        e.preventDefault();

        function checkValid(...inputs) {
            return inputs.every((inp) => Number.isFinite(inp));
        }

        function checkPositive(...inputs) {
            return inputs.every((inp) => inp > 0);
        }

        // Get data from form
        const type = inputType.value;
        const distance = Number(inputDistance.value);
        const duration = Number(inputDuration.value);
        // ⬇️ This is the location where user's click on map is.
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;

        // If workout running, create running object
        const cadence = Number(inputCadence.value);
        if (type === 'running') {
            // Check if data is valid && positive
            if (
                !checkValid(distance, duration, cadence) ||
                !checkPositive(distance, duration, cadence)
            )
                return alert('Inputs are invalid.');

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // If workout cycling, create cycling object
        const elevationGain = Number(inputElevation.value);
        if (type === 'cycling') {
            // Check if data is valid && positive
            if (
                !checkValid(distance, duration, elevationGain) ||
                !checkPositive(distance, duration)
            )
                return alert('Inputs are invalid.');

            workout = new Cycling(
                [lat, lng],
                distance,
                duration,
                elevationGain
            );
        }

        // Add new object to workout array
        this.#workouts.push(workout);

        // Render workout on map as marker
        this._renderWorkoutMarker(workout);

        // Render workout on list
        this._renderWorkout(workout);

        // Hide form + Clear input fields
        this._hideForm();

        // Set local storage
        this._setLocalStorage();

        // Get local storage and render
        // Put at somewhere when the map has been rendered.
    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
                })
            )
            .setPopupContent(
                `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${
                    workout.description
                }`
            )
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${
            workout.id
        }" data->
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${
                        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
                    }</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
        `;

        if (workout.type === 'running')
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>
            `;

        if (workout.type === 'cycling')
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>
            `;

        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');

        if (!workoutEl) return;

        const workout = this.#workouts.find(
            (wo) => wo.id === workoutEl.dataset.id
        );

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            },
        });
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }

    _getlocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));
        /*
        However, LocalStorage has a big disadvantage: After parsing, it only leaves the basic properties. The prototype chain will have gone, because we save the data as strings when put them into storage, so prototype chain (something very high-level) will not be included.
        */

        if (!data) return;

        this.#workouts = data;

        this.#workouts.forEach((wo) => {
            this._renderWorkout(wo);
            this._renderWorkoutMarker(wo);
        });
    }

    // We can use this in the console...
    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }
}

const app = new App();
