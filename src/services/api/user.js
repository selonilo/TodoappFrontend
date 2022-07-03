import request from "./request";

import * as paths from "./paths";

class user {
  /**
   *
   * user
   *
   * @static
   * @memberof user
   */
  static saveUser = async (params) => {
    return await request.post(paths.saveUser, params);
  };
  /**
   *
   * user
   *
   * @static
   * @memberof user
   */
   static saveToDoList = async (params) => {
    return await request.post(paths.saveToDoList, params);
  };
  /**
   *
   * user list
   *
   * @static
   * @memberof user
   */
  static getAllUser = async (params) => {
    return await request.get(paths.getAllUser, params);
  };
  /**
   *
   * user list
   *
   * @static
   * @memberof user
   */
   static getToDoList = async (id) => {
    return await request.get(paths.getToDoList + id);
  };
  /**
   *
   * user update
   *
   * @static
   * @memberof user
   */
  static updateUser = async (params) => {
    return await request.post(paths.updateUser, params);
  };
  /**
   *
   * user delete
   *
   * @static
   * @memberof user
   */
  static deleteUser = async (id) => {
    return await request.delete(paths.deleteUser + id);
  };
}

export { user };
