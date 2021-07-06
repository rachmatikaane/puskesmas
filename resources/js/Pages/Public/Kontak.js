import React from "react";

import Public from "@/Layouts/Public";

export default function Kontak(props) {
  return (
    <Public>
      <section className="bg-informasi">
        <div className="flex items-center gap-4">
          <img src="/assets/icon-fortuna.png" className="max-h-48" />
          <p className="italic text-gray-500 pt-20">
            Anda dapat menghubungi kami melalui:
          </p>
        </div>

        <div className="pr-80 pl-8 grid grid-cols-2 gap-8">
          {props.list_kontak.map((k) => (
            <div className="flex gap-2 items-center" key={k.id}>
              <img src={k.icon} />
              <a href={k.url ?? "#"}>{k.isi}</a>
            </div>
          ))}
        </div>
      </section>
    </Public>
  );
}
