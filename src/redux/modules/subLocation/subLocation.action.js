import * as actionTypes from './subLocation.type';

export function saveSubLocation(data) {
    return {
        type: actionTypes.SAVE_SUBLOCATION,
        payload: data
    }
}