import axios from "axios";
import { returnErrors } from "./errorActions";
import { CART_LOADING, GET_CART, ADD_TO_CART, DELETE_FROM_CART } from "./type";

export const getCart = (id) => (dispatch) => {
  dispatch(setCartLoading());
  axios
    .get(`/api/cart/${id}`)
    .then((res) =>
      dispatch({
        type: GET_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addToCart = (id, productId, quantity) => (dispatch) => {
  axios
    .post(`/api/cart/${id}`, { productId, quantity })
    .then((res) =>
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteFromCart = (id) => (dispatch) => {
  axios
    .delete(`/api/cart/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_FROM_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setCartLoading = () => {
  return {
    type: CART_LOADING,
  };
};
