export default function (state = {
  currentUser: '',
  currentFriends: []
}, action) {
  if (action.type === "SET_CURRENT_FRIENDS") {
    return Object.assign({}, state, {
      currentUser: action.payload.currentUser,
      currentFriends: action.payload.currentFriends
    })
  }
  return state;
} 