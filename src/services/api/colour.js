import request from "./request";

import * as paths from "./paths";

class colour {
  /**
   *
   * colour
   *
   * @static
   * @memberof colour
   */
  static saveColour = async (params) => {
    return await request.post(paths.saveColour, params);
  };

  /**
   *
   * colour list_
   *
   * @static
   * @memberof colour
   */
  static getAllColour = async (params) => {
    return await request.get(paths.getAllColour, params);
  };

  /**
   *
   * colour delete
   *
   * @static
   * @memberof colour
   */
  static deleteColour = async (id) => {
    return await request.delete(paths.deleteColour + id);
  };
}
export {colour};
