import React, { useEffect, useRef } from 'react';
import useDidUpdateEffect from '../../common-hoooks/use-did-update-hooks';
import useTimeout from '../../common-hoooks/use-timeout';
import useToggle from '../../common-hoooks/use-toggle';

const Toast = ({
  time, children, hideImmediately = false
}) => {
  const ref = useRef();
  ref.current = children;

  const { toggler } = useToggle({
    onToggle: (shouldHide) => {
      ref.current = shouldHide ? null : ref.current;
    },
    defaultValue: hideImmediately
  })

  useDidUpdateEffect(() => {
    toggler();
  }, [hideImmediately]);

  useTimeout(() => {
    toggler();
  }, [time]);

  return <> {ref.current} </>;
};

export default Toast;
