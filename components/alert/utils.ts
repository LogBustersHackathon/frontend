import { toast, TypeOptions } from "react-toastify";

export const createToastMessage = (text?: any) => {
  if (text) toast(text, { type: "error" });
};
