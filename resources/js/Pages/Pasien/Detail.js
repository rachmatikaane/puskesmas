import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Button from "@/Components/Button";

import { formatDate, getJK, getPeran } from "@/Utilities/misc";

export default function DetailPasien(props) {
  const onHandleDelete = (id) => {
    if (window.confirm(`Hapus pasien?`)) {
      Inertia.delete(`/pasien/${id}`);
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
              href="/pasien"
              as="button"
              className="p-1 rounded-full hover:bg-gray-400 w-max"
            >
              <img src="/assets/back-rounded.svg" className="w-9 h-9" />
            </InertiaLink>
            <InertiaLink href="/pasien/tambah">
              <Button className="flex gap-2 w-max bg-primary hover:bg-opacity-75">
                <img src="/assets/user-create.svg" className="w-9" />
                Tambah Data
              </Button>
            </InertiaLink>
          </div>

          <fieldset className="border border-solid border-black px-8 py-4 flex flex-col m-auto gap-4">
            <legend className="text-lg -ml-4">Data Pasien</legend>
            <div className="flex justify-end gap-2">
              <InertiaLink
                href={`/pasien/${props.pasien.id}`}
                as="button"
                className="p-1 bg-yellow-400 hover:bg-opacity-75"
              >
                <img src="/assets/edit-white.svg" />
              </InertiaLink>

              <button
                onClick={() => onHandleDelete(props.pasien.id)}
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
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">ID</p>
                  <p className="col-span-3">{props.pasien.id}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">NIK</p>
                  <p className="col-span-3">{props.pasien.nik}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">No Rekam Medis</p>
                  <p className="col-span-3">
                    {props.pasien.no_rekam_medis ?? "-"}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">No BPJS</p>
                  <p className="col-span-3">{props.pasien.no_bpjs ?? "-"}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">Nama</p>
                  <p className="col-span-3">{props.pasien.nama}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">TTL</p>
                  <p className="col-span-3">{`${
                    props.pasien.tempat_lahir
                  }, ${formatDate(props.pasien.tanggal_lahir)}`}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">Golongan Darah</p>
                  <p className="col-span-3">{props.pasien.gol_darah ?? "-"}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">Status Menikah</p>
                  <p className="col-span-3">
                    {props.pasien.status_menikah ?? "-"}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">Pekerjaan</p>
                  <p className="col-span-3">{props.pasien.pekerjaan ?? "-"}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">Jenis Kelamin</p>
                  <p className="col-span-3">
                    {getJK(props.pasien.jenis_kelamin)}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">Alamat</p>
                  <p className="col-span-3">{`${props.pasien.alamat ?? ""}${
                    props.pasien.kelurahan ? `, ${props.pasien.kelurahan}` : ""
                  }${
                    props.pasien.kecamatan ? `, ${props.pasien.kecamatan}` : ""
                  }${props.pasien.kota ? `, ${props.pasien.kota}` : ""}${
                    props.pasien.provinsi ? `, ${props.pasien.provinsi}` : ""
                  }`}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <p className="font-bold col-span-2">Kontak</p>
                  <p className="col-span-3">{props.pasien.kontak ?? "-"}</p>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </Authenticated>
  );
}
