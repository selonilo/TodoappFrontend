import * as actionTypes from './employee.type';

export function saveEmployee(data) {
    return {
        type: actionTypes.SAVE_EMPLOYEE,
        payload: data
    }
}

export function selectedEmployee(item) {
    return {
        type: actionTypes.SELECTED_EMPLOYEE,
        payload: item
    }
}

export function clearSelectedEmployee() {
    return {
        type: actionTypes.CLEAR_SELECTED_EMPLOYEE,
    }
}