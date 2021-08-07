import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  GET_ITEMS,
  ADD_ITEM,
  DELTE_ITEM,
  UPDATE_ITEM,
  ITEMS_LOADING,
} from "./type";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());

  axios
    .get("/api/items")
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item) => (dispatch) => {
  axios
    .post("/api/items", item)
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
