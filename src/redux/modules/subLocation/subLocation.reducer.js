import * as actionTypes from "./subLocation.type";

const initialState = {
  subLocation: [],
  selectedSubLocation: {},
};

const reducer = (state = initialState, { type, payload, subLocation, selectedSubLocation, ...params }) => {
  switch (type) {
    case actionTypes.SAVE_SUBLOCATION:
      return { ...state, subLocation: payload };
    default:
      return state;
  }
};

export default reducer;
