import { useEffect } from "react";
import { addEventListener, removeEventListener } from "../utils";

const useBeforeUnload = (handler) => {
  useEffect(() => {
    const onBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      if (typeof handler === "string") event.returnValue = handler;
      if (typeof handler === "function") handler();
    };

    addEventListener(window, "beforeunload", onBeforeUnload);
    return () => {
      removeEventListener(window, "beforeunload", onBeforeUnload);
    };
  }, [handler]);
};

export default useBeforeUnload;
