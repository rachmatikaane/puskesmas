import React, { useEffect, useRef } from "react";

export default function Input({
  type = "text",
  name,
  value,
  className,
  placeholder,
  autoComplete,
  required,
  isFocused,
  handleChange,
  maxLength,
  disabled,
  id,
  step,
  min,
  max,
}) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start">
      <input
        id={id}
        step={step}
        type={type}
        name={name}
        value={value}
        className={
          `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
          className
        }
        ref={input}
        autoComplete={autoComplete}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        min={min}
        max={max}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
