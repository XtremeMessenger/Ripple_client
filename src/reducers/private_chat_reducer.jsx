export default function (state = {
  currentUser: '',
  currentFriend: '',
  messages: []
}, action) {
  if (action.type === "SET_PRIVATE_CHAT") {
    return Object.assign({}, state, {
      currentUser: action.payload.currentUser,
      currentFriend: action.payload.currentFriend,
      messages: action.payload.messages
    })
  }
  return state;
} 