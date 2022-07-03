import {
  DefineProductGroup,
  DefineSubProductDetail,
  DefineSubProductGroup,
  DefineProductLastDetail,
  DefineLocation,
  DefineSubLocation,
  DefineSubLocationDetail,
  DefineEmployee,
  DefineUser,
  ShowProducts,
  DefineProductArea,
  DefineColour,
  DefineProduct,
} from "../pages";
import { Products } from "../pages/Product/";

export const routers = [
  // {
  //   path: "/Products",
  //   component: Products,
  //   label: "Sayım2",
  // },
  {
    path: "/defineProduct",
    component: DefineProduct,
    label: "Ürün Ekleme",
  },
  {
    path: "/showProducts",
    component: ShowProducts,
    label: "Sayım",
  },
  {
    path: "/defineProductArea",
    component: DefineProductArea,
    label: "Departman",
  },
  {
    path: "/defineProductGroup",
    component: DefineProductGroup,
    label: "Ürün Adı Tanımlama",
  },
  {
    path: "/defineSubProductGroup",
    component: DefineSubProductGroup,
    label: "Kullanım Amacı Tanımlama",
  },
  {
    path: "/defineSubProductDetail",
    component: DefineSubProductDetail,
    label: "Hammadde Tanımlama",
  },
  {
    path: "/defineProductLastDetail",
    component: DefineProductLastDetail,
    label: "Ölçü/Biçim Tanımlama",
  },
  {
    path: "/defineLocation",
    component: DefineLocation,
    label: "Bölge Tanımlama",
  },
  // {
  //   path: "/defineSubLocation",
  //   component: DefineSubLocation,
  //   label: "Lokasyon Tanımlama",
  // },
  // {
  //   path: "/defineSubLocationDetail",
  //   component: DefineSubLocationDetail,
  //   label: "Alt Lokasyon Tanımlama",
  // },
  {
    path: "/defineEmployee",
    component: DefineEmployee,
    label: "Çalışan Tanımlama",
  },
  {
    path: "/defineUser",
    component: DefineUser,
    label: "Yapılacaklar Listesi",
  },
  // {
  //   path: "/defineColour",
  //   component: DefineColour,
  //   label: "Renk Tanımlama",
  // },
];
