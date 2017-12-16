export const setCurrentRequests = (submission) => {
  console.log('set current requests : ', submission);
  return {
    type: 'SET_CURRENT_REQUESTS',
    payload: submission
  }
};