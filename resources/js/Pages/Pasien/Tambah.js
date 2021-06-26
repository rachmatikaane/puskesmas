import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Select from "@/Components/Select";

export default function TambahPasien(props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    id_nomor_antrian: props.id_nomor_antrian ?? "",
    nik: "",
    no_rekam_medis: "",
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "01-01-2010",
    jenis_kelamin: "L",
    gol_darah: undefined,
    alamat: undefined,
    kecamatan: undefined,
    kelurahan: undefined,
    kota: undefined,
    provinsi: undefined,
    kontak: undefined,
    pekerjaan: undefined,
    status_menikah: undefined,
    no_bpjs: undefined,
  });

  React.useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("pasien.store"));
  };

  return (
    <Authenticated
      auth={props.auth}
      header="bg-crud"
      errors={props.errors}
      message={props.message ?? ""}
    >
      <form
        onSubmit={submit}
        className="px-8 py-4 flex flex-col gap-4 w-full lg:w-3/4"
      >
        <input
          type="hidden"
          name="id_nomor_antrian"
          value={props.id_nomor_antrian}
        />
        <fieldset className="border border-solid border-black px-8 py-4 flex flex-col gap-4">
          <legend className="text-lg -ml-4">Tambah Data Pasien</legend>
          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="nik" value="NIK*" />

            <Input
              type="text"
              name="nik"
              value={data.nik}
              className="block w-full"
              autoComplete="nik"
              isFocused={true}
              handleChange={onHandleChange}
              maxLength={16}
              required
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="no_rekam_medis" value="No Rekam Medis*" />

            <Input
              type="text"
              name="no_rekam_medis"
              value={data.no_rekam_medis}
              className="block w-full"
              autoComplete="no_rekam_medis"
              isFocused={true}
              handleChange={onHandleChange}
              required
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="nama" value="Nama*" />

            <Input
              type="text"
              name="nama"
              value={data.nama}
              className="block w-full"
              autoComplete="nama"
              handleChange={onHandleChange}
              required
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="tempat_lahir" value="Tempat/Tanggal Lahir*" />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="tempat_lahir"
                value={data.tempat_lahir}
                className="block w-full"
                autoComplete="tempat_lahir"
                handleChange={onHandleChange}
                required
              />
              <Input
                type="date"
                name="tanggal_lahir"
                value={data.tanggal_lahir}
                className="block w-full"
                autoComplete="tempat_lahir"
                handleChange={onHandleChange}
                required
              />
            </div>
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="jenis_kelamin" value="Jenis Kelamin*" />

            <Select
              name="jenis_kelamin"
              value={data.jenis_kelamin}
              className="block w-full"
              autoComplete="jenis_kelamin"
              handleChange={onHandleChange}
              required
              options={[
                { text: "Laki - laki", value: "L" },
                { text: "Perempuan", value: "P" },
              ]}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="gol_darah" value="Golongan Darah" />

            <Select
              name="gol_darah"
              value={data.gol_darah}
              className="block w-full"
              autoComplete="gol_darah"
              handleChange={onHandleChange}
              options={[
                { text: "-- Pilih --", value: "" },
                { text: "A", value: "A" },
                { text: "B", value: "B" },
                { text: "AB", value: "AB" },
                { text: "O", value: "O" },
              ]}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="alamat" value="Alamat" />

            <Input
              type="text"
              name="alamat"
              value={data.alamat}
              className="block w-full"
              autoComplete="alamat"
              handleChange={onHandleChange}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="kelurahan" value="Kelurahan" />

            <Input
              type="text"
              name="kelurahan"
              value={data.kelurahan}
              className="block w-full"
              autoComplete="kelurahan"
              handleChange={onHandleChange}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="kecamatan" value="Kecamatan" />

            <Input
              type="text"
              name="kecamatan"
              value={data.kecamatan}
              className="block w-full"
              autoComplete="kecamatan"
              handleChange={onHandleChange}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="kota" value="Kota" />

            <Input
              type="text"
              name="kota"
              value={data.kota}
              className="block w-full"
              autoComplete="kota"
              handleChange={onHandleChange}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="provinsi" value="Provinsi" />

            <Input
              type="text"
              name="provinsi"
              value={data.provinsi}
              className="block w-full"
              autoComplete="provinsi"
              handleChange={onHandleChange}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="kontak" value="Kontak" />

            <Input
              type="text"
              name="kontak"
              value={data.kontak}
              className="block w-full"
              autoComplete="kontak"
              handleChange={onHandleChange}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="pekerjaan" value="Pekerjaan" />

            <Input
              type="text"
              name="pekerjaan"
              value={data.pekerjaan}
              className="block w-full"
              autoComplete="pekerjaan"
              handleChange={onHandleChange}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="status_menikah" value="Status Menikah" />

            <Select
              name="status_menikah"
              value={data.status_menikah}
              className="block w-full"
              autoComplete="status_menikah"
              handleChange={onHandleChange}
              options={[
                { text: "-- Pilih --", value: "" },
                { text: "Belum Kawin", value: "Belum Kawin" },
                { text: "Kawin", value: "Kawin" },
                { text: "Cerai Hidup", value: "Cerai Hidup" },
                { text: "Cerai Mati", value: "Cerai Mati" },
              ]}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="no_bpjs" value="No BPJS" />

            <Input
              type="text"
              name="no_bpjs"
              value={data.no_bpjs}
              className="block w-full"
              autoComplete="no_bpjs"
              handleChange={onHandleChange}
            />
          </div>
        </fieldset>
        <div className="flex gap-4 justify-center">
          <Button type="submit" className="bg-green-500 hover:bg-green-700">
            Simpan
          </Button>
          <InertiaLink href={route("pasien")}>
            <Button className="bg-gray-500 hover:bg-gray-700">Batal</Button>
          </InertiaLink>
        </div>
      </form>
    </Authenticated>
  );
}