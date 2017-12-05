export const setPrivateRoom = (click) => {
  console.log('setPrivateRoom action invoked : ', click);
  return {
    type: 'SET_PRIVATE_ROOM',
    payload: click
  }
};