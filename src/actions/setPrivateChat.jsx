export const setPrivateChat = (click) => {
  console.log('setup private chat : ', click);
  return {
    type: 'SET_PRIVATE_CHAT',
    payload: click
  }
};