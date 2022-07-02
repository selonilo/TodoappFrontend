import { combineReducers } from "redux";

import location from "./location/location.reducer";
import subLocation from "./subLocation/subLocation.reducer";
import employee from "./employee/employee.reducer";

const rootReducer = combineReducers({
  location,
  subLocation,
  employee,
});

export default rootReducer;
