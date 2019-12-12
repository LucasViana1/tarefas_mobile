const INITIAL_STATE = {
  id: 0,
  operation: 'ADICIONAR',
};
export default function addOrEdit(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ALTER_ADD_OR_EDIT':
      return {...state, id: action.id, operation: action.textButton};
    default:
      return state;
  }
}