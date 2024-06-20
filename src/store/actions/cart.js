export const cartAction = (params) => (dispatch) => {
  dispatch({
    type: "CART",
    payload: params,
  });
};
