import request from "./request";

import * as paths from "./paths";

class employee {
  /**
   *
   * employee
   *
   * @static
   * @memberof employee
   */
  static saveEmployee = async (params) => {
    return await request.post(paths.saveEmployee, params);
  };
  /**
   *
   * employee list
   *
   * @static
   * @memberof employee
   */
  static pageableEmployee = async (page, size, body) => {
    return await request.post(paths.pageableEmployee + "?page=" + (page/size) + "&size=" + size + "&sort=name", body);
  };

  /**
   *
   * employee list_
   *
   * @static
   * @memberof employee
   */
  static getAllEmployee = async (params) => {
    return await request.get(paths.getAllEmployee, params);
  };

  /**
   *
   * employee update
   *
   * @static
   * @memberof employee
   */
  static updateEmployee = async (params) => {
    return await request.post(paths.updateEmployee, params);
  };
  /**
   *
   * employee delete
   *
   * @static
   * @memberof employee
   */
  static deleteEmployee = async (id) => {
    return await request.delete(paths.deleteEmployee + id);
  };
}

export { employee };
