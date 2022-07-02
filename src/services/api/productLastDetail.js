import request from "./request";

import * as paths from "./paths";

class productLastDetail {
  /**
   *
   * product last detail
   *
   * @static
   * @memberof productlastdetail
   */
  static saveProductLastDetail = async (params) => {
    return await request.post(paths.saveProductLastDetail, params);
  };
  /**
   *
   * product last detail list
   *
   * @static
   * @memberof productlastdetail
   */
  static pageableProductLastDetail = async (page,size,body) => {
    return await request.post(paths.pageableProductLastDetail + "?page=" + (page/size) + "&size=" + size + "&sort=name",body);
  };
  /**
   *
   * product last detail update
   *
   * @static
   * @memberof productlastdetail
   */
  static updateProductLastDetail = async (params) => {
    return await request.post(paths.updateProductLastDetail, params);
  };
  /**
   *
   * product last detail delete
   *
   * @static
   * @memberof productlastdetail
   */
  static deleteProductLastDetail = async (id) => {
    return await request.delete(paths.deleteProductLastDetail + id);
  };
  /**
   *
   * productlastdetail by id
   *
   * @static
   * @memberof productlastdetail
   */
   static getProductLastDetailById = async (id) => {
    return await request.get(paths.getProductLastDetailById + id);
  };
  /**
   *
   * productlastdetail by id
   *
   * @static
   * @memberof productlastdetail
   */
   static getProductLastDetail = async (id) => {
    return await request.get(paths.getProductLastDetail + id);
  };
}

export { productLastDetail };
