export default function (state = {
  currentUser: '',
  currentFriend: '',
  directRoomId: null,
  messages: []
}, action) {
  if (action.type === "SET_PRIVATE_CHAT") {
    return Object.assign({}, state, {
      currentUser: action.payload.currentUser,
      currentFriend: action.payload.currentFriend,
      directRoomId: action.payload.directRoomId,
      messages: action.payload.messages
    })
  }
  return state;
} 