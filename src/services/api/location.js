import request from "./request";

import * as paths from "./paths";

class location {
  /**
   *
   * location
   *
   * @static
   * @memberof location
   */
  static saveLocation = async (params) => {
    return await request.post(paths.saveLocation, params);
  };
  /**
   *
   * location list
   *
   * @static
   * @memberof location
   */
  static pageableLocation = async (page,size,body) => {
    return await request.post(paths.pageableLocation + "?page=" + (page/size) + "&size=" + size + "&sort=name",body);
  };

  /**
   *
   * location list_
   *
   * @static
   * @memberof location
   */
   static getAllLocation = async (params) => {
    return await request.get(paths.getAllLocation,params);
  };

  /**
   *
   * location update
   *
   * @static
   * @memberof location
   */
  static updateLocation = async (params) => {
    return await request.post(paths.updateLocation, params);
  };
  /**
   *
   * location delete
   *
   * @static
   * @memberof location
   */
  static deleteLocation = async (id) => {
    return await request.delete(paths.deleteLocation + id);
  };

  /**
   *
   * sublocationdetail by id
   *
   * @static
   * @memberof sublocationdetail
   */
   static getSubLocationDetail = async (id) => {
    return await request.get(paths.getSubLocationDetail + id);
  };
}

export { location };
