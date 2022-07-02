import * as actionTypes from './location.type';

export function saveLocation(data) {
    return {
        type: actionTypes.SAVE_LOCATION,
        payload: data
    }
}
