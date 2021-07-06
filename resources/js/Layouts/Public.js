import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function Public(props) {
  return (
    <main className="bg-gray-50 min-h-screen">
      <header className="flex justify-between p-4 items-center">
        <h1 className="font-charm font-bold text-4xl">Puskesmas Ciwaruga</h1>
        <nav className="pr-10">
          <ul className="flex gap-4 items-center">
            <InertiaLink
              as="li"
              href={route("informasi")}
              className={`cursor-pointer hover:text-primary border-primary ${
                route().current("informasi") ||
                window.location.href.includes("informasi")
                  ? "border-b-2"
                  : ""
              }`}
            >
              Informasi
            </InertiaLink>
            <InertiaLink
              as="li"
              href={route("kontak")}
              className={`cursor-pointer hover:text-primary border-primary ${
                route().current("kontak") ||
                window.location.href.includes("kontak")
                  ? "border-b-2"
                  : ""
              }`}
            >
              Kontak
            </InertiaLink>
          </ul>
        </nav>
      </header>
      {props.children}
    </main>
  );
}
