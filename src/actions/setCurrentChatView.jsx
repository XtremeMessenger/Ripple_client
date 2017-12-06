export const setCurrentChatView = (click) => {
  console.log('You setup new current chat view: ', click);
  return {
    type: 'SET_CURRENT_CHATVIEW',
    payload: click
  }
};