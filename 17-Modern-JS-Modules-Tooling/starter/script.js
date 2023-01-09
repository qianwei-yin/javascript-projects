// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// With parcel...
import cloneDeep from 'lodash-es';

const state = {
    cart: [
        { product: 'bread', quantity: 5 },
        { product: 'pizza', quantity: 5 },
    ],
    user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
state.user.loggedIn = false;
console.log(stateClone); // false. Because this is a Shallow-copy.

const stateDeepClone = cloneDeep(state);
state.user.loggedIn = 1;
console.log(stateDeepClone); // false. Because this is a Deep-copy.

// If you delete the node_modules directory, then you run 'npm install', then all the dependencies will automatically be installed back.

// If you change sth. in the script, the page will not load again, unlike which in the bankist app: When we change sth. and save, the the page will load automatically and we have to log in again, that's annoying.
if (module.hot) {
    module.hot.accept();
}
