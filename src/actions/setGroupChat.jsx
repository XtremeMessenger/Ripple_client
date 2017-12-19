export const setGroupChat = (click) => {
  console.log('setGroupChat action invoked : ', click);
  return {
    type: 'SET_GROUP_CHAT',
    payload: click
  }
};