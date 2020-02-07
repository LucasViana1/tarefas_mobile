import {createStore} from 'redux';

import reducer from '../reducers' // IMPORTAR REDUCERS COMBINADOS

const store = createStore(reducer); // passa reducer ao storage
// const store = createStore({courses}); // passa reducer ao storage

export default store;