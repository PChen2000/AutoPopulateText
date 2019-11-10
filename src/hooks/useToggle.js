import React, { useState } from "react";

// returns a function which calls all the given functions
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

function useToggle(initialOn = false) {
  const [on, setOn] = useState(initialOn);
  const toggle = () => setOn(!on);
  return { on, toggle };
}

function useToggleWithPropGetter(initialOn) {
  const { on, toggle } = useToggle(initialOn);
  const getTogglerProps = (props = {}) => ({
    "aria-expanded": on,
    tabIndex: 0,
    ...props,
    onClick: callAll(props.onClick, toggle)
  });
  return { on, toggle, getTogglerProps };
}
