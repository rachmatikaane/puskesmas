import React from "react";
import { Inertia } from "@inertiajs/inertia";

import Authenticated from "@/Layouts/Authenticated";

export default function AntrianPendaftar(props) {
  const [antrian, setAntrian] = React.useState(
    props.antrian.filter((a) => a.status === 0)
  );

  const skip = () => {
    if (
      antrian.length > 0 &&
      window.confirm(`Lewat nomor antrian ${antrian[0].no}?`)
    ) {
      Inertia.post(
        route("antrian.skip", {
          id_nomor_antrian: antrian[0].id,
        })
      );
    }
  };

  const pasienBaru = () => {
    if (antrian.length > 0) {
      Inertia.get(
        route("pasien.createWithAntrian", {
          id_nomor_antrian: antrian[0].id,
        })
      );
    }
  };

  const kunjungan = () => {
    if (antrian.length > 0) {
      Inertia.get(
        route("kunjungan.createWithAntrian", {
          id_nomor_antrian: antrian[0].id,
        })
      );
    }
  };

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
      header="bg-antrian"
    >
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-white flex flex-col gap-4">
          <section
            className={`p-6 ${
              antrian.length > 0 ? "bg-red-600" : "bg-green-600"
            } border-b border-gray-200 shadow-sm rounded-md flex gap-4`}
          >
            <div className="flex flex-col items-center w-full">
              <h1 className="font-bold text-9xl">
                {antrian.length > 0
                  ? antrian[0].no
                  : props.antrian.length > 0
                  ? props.antrian[props.antrian.length - 1].no
                  : 0}
                /{props.antrian.length}
              </h1>
              <p className="font-light text-lg">Nomor antrian saat ini</p>
            </div>
          </section>

          <section className="grid grid-cols-3 gap-4">
            <button
              onClick={() => skip()}
              className="p-6 bg-red-600 border-b border-gray-200 shadow-sm rounded-md text-center hover:bg-red-800"
            >
              <h2 className="text-lg">Lewat</h2>
            </button>
            <button
              onClick={() => pasienBaru()}
              className="p-6 bg-yellow-600 border-b border-gray-200 shadow-sm rounded-md text-center hover:bg-yellow-800"
            >
              <h2 className="text-lg">Pasien baru</h2>
            </button>
            <button
              onClick={() => kunjungan()}
              className="p-6 bg-green-600 border-b border-gray-200 shadow-sm rounded-md text-center hover:bg-green-800"
            >
              <h2 className="text-lg">Tambah kunjungan</h2>
            </button>
          </section>
        </div>
      </div>
    </Authenticated>
  );
}
