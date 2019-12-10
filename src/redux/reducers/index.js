import {combineReducers} from 'redux';

// importação dos reducers externos
import user from './user';
import addOrEdit from './addOrEdit';

export default combineReducers({
  //todos reducers
  user,
  addOrEdit,
});