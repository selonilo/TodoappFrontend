import request from "./request";

import * as paths from "./paths";

class product {
  /**
   *
   * product list pageable
   *
   * @static
   * @memberof product
   */
  static pageableProduct = async (page, size, body) => {
    return await request.post(paths.pageableProduct + "?page=" + (page/size) + "&size=" + size + "&sort=productBarcode", body);
  };
  /**
   *
   * all product list
   *
   * @static
   * @memberof product
   */
  static getAllProduct = async (params) => {
    return await request.get(paths.allProduct, params);
  };
  /**
   *
   * product  save
   *
   * @static
   * @memberof product
   */
  static saveProduct = async (params) => {
    return await request.post(paths.saveProduct, params);
  };
  /**
   *
   * product  update
   *
   * @static
   * @memberof product
   */
  static updateProduct = async (params) => {
    return await request.post(paths.updateProduct, params);
  };
  /**
   *
   * product  delete
   *
   * @static
   * @memberof product
   */
  static deleteProduct = async (id) => {
    return await request.delete(paths.deleteProduct + id);
  };
}

export { product };
