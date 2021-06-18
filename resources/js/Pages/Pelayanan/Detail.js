import React from "react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, CartesianGrid } from "recharts";
import { InertiaLink } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";

function PasienCard({ icon, text, value }) {
  return (
    <div className="flex gap-2">
      <img src={`/assets/${icon}`} className="bg-secondary p-1 w-12" />
      <div className="text-center w-full">
        <p className="text-4xl font-bold m-0 p-0">{value}</p>
        <p className="font-light text-xs">{text}</p>
      </div>
    </div>
  );
}

export default function DaftarPegawai(props) {
  const data = props.pasien_5_bulan.map((p) => ({
    name: p.name,
    "Jumlah Pasien": p.value,
  }));

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4">
          <section className="flex justify-between">
            <InertiaLink
              href="/layanan"
              as="button"
              className="p-1 rounded-full hover:bg-gray-400 w-max"
            >
              <img src="/assets/back-rounded.svg" className="w-9 h-9" />
            </InertiaLink>
            <InertiaLink href="/layanan/tambah">
              <Button className="flex gap-2 w-max bg-primary hover:bg-opacity-75">
                Tambah Data
              </Button>
            </InertiaLink>
          </section>
          <section className="shadow-sm bg-secondary rounded-md p-4 grid lg:grid-cols-4 gap-4 h-64">
            <div className="hidden col-span-3 lg:block">
              <h1 className="text-center">
                Jumlah pasien di <strong>{props.layanan.nama}</strong> dalam{" "}
                {props.pasien_5_bulan.length} bulan terakhir
              </h1>
              <BarChart width={730} height={200} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Jumlah Pasien" fill="#569589" />
              </BarChart>
            </div>
            <div className="shadow-sm bg-white rounded-md p-4 flex flex-col justify-center gap-2">
              <PasienCard
                icon="pasien-hari.svg"
                text="Pasien hari ini"
                value={props.pasien_hari}
              />
              <PasienCard
                icon="pasien-bulan.svg"
                text="Pasien bulan ini"
                value={props.pasien_bulan}
              />
              <PasienCard
                icon="pasien-tahun.svg"
                text="Pasien tahun ini"
                value={props.pasien_tahun}
              />
            </div>
          </section>

          <section className="shadow-sm bg-secondary rounded-md p-4 bg-dokter h-52">
            <h2 className="font-bold font-xl">Tenaga Medis</h2>
            <ul className="list-disc grid ml-4 lg:grid-cols-2">
              {props.layanan.pegawai.map((p) => (
                <li key={p.id}>
                  {p.nama} ({p.jabatan})
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Authenticated>
  );
}
