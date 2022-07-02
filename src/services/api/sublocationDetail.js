import request from "./request";

import * as paths from "./paths";

class sublocationDetail {
  /**
   *
   * sublocationDetail
   *
   * @static
   * @memberof sublocationDetail
   */
  static saveSublocationDetail = async (params) => {
    return await request.post(paths.saveSubLocationDetail, params);
  };
  /**
   *
   * sublocationDetail list
   *
   * @static
   * @memberof sublocationDetail
   */
  static pageableSublocationDetail = async (page,size,body) => {
    return await request.post(paths.pageableSubLocationDetail + "?page=" + page + "&size=" + size + "&sort=name",body);
  };
  /**
   *
   * sublocationDetail update
   *
   * @static
   * @memberof sublocationDetail
   */
  static updateSublocationDetail = async (params) => {
    return await request.post(paths.updateSubLocationDetail, params);
  };
  /**
   *
   * sublocationDetail delete
   *
   * @static
   * @memberof sublocationDetail
   */
  static deleteSublocationDetail = async (id) => {
    return await request.delete(paths.deleteSubLocationDetail + id);
  };

  /**
   *
   * productlastdetail by id
   *
   * @static
   * @memberof sublocationDetail
   */
   static getSubLocationDetail = async (id) => {
    return await request.get(paths.getSubLocationDetail + id);
  };
}

export { sublocationDetail };
