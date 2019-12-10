//reducer (poderia ser externo)
const INITIAL_STATE = {
  login: 'Lucas',// login será pego dinamicamente
};
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_LOGIN':
      return {...state, login: [...state.login, action.title]};
    default:
      return state;
  }
}