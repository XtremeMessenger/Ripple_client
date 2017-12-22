export default function (state = {
  currentUser: '',
  currentRoom: '',
  messages: []
}, action) {
  if (action.type === "SET_GROUP_CHAT") {
    return Object.assign({}, state, {
      currentUser: action.payload.currentUser,
      currentRoom: action.payload.currentRoom,
      messages: action.payload.messages
    })
  }
  return state;
} 