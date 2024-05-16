import React, { createContext, useReducer } from "react";
import { ToastContainer } from "../components/ToastContainer";
import { toastReducer } from "../reducers/toastReducer";

export const ToastContext = createContext();

const initialState = {
  toasts: [],
};

export const ToastContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type, message) => {
    const id = Math.floor(Math.random() * 1000000);
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
  };

  const success = (message) => {
    addToast("success", message);
  };
  const warning = (message) => {
    addToast("warning", message);
  };
  const error = (message) => {
    addToast("error", message);
  };
  const info = (message) => {
    addToast("info", message);
  };
  const remove = (id) => {
    dispatch({ type: "DELETE_TOAST", payload: id });
  };

  const value = { success, warning, error, info, remove };

  return (
    <ToastContext.Provider value={value}>
      <ToastContainer toasts={state.toasts} />
      {children}
    </ToastContext.Provider>
  );
};
