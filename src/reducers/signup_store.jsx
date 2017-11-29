export default function (state = {
    username: '',
    password: '',
    email: ''
  }, action) {
    if (action.type === "SUBMIT_SIGNUP") {
      return Object.assign({}, state, {
        username: action.payload.username,
        password: action.payload.password,
        email: action.payload.email
      })
    }
    return state;
  } 