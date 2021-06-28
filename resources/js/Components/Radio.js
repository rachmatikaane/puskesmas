import React from "react";

export default function Radio({ id, name, value, checked, label, onChange }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label for={id}>{label}</label>
    </div>
  );
}
