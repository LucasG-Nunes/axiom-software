import { useCallback, useSyncExternalStore } from "react";

/** Assina uma media query. `serverValue` é o valor usado no servidor/hidratação. */
export function useMediaQuery(query: string, serverValue = true) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
