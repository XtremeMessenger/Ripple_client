import { combineReducers } from 'redux';
import reducerSignupStore from './signup_store.jsx';
import currentUserStore from './current_user_reducer.jsx';
import currentChatStore from './private_chat_reducer.jsx';
import currentRoomStore from './private_room_reducer.jsx';
import currentChatView from './current_chat_viewing_reducer.jsx';
import currentFriendsStore from './current_friends_reducer.jsx';
import currentRequestsStore from './current_reqeusts_reducer.jsx';

//combine in to one big object
const AllReducers = combineReducers({
  reducerSignupStore: reducerSignupStore,
  currentUserStore: currentUserStore,
  currentChatStore: currentChatStore,
  currentRoomStore: currentRoomStore,
  currentChatView: currentChatView,
  currentFriendsStore: currentFriendsStore,
  currentRequestsStore: currentRequestsStore
});

export default AllReducers;