export const setCurrentFriends = (submission) => {
  console.log('set current friends : ', submission);
  return {
    type: 'SET_CURRENT_FRIENDS',
    payload: submission
  }
};