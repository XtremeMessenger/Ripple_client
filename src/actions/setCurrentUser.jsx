export const setCurrentUser = (submission) => {
  console.log('setup current user : ', submission);
  return {
    type: 'SET_CURRENT_USER',
    payload: submission
  }
};