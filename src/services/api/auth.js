import request from "./request";

import * as paths from "./paths";

class auth {
  /**
   *
   * login
   *
   * @static
   * @memberof auth
   */
  static login = async (params) => {
    return await request.post(paths.login, params);
  };
  /**
   *
   * logout
   *
   * @static
   * @memberof auth
   */
  static logout = async (params) => {
    return await request.post(paths.logout, params);
  };
}

export { auth };