export default function (state = {
  currentUser: '',
  currentRoom: '',
  messages: []
}, action) {
  if (action.type === "SET_PRIVATE_ROOM") {
    return Object.assign({}, state, {
      currentUser: action.payload.currentUser,
      currentRoom: action.payload.currentRoom,
      messages: action.payload.messages
    })
  }
  return state;
} 