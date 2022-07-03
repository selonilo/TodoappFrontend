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
     static updateToDoList = async (params) => {
      return await request.post(paths.updateToDoList, params);
    };
  /**
   *
   * user delete
   *
   * @static
   * @memberof user
   */
   static deleteToDoList = async (id) => {
    return await request.delete(paths.deleteToDoList + id);
  };
}

export { user };
