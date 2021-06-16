import React from "react";

export default function Button({
  type = "submit",
  className = "",
  processing,
  disabled = false,
  children,
  handleClick,
}) {
  return (
    <button
      type={type}
      className={
        `inline-flex justify-center items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase active:bg-gray-900 transition ease-in-out duration-150 text-center${
          processing && "opacity-25"
        } ` + className
      }
      style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      disabled={disabled}
      onClick={(e) => handleClick(e)}
    >
      {children}
    </button>
  );
}
