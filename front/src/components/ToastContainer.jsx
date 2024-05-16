import React from "react";
import { createPortal } from "react-dom";
import { ToastItem } from "./ToastItem";

export const ToastContainer = ({ toasts }) => {
  return createPortal(
    <div className="absolute right-0 top-0">
      {toasts.map((toast) => {
        return <ToastItem key={toast.id} {...toast} />;
      })}
    </div>,
    document.body
  );
};
