import { location } from "./location";
import { employee } from "./employee";
import { sublocation } from "./sublocation";
import { sublocationDetail } from "./sublocationDetail";
import { productGroup } from "./productGroup";
import { subProductGroup } from "./subProductGroup";
import { user } from "./user";
import { subProductDetail } from "./subProductDetail";
import { productLastDetail } from "./productLastDetail";
import { product } from "./product";
import { auth } from "./auth";
import { defineProductArea } from "./defineProductArea";
import { colour } from "./colour";
import { numberPlate } from "./numberPlate";
import { products } from "./products";

/**
 * All api calls
 *
 * @class api
 */
class api {
  /**
   *
   * location
   * @static
   * @memberof api
   */
  static location = location;
  /**
   *
   * sublocation
   * @static
   * @memberof api
   */
  static sublocation = sublocation;
  /**
   *
   * sublocationDetail
   * @static
   * @memberof api
   */
  static sublocationDetail = sublocationDetail;
  /**
   *
   * employee
   * @static
   * @memberof api
   */
  static employee = employee;
  /**
   *
   * productGroup
   * @static
   * @memberof api
   */
  static productGroup = productGroup;
  /**
   *
   * subProductGroup
   * @static
   * @memberof api
   */
  static subProductGroup = subProductGroup;
  /**
   *
   * user
   * @static
   * @memberof api
   */
  static user = user;
  /**
   *
   * subProductDetail
   * @static
   * @memberof api
   */
  static subProductDetail = subProductDetail;
  /**
   *
   * productLastDetail
   * @static
   * @memberof api
   */
  static productLastDetail = productLastDetail;

  /**
   *
   * product
   * @static
   * @memberof api
   */
  static product = product;

  /**
   *
   * Auth
   * @static
   * @memberof api
   */
  static auth = auth;

  /**
   *
   * defineProductArea
   * @static
   * @memberof api
   */
  static defineProductArea = defineProductArea;

  /**
   *
   * colour
   * @static
   * @memberof api
   */
  static colour = colour;

  /**
   *
   * numberPlate
   * @static
   * @memberof api
   */
  static numberPlate = numberPlate;

    /**
   *
   * products
   * @static
   * @memberof api
   */
     static products = products;
}

export { api };
