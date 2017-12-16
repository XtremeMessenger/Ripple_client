export default function (state = {
  currentUser: '',
  currentRequests: []
}, action) {
  if (action.type === "SET_CURRENT_REQUESTS") {
    return Object.assign({}, state, {
      currentUser: action.payload.currentUser,
      currentRequests: action.payload.currentRequests
    })
  }
  return state;
} 