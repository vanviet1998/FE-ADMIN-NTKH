import { useEffect, useState } from "react";
import { addEventListener, removeEventListener } from "../utils";

const getConnection = () => {
  if (typeof navigator !== "object") {
    return null;
  }
  return (
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection
  );
};

const getConnectionState = () => {
  const connection = getConnection();
  if (!connection) {
    return {};
  }
  const { downlink, downlinkMax, effectiveType, type, rtt } = connection;
  return {
    downlink,
    downlinkMax,
    effectiveType,
    type,
    rtt,
  };
};

const useNetwork = (initialState = getConnectionState()) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const localSetState = (newState) => {
      setState((prevState) => ({
        ...prevState,
        ...newState,
      }));
    };

    const connection = getConnection();

    const onOnline = () => {
      localSetState({
        online: true,
        since: new Date(),
      });
    };

    const onOffline = () => {
      localSetState({
        online: false,
        since: new Date(),
      });
    };

    const onConnectionChange = () => {
      localSetState(getConnectionState());
    };

    addEventListener(window, "online", onOnline);
    addEventListener(window, "offline", onOffline);

    if (connection) {
      addEventListener(connection, "change", onConnectionChange);
      localSetState({
        ...state,
        online: navigator.onLine,
        since: undefined,
        ...getConnectionState(),
      });
    }

    return () => {
      removeEventListener(window, "online", onOnline);
      removeEventListener(window, "offline", onOffline);
      if (connection) {
        removeEventListener(connection, "change", onConnectionChange);
      }
    };
  }, []);

  return state;
};

export default useNetwork;
