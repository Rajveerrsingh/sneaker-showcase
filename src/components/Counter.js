import React, { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// counts up from 0 when it scrolls into view
function Counter({ to, duration = 1.4, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const c = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
      onComplete: () => setVal(to)
    });
    return () => {
      c.stop();
      setVal(to);
    };
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      <span aria-hidden="true">
        {val}
        {suffix}
      </span>
    </span>
  );
}

export default Counter;
