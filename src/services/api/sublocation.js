import request from "./request";

import * as paths from "./paths";

class sublocation {
  /**
   *
   * sublocation
   *
   * @static
   * @memberof sublocation
   */
  static saveSublocation = async (params) => {
    return await request.post(paths.saveSubLocation, params);
  };
  /**
   *
   * sublocation list
   *
   * @static
   * @memberof sublocation
   */
  static pageableSublocation = async (page,size,body) => {
    return await request.post(paths.pageableSubLocation + "?page=" + page + "&size=" + size + "&sort=name",body);
  };
  /**
   *
   * sublocation update
   *
   * @static
   * @memberof sublocation
   */
  static updateSublocation = async (params) => {
    return await request.post(paths.updateSubLocation, params);
  };
  /**
   *
   * sublocation delete
   *
   * @static
   * @memberof sublocation
   */
  static deleteSublocation = async (id) => {
    return await request.delete(paths.deleteSubLocation + id);
  };
  /**
   *
   * sublocation by id
   *
   * @static
   * @memberof sublocation
   */
  static getSubLocationById = async (id) => {
    return await request.get(paths.getSubLocationById + id);
  };
}

export { sublocation };
