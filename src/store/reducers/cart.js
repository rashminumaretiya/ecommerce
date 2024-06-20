const initialState = {
  cartItem: JSON.parse(localStorage.getItem("cartItem")) || [],
};

const cart = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CART":
      return { ...state, cartItem: payload };

    default:
      return state;
  }
};

export default cart;
