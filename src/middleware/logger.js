export default store => next => action => {
  const matches = /(.*)_(FAIL)/.exec(action.type);

  if (matches) {
    console.log(action);
  }

  next(action);
};
