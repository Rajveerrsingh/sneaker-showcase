import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../store";

function Toast() {
  const { toast } = useStore();
  return (
    <div className="toast-region" role="status" aria-live="polite">
      <AnimatePresence mode="popLayout">
        {toast && (
          <motion.div
            className="toast"
            key={toast.key}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            {toast.image && <img src={toast.image} alt="" />}
            <span>{toast.message}</span>
            <span className="toast-bar" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Toast;
