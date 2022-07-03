import { MdHome, MdOutlineProductionQuantityLimits, MdAddLocation, MdLibraryAdd, MdLocationOn } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

const SIZE = 25;

export default function Menu() {
  const menu = [
    // {
    //   label: "Sayım2",
    //   icon: <MdHome size={SIZE} />,
    //   to: "/Products",
    // },
    {
      label: "Ürün Ekleme",
      icon: <MdLibraryAdd size={SIZE} />,
      to: "/defineProduct",
    },

    {
      label: "Sayım",
      icon: <MdHome size={SIZE} />,
      to: "/showProducts",
    },

    {
      label: "Departman",
      icon: <MdLocationOn size={SIZE} />,
      to: "/defineProductArea",
    },

    {
      label: "Ürün",
      icon: <MdOutlineProductionQuantityLimits size={SIZE} />,
      items: [
        {
          label: "Ürün Adı Tanımlama",
          icon: <MdLibraryAdd size={SIZE} />,
          to: "/defineProductGroup",
        },
        {
          label: "Kullanım Amacı Tanımlama",
          icon: <MdLibraryAdd size={SIZE} />,
          to: "/defineSubProductGroup",
        },
        {
          label: "Hammadde Tanımlama",
          icon: <MdLibraryAdd size={SIZE} />,
          to: "/defineSubProductDetail",
        },
        {
          label: "Ölçü/Birim Tanımlama",
          icon: <MdLibraryAdd size={SIZE} />,
          to: "/defineProductLastDetail",
        },
        // {
        //   label: "Renk Tanımlama",
        //   icon: <MdLibraryAdd size={SIZE} />,
        //   to: "/defineColour",
        // },
      ],
    },

    {
      label: "Lokasyon",
      icon: <MdLocationOn size={SIZE} />,
      items: [
        {
          label: "Bölge Tanımlama",
          icon: <MdAddLocation size={SIZE} />,
          to: "/defineLocation",
        },
        // {
        //   label: "Lokasyon Tanımlama",
        //   icon: <MdAddLocation size={SIZE} />,
        //   to: "/defineSubLocation",
        // },
        // {
        //   label: "Alt Lokasyon Tanımlama ",
        //   icon: <MdAddLocation size={SIZE} />,
        //   to: "/defineSubLocationDetail",
        // },
      ],
    },

    {
      label: "Çalışan Tanımlama ",
      icon: <GrUserWorker size={SIZE} />,
      to: "/defineEmployee",
    },
    {
      label: "Yapılacaklar Listesi ",
      icon: <FaUserPlus size={SIZE} />,
      to: "/defineUser",
    },
  ];
  return menu;
}
