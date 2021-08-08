import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import itemReducer from "./itemReducer";
import orderReducer from "./orderReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  item: itemReducer,
  order: orderReducer,
  cart: cartReducer,
  error: errorReducer,
});
