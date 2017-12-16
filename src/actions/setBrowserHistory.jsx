export const setBrowserHistory = (submission) => {
  console.log('setBrowserHistory : ', submission);
  return {
    type: "SET_BROWSER_HISTORY",
    payload: submission
  }
};