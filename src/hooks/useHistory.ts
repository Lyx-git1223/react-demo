import { useSyncExternalStore } from "react";

export const useHistory = () => {
  const subscribe = (callback: () => void) => {
    // history 底层是popstate
    // hash底层是hashchange
    window.addEventListener("popstate", callback);
    window.addEventListener("hashchange", callback);
    return () => {
      window.removeEventListener("popstate", callback);
      window.removeEventListener("hashchange", callback);
    };
  };

  const getSnapshot = () => {
    return window.location.href;
  };

  const push = (url: string) => {
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const replace = (url: string) => {
    window.history.replaceState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const url = useSyncExternalStore(subscribe, getSnapshot);
  return [url, push, replace] as const;
};
