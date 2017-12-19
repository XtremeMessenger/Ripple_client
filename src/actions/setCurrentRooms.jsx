export const setCurrentRooms = (submission) => {
  console.log('setCurrentRooms : ', submission);
  return {
    type: 'SET_CURRENT_ROOMS',
    payload: submission
  }
};