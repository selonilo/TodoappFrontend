import moment from "moment";
import "moment/locale/tr";
import "moment-timezone";

const convertDate = (date) => {
  return moment.tz(date, "Europe/Istanbul")?._d;
};

export { convertDate };
