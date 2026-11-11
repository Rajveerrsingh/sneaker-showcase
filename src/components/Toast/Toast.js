import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../../context/StoreContext";
import "./Toast.css";

function Toast() {
  const { toast } = useStore();

  return (
    <div className="toast-region" role="status" aria-live="polite">
      <AnimatePresence mode="popLayout">
        {toast && (
          <motion.div
            key={toast.key}
            className="toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {toast.image && <img src={toast.image} width="640" height="480" alt="" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Toast;
