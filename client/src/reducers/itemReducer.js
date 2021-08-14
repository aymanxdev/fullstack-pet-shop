import {
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "../actions/type";

const initialState = {
  items: [],
  loading: false,
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case UPDATE_ITEM:
      const { id, data } = action.payload;
      return {
        ...state,
        items: state.items.forEach((item) => {
          if (item._id === id) {
            item = data;
          }
        }),
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
}
