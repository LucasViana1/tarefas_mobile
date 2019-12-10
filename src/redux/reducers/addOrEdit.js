const INITIAL_STATE = {
  operation: 'ADICIONAR',
};
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ALTER_ADD_OR_EDIT':
      return {...state, operation: action.textButton};
    default:
      return state;
  }
}