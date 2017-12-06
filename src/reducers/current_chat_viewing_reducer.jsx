export default function (state = {
  chatview: 0
}, action) {
  if (action.type === "SET_CURRENT_CHATVIEW") {
    return Object.assign({}, state, {
      chatview: action.payload.chatview
    })
  }
  return state;
} 