import * as actionTypes from "./employee.type";

const initialState = {
  employee: [],
  selectedEmployee: {},
};

const reducer = (state = initialState, { type, payload, employee, selectedEmployee, ...params }) => {
  switch (type) {
    case actionTypes.SAVE_EMPLOYEE:
      return { ...state, employee: payload };
    case actionTypes.SELECTED_EMPLOYEE:
      return { ...state, selectedEmployee: payload };
    case actionTypes.CLEAR_SELECTED_EMPLOYEE:
      return { ...state, selectedEmployee: {} };
    default:
      return state;
  }
};

export default reducer;
