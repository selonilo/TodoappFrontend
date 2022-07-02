import request from "./request";

import * as paths from "./paths";

class subProductDetail {
  /**
   *
   * subproduct detail
   *
   * @static
   * @memberof subproductdetail
   */
  static saveSubProductDetail = async (params) => {
    return await request.post(paths.saveSubProductDetail, params);
  };
  /**
   *
   * subproduct detail list
   *
   * @static
   * @memberof subproductdetail
   */
  static pageableSubProductDetail = async (page,size,body) => {
    return await request.post(paths.pageableSubProductDetail + "?page=" + (page/size) + "&size=" + size + "&sort=name",body);
  };
  /**
   *
   * subproduct detail update
   *
   * @static
   * @memberof subproductdetail
   */
  static updateSubProductDetail = async (params) => {
    return await request.post(paths.updateSubProductDetail, params);
  };
  /**
   *
   * subproduct detail delete
   *
   * @static
   * @memberof subproductdetail
   */
  static deleteSubProductDetail = async (id) => {
    return await request.delete(paths.deleteSubProductDetail + id);
  };
}

export { subProductDetail };
