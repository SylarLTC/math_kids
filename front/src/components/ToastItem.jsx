import React, { useEffect, useRef, useCallback } from "react";
import { useToast } from "../hooks/useToast";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BiSolidError } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";

const toastType = {
  success: {
    icon: <FaRegCircleCheck className="text-[#22c55e]" />,
    progressBar: "bg-[#22c55e]",
  },
  info: {
    icon: <IoAlertCircleOutline className="text-[#f97316]" />,
    progressBar: "bg-[#f97316]",
  },
  warning: {
    icon: <IoIosInformationCircleOutline className="text-[#3b82f6]" />,
    progressBar: "bg-[#3b82f6]",
  },
  error: {
    icon: <BiSolidError className="text-[#ef4444]" />,
    progressBar: "bg-[#ef4444]",
  },
};

export const ToastItem = ({ message, id, type }) => {
  const { icon, progressBar } = toastType[type];
  const toast = useToast();
  const timerID = useRef(null);

  const handleDismiss = useCallback(() => {
    toast.remove(id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss();
    }, 4000);

    return () => {
      clearTimeout(timerID.current);
    };
  }, [handleDismiss]);

  return (
    <div className="flex w-[280px] mt-[16px] mr-[16px] relative p-[16px] border-[1px] border-solid border-[#d7d7d7] rounded-[8px] bg-white shadow-[0px_4px_10px_0px_#d7d7d7] text-[#494e5c]">
      <span>{icon}</span>
      <p className="ml-[8px] text-[14px] font-medium text-[#151626]">
        {message}
      </p>
      <button
        className="absolute top-1 right-2 text-[14px]"
        onClick={() => handleDismiss}
      >
        <span>
          <MdOutlineCancel size={18} className="text-[#aeb0d7]" />
        </span>
      </button>

      {/* Toast Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[4px] w-full bg-[rgba(0,0,0,0.1)]">
        <div className={`h-full animate-progressBar ${progressBar}`}></div>
      </div>
    </div>
  );
};
