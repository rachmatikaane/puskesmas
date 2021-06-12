import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";

export default function NavLink({ title, menus }) {
  return (
    <div>
      <h1 className="text-center p-2 text-xl border-b border-gray-600">
        {title}
      </h1>
      <ul className="flex flex-col">
        {menus.map((m) => (
          <InertiaLink
            href={route(m.href)}
            className={`submenu px-4 py-2 cursor-pointer hover:bg-white hover:text-black ${
              route().current(m.href) ? "active" : ""
            }`}
            key={m.text}
          >
            {m.text}
          </InertiaLink>
        ))}
      </ul>
    </div>
  );
}
