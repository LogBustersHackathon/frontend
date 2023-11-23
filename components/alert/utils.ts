import { toast, TypeOptions } from "react-toastify";

export const createToastMessage = (
     text?: any
  ) => {
    // if(Arr)
    // Arr.forEach((v: any) => {
    //   toast(v.message, { type: v.type });
    // });
    if(text)
    toast(`Value: ${text.Value}, Owner: ${text.Owner} Status: ${text.Status} Alarm Type: ${text.AlarmType}`, { type: "error"}),
     console.log('text ' ,text);
  };