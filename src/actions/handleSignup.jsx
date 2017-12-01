export const handleSignup = (submission) => {
  console.log('You clicked submission: ', submission);
  return {
    type: 'SUBMIT_SIGNUP',
    payload: submission
  }
};