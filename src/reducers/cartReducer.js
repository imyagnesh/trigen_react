const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOAD_CART_REQUEST':
      return payload;

    case 'ADD_CART_SUCCESS':
      return [...state, payload];

    case 'UPDATE_CART_SUCCESS': {
      const index = state.findIndex(
        x => x.id === payload.id,
      );
      return [
        ...state.slice(0, index),
        payload,
        ...state.slice(index + 1),
      ];
    }

    default:
      return state;
  }
};

export default cartReducer;
