import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow hidden lg:block">
      <div className="max-w-7xl mx-auto p-4 flex gap-4">
        <img src="/assets/puskesmas.png" className="w-10" />
        <div>
          <h1 className="text-xl uppercase font-bold font-arya">
            Puskesmas Ciwaruga
          </h1>
          <p className="text-xs">
            Jl. Waruga Raya No 4. Telp (+62) 212-020-3681
          </p>
        </div>
      </div>
    </header>
  );
}
