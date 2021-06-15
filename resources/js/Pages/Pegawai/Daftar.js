import Authenticated from "@/Layouts/Authenticated";
import React from "react";

export default function DaftarPegawai(props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg grid gap-4">
            <div className="p-6 bg-white border-b border-gray-200">
              Daftar Pegawai
              {props.list_pegawai.map((p) => (
                <p key={p.id}>{p.nama}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
