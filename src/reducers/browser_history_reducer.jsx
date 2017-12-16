export default function (state = {
    history: null
  }, action) {
    if (action.type === "SET_BROWSER_HISTORY") {
      return Object.assign({}, state, {
        history: action.payload.history
      })
    }
    return state;
  } 