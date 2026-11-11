import React from "react";
import { useStore } from "../store";

function Toast() {
  const { toast } = useStore();
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.key}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Toast;
