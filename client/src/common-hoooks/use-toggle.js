import { useState } from "react";
import useDidUpdateEffect from "./use-did-update-hooks";

export default function useToggle ({
  onToggle,
  defaultValue = false,
}) {
  const [toggle, _setToggle] = useState(defaultValue);
  useDidUpdateEffect(() => {
    onToggle(toggle);
  }, [toggle]);
  const toggler = () => {
    _setToggle((val) => !val)
  };
  return { toggler };
}