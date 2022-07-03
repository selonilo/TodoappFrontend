import { MdHome, MdOutlineProductionQuantityLimits, MdAddLocation, MdLibraryAdd, MdLocationOn } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

const SIZE = 25;

export default function Menu() {
  const menu = [
    {
      label: "Yapılacaklar Listesi ",
      icon: <FaUserPlus size={SIZE} />,
      to: "/defineUser",
    },
  ];
  return menu;
}
