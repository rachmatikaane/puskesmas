import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { toast } from "react-toastify";

import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Input";

export default function Antrian(props) {
  const [batas, setBatas] = React.useState(localStorage.getItem("batas") ?? 50);
  const handleBatasChange = (e) => {
    setBatas(e.target.value);
    localStorage.setItem("batas", e.target.value);
  };
  const ambilAntrian = () => {
    if (props.antrian + 1 > batas) {
      toast.error("Nomor antrian sudah mencapai batas untuk hari ini");
      return;
    }

    if (window.confirm(`Ambil nomor antrian ${props.antrian + 1}?`)) {
      Inertia.post(`/antrian/ambil`);
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
          <section className="p-6 bg-red-600 border-b border-gray-200 shadow-sm rounded-md flex gap-4">
            <div className="flex flex-col items-center w-full">
              <h1 className="font-bold text-9xl">{props.antrian + 1}</h1>
              <p className="font-light text-lg">
                Nomor antrian yang akan diambil
              </p>
            </div>

            <button
              className="shadow-md border p-2 bg-gray-400 hover:bg-gray-500"
              onClick={() => ambilAntrian()}
            >
              <img src="/assets/ambil-antrian.svg" />
            </button>
          </section>

          <section className="grid grid-cols-4 gap-4">
            <section className="p-6 bg-yellow-600 border-b border-gray-200 shadow-sm rounded-md text-center">
              <h2 className="font-bold text-5xl">{props.berlangsung}</h2>
              <p className="text-sm">Jumlah antrian yang sedang berlangsung</p>
            </section>
            <section className="p-6 bg-green-600 border-b border-gray-200 shadow-sm rounded-md text-center">
              <h2 className="font-bold text-5xl">{props.selesai}</h2>
              <p className="text-sm">Jumlah antrian yang sudah selesai</p>
            </section>
          </section>
          <section className="grid grid-cols-2 gap-4">
            <section className="p-6 bg-blue-600 border-b border-gray-200 shadow-sm rounded-md text-center flex flex-col items-center">
              <Input
                value={batas}
                name="batas"
                handleChange={handleBatasChange}
                className="text-black text-5xl text-center w-48"
              />
              Batas nomor hari ini
            </section>
          </section>
        </div>
      </div>
    </Authenticated>
  );
}
