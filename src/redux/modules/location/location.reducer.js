import * as actionTypes from "./location.type";

const initialState = {
  location: [],
};

const reducer = (state = initialState, { type, payload, location, selectedLocation, ...params }) => {
  switch (type) {
    case actionTypes.SAVE_LOCATION:
      return { ...state, location: payload };
    default:
      return state;
  }
};

export default reducer;
