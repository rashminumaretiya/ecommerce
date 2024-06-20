export const authAction = (params) => (dispatch) => {
  dispatch({
    type: "AUTH",
    payload: params,
  });
};
