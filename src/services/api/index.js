import { user } from "./user";
import { auth } from "./auth";


/**
 * All api calls
 *
 * @class api
 */
class api {

  /**
   *
   * user
   * @static
   * @memberof api
   */
  static user = user;

  /**
   *
   * Auth
   * @static
   * @memberof api
   */
  static auth = auth;
}

export { api };
