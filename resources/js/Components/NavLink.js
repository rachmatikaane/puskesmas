import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";

export default function NavLink({
  href,
  check = "",
  src,
  text,
  extra = false,
}) {
  return (
    <InertiaLink
      href={route(href)}
      className={`nav-item flex gap-4 items-center w-full text-xs ${
        route().current(check || href) ||
        (extra && window.location.href.includes(check || href))
          ? "active"
          : ""
      }`}
    >
      <img src={`/assets/${src}`} className="nav-img" />
      <span>{text}</span>
    </InertiaLink>
  );
}
