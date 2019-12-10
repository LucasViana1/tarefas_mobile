import {createStore} from 'redux';

// IMPORTAR REDUCERS COMBINADOS
import reducer from '../reducers'

const store = createStore(reducer); // passa reducer ao storage
// const store = createStore({courses}); // passa reducer ao storage

export default store;