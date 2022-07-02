import request from "./request";

import * as paths from "./paths";

class productGroup {
  /**
   *
   * product group
   *
   * @static
   * @memberof productGroup
   */
  static saveProductGroup = async (params) => {
    return await request.post(paths.saveProductGroup, params);
  };
  /**
   *
   * product group list
   *
   * @static
   * @memberof productGroup
   */
  static pageableProductGroup = async (page, size, body) => {
    return await request.post(paths.pageableProductGroup + "?page=" + (page/size) + "&size=" + size + "&sort=name", body);
  };

  /**
   *
   * product group list_
   *
   * @static
   * @memberof productGroup
   */
  static getAllProductGroup = async (params) => {
    return await request.get(paths.getAllProductGroup + params);
  };

    /**
   *
   * product group list_
   *
   * @static
   * @memberof productGroup
   */
     static getAllProductGroupList = async () => {
      return await request.get(paths.getAllProductGroupList);
    };

  /**
   *
   * product group update
   *
   * @static
   * @memberof productGroup
   */
  static updateProductGroup = async (params) => {
    return await request.post(paths.updateProductGroup, params);
  };
  /**
   *
   * product group delete
   *
   * @static
   * @memberof productGroup
   */
  static deleteProductGroup = async (id) => {
    return await request.delete(paths.deleteProductGroup + id);
  };
}

export { productGroup };
