const errorReducer = (state, { type, payload }) => {
  const matches = /(.*)_(REQUEST|FAIL)/.exec(type);

  if (!matches) return state;

  const [, actionType, action] = matches;

  if (action === 'FAIL') {
    return [...state, { actionType, ...payload }];
  }
  return state.filter(x => x.actionType !== actionType);
};

export default errorReducer;
