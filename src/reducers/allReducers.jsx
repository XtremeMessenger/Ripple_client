import { combineReducers } from 'redux';
import reducerSignupStore from './signup_store.jsx';
import currentUserStore from './current_user_reducer.jsx';

//combine in to one big object
const AllReducers = combineReducers({
  reducerSignupStore: reducerSignupStore,
  currentUserStore: currentUserStore
});

export default AllReducers;