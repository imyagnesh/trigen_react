const errorReducer = (state = [], { type, payload }) => {
  if (type === 'CLEAR_ERROR') {
    return state.filter(
      x =>
        x.actionType !== payload.actionType &&
        x.loaderId !== payload.loaderId,
    );
  }

  const matches = /(.*)_(REQUEST|FAIL)/.exec(type);

  if (!matches) return state;

  const [, actionType, action] = matches;

  if (action === 'FAIL') {
    return [...state, { actionType, ...payload }];
  }
  return state.filter(
    x =>
      x.actionType !== actionType &&
      x.loaderId !== payload.loaderId,
  );
};

export default errorReducer;
