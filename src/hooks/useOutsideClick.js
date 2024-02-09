import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturingPhase = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturingPhase);

      return () =>
        document.removeEventListener(
          "click",
          handleClick,
          listenCapturingPhase
        );
    },
    [handler, listenCapturingPhase]
  );

  return ref;
}
