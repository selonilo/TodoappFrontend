import request from "./request";

import * as paths from "./paths";

class defineProductArea {
  /**
   *
   * defineProductArea
   *
   * @static
   * @memberof defineProductArea
   */
  static saveProductArea = async (params) => {
    return await request.post(paths.saveProductArea, params);
  };

  /**
   *
   * defineProductArea list
   *
   * @static
   * @memberof defineProductArea
   */
  static getAllProductArea = async (params) => {
    return await request.get(paths.getAllProductArea, params);
  };

  /**
   *
   * defineProductArea delete
   *
   * @static
   * @memberof defineProductArea
   */
  static deleteProductArea = async (id) => {
    return await request.delete(paths.deleteProductArea + id);
  };
}

export { defineProductArea };
