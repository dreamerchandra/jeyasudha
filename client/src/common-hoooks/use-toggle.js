import { useState, useRef } from "react";
import useDidUpdateEffect from "./use-did-update-hooks";

export default function useToggle ({
  onToggle,
  defaultValue = false,
}) {
  const [toggle, _setToggle] = useState(defaultValue);
  const onToggleRef = useRef(onToggle);
  useDidUpdateEffect(onToggleRef.current.bind(null, toggle), [toggle]);
  const toggler = () => _setToggle((val) => !val);
  return { toggler };
}