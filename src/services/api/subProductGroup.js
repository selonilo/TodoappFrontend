import request from "./request";

import * as paths from "./paths";

class subProductGroup {
  /**
   *
   * subproduct group
   *
   * @static
   * @memberof subproductGroup
   */
  static saveSubProductGroup = async (params) => {
    return await request.post(paths.saveSubProductGroup, params);
  };
  /**
   *
   * subproduct group list
   *
   * @static
   * @memberof subproductGroup
   */
  static pageableSubProductGroup = async (page, size, body) => {
    return await request.post(paths.pageableSubProductGroup + "?page=" + (page/size) + "&size=" + size + "&sort=name", body);
  };
  /**
   *
   * subproduct group update
   *
   * @static
   * @memberof subproductGroup
   */
  static updateSubProductGroup = async (params) => {
    return await request.post(paths.updateSubProductGroup, params);
  };
  /**
   *
   * subproduct group delete
   *
   * @static
   * @memberof subproductGroup
   */
  static deleteSubProductGroup = async (id) => {
    return await request.delete(paths.deleteSubProductGroup + id);
  };
  /**
   *
   * subproduct group by id
   *
   * @static
   * @memberof subproductGroup
   */
  static getSubProductGroupById = async (id) => {
    return await request.get(paths.getSubProductGroupById + id);
  };
}

export { subProductGroup };
