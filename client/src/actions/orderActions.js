import axios from "axios";
import { returnErrors } from "./errorActions";
import { GET_ORDERS, ORDERS_LOADING, CHECKOUT } from "/.type";

export const getOrders = (id) => (dispatch) => {
  dispatch(setOrdersLoading());
  axios
    .get(`/api/order${id}`)
    .then((res) =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const checkout = (id, source) => (dispatch) => {
  axios
    .post(`/api/checkout/${id}`, { source })
    .then((res) =>
      dispatch({
        type: CHECKOUT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};
