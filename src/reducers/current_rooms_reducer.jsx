export default function (state = {
  currentUser: '',
  currentRooms: []
}, action) {
  if (action.type === "SET_CURRENT_ROOMS") {
    return Object.assign({}, state, {
      currentUser: action.payload.currentUser,
      currentRooms: action.payload.currentRooms
    })
  }
  return state;
} 