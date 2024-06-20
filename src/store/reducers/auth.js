const initialState = {
  isAuth: JSON.parse(localStorage.getItem("isLoggedIn")),
};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case "AUTH":
      return { ...state, isAuth: payload };

    default:
      return state;
  }
};

export default auth;
