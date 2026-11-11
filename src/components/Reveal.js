import React from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

function Reveal({ children, className = "", delay = 0, as = "div", ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
      {...rest}
    >
      {children}
    </M>
  );
}

export default Reveal;
