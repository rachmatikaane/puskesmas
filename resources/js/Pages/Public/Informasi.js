import React from "react";

import Public from "@/Layouts/Public";

export default function Informasi(props) {
  return (
    <Public>
      <section className="bg-informasi">
        <img src="/assets/icon-fortuna.png" className="max-h-48" />
        <div className="pl-8 grid gap-8">
          <h1 className="font-fredoka font-bold text-8xl">
            Puskesmas <br /> Ciwaruga
          </h1>
          <p className="font-sans text-4xl">
            Pusat kesehatan masyarakat <br /> kepercayaan anda
          </p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-8 p-4">
        {props.list_jadwal.map((jadwal) => (
          <div key={jadwal.id} className="flex gap-4 items-center">
            <img src="/assets/jadwal.svg" />
            <p>
              {jadwal.hari} <br />
              {!jadwal.libur
                ? `(${jadwal.jam_mulai} - ${jadwal.jam_selesai})`
                : "Libur"}
            </p>
          </div>
        ))}

        <div className="flex gap-4 items-center">
          <img src="/assets/poli.svg" />
          <div className="grid">
            {props.list_pelayanan.map((pelayanan) => (
              <p>{pelayanan.nama}</p>
            ))}
          </div>
        </div>
      </section>
    </Public>
  );
}
