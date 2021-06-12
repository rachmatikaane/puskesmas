import React from "react";

export default function ValidationErrors({ errors }) {
  return (
    Object.keys(errors).length > 0 && (
      <div className="text-sm text-red-600">
        {Object.keys(errors).map(function (key, index) {
          return <span key={index}>{errors[key]}</span>;
        })}
      </div>
    )
  );
}
