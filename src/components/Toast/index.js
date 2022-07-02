import { toast } from "react-toastify";

class Toast {
  static success = (message) => {
    return toast.success(message);
  };
  static warning = (message) => {
    return toast.warn(message);
  };
  static error = (message) => {
    return toast.error(message);
  };
}

export default Toast;
