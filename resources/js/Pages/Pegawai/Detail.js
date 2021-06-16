import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Button from "@/Components/Button";

import { getPeran } from "@/Utilities/misc";

export default function DaftarPegawai(props) {
  const onHandleDelete = (id) => {
    if (window.confirm(`Hapus pegawai?`)) {
      Inertia.delete(`/pegawai/${id}`);
    }
  };

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 w-full lg:w-3/4">
          <div className="flex justify-between">
            <InertiaLink
              href="/pegawai"
              as="button"
              className="p-1 rounded-full hover:bg-gray-400 w-max"
            >
              <img src="/assets/back-rounded.svg" className="w-9 h-9" />
            </InertiaLink>
            <InertiaLink href="/pegawai/tambah">
              <Button className="flex gap-2 w-max bg-primary hover:bg-opacity-75">
                <img src="/assets/user-create.svg" className="w-9" />
                Tambah Data
              </Button>
            </InertiaLink>
          </div>

          <fieldset className="border border-solid border-black px-8 py-4 flex flex-col m-auto gap-4">
            <legend className="text-lg -ml-4">Data Pegawai</legend>
            <div className="flex justify-end gap-2">
              <InertiaLink
                href={`/pegawai/${props.pegawai.id}`}
                as="button"
                className="p-1 bg-yellow-400 hover:bg-opacity-75"
              >
                <img src="/assets/edit-white.svg" />
              </InertiaLink>

              <button
                onClick={() => onHandleDelete(props.pegawai.id)}
                className="p-1 bg-red-400 hover:bg-opacity-75"
              >
                <img src="/assets/delete-white.svg" />
              </button>
            </div>
            <div
              className="flex gap-8 items-start"
              style={{ gridTemplateColumns: "152px auto" }}
            >
              <ApplicationLogo fill="#75A19D" className="w-24 lg:w-32" />
              <div className="flex flex-col gap-2 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-4">
                  <p className="font-bold">ID</p>
                  <p className="col-span-3">{props.pegawai.id}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4">
                  <p className="font-bold">Nama</p>
                  <p className="col-span-3">{props.pegawai.nama}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4">
                  <p className="font-bold">Jabatan</p>
                  <p className="col-span-3">{props.pegawai.jabatan}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4">
                  <p className="font-bold">Bagian</p>
                  <p className="col-span-3">
                    {`${getPeran(props.pegawai.pengguna.peran)} ${
                      props.pegawai.pelayanan
                        ? `(${props.pegawai.pelayanan.nama})`
                        : ""
                    }`}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4">
                  <p className="font-bold">Username</p>
                  <p className="col-span-3">
                    {props.pegawai.pengguna.username}
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </Authenticated>
  );
}
