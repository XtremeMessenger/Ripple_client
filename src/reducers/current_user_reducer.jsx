export default function (state = {
  username: '',
  firebase_id: '',
  email: '',
  first: '',
  last: '',
  quote: '',
  icon: ''
}, action) {
  if (action.type === "SET_CURRENT_USER") {
    return Object.assign({}, state, {
      username: action.payload.username,
      firebase_id: action.payload.key,
      email: action.payload.email,
      first: action.payload.first,
      last: action.payload.last,
      quote: action.payload.quote,
      icon: action.payload.icon
    })
  }
  return state;
} 