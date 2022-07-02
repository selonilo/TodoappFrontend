import request from "./request";

import * as paths from "./paths";

class products {
  /**
   *
   * product lists pageable
   *
   * @static
   * @memberof products
   */
  static pageableProduct = async (page, size, body) => {
    return await request.post(paths.pageableProducts + "?page=" + (page/size) + "&size=" + size + "&sort=productBarcode", body);
  };
  /**
   *
   * all products list
   *
   * @static
   * @memberof products
   */
  static getAllProduct = async (params) => {
    return await request.get(paths.allProducts, params);
  };
  /**
   *
   * products  save
   *
   * @static
   * @memberof products
   */
  static saveProduct = async (params) => {
    return await request.post(paths.saveProducts, params);
  };
  /**
   *
   * products  update
   *
   * @static
   * @memberof products
   */
  static updateProduct = async (params) => {
    return await request.post(paths.updateProducts, params);
  };
  /**
   *
   * products  delete
   *
   * @static
   * @memberof products
   */
  static deleteProduct = async (id) => {
    return await request.delete(paths.deleteProducts + id);
  };
}

export { products };
