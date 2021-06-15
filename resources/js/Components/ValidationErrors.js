import React from "react";

export default function ValidationErrors({ errors }) {
  return (
    Object.keys(errors).length > 0 && (
      <ul className="text-sm text-red-600 list-disc ml-4">
        {Object.keys(errors).map(function (key, index) {
          return <li key={index}>{errors[key]}</li>;
        })}
      </ul>
    )
  );
}
