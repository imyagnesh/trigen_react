const loadingReducer = (state = [], { type, payload }) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);

  if (!matches) return state;

  const [, actionType, action] = matches;

  if (action === 'REQUEST') {
    return [...state, { actionType, ...payload }];
  }
  return state.filter(
    x =>
      !(
        x.actionType === actionType &&
        x.loaderId === payload.loaderId
      ),
  );
};

export default loadingReducer;
