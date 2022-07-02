import request from "./request";

import * as paths from "./paths";
class numberPlate {
  /**
   *
   * numberPlate list_
   *
   * @static
   * @memberof numberPlate
   */
   static getAllNumberPlate = async (params) => {
    return await request.get(paths.getAllNumberPlate, params);
  };
}
export {numberPlate}