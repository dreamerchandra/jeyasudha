import { useRef, useEffect, createRef } from "react";

const useDidUpdateEffect = (func, deps) => {
  const didMount = useRef(false);
  const funcRef = createRef();
  funcRef.current = func;
  useEffect(() => {
    if (didMount.current) funcRef.current();
    else didMount.current = true;
  }, deps);
};

export default useDidUpdateEffect;