import { toast, TypeOptions } from "react-toastify";

export const createToastMessage = (
    Arr: { type: TypeOptions; message: string }[]
  ) => {
    Arr.forEach((v) => {
      toast(v.message, { type: v.type });
    });
  };