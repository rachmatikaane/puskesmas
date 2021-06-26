import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import Select from "@/Components/Select";
import { formatDate } from "@/Utilities/misc";

export default function TambahKunjungan(props) {
  const [selectedPelayanan, setSelectedPelayanan] = React.useState(null);
  const { data, setData, post, processing, errors, reset } = useForm({
    id_nomor_antrian: props.id_nomor_antrian ?? "",
    id_pasien: props.id_pasien ?? "",
    id_pelayanan: "",
    id_pegawai: "",
    jenis_pembayaran: "Umum",
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

    post(route("kunjungan.store"));
  };

  React.useEffect(() => {
    setSelectedPelayanan(
      props.list_pelayanan.find((p) => p.id == data.id_pelayanan)
    );
  }, [data.id_pelayanan]);

  React.useEffect(() => {
    const defaultPegawai =
      selectedPelayanan && selectedPelayanan.pegawai.length > 0
        ? selectedPelayanan.pegawai[0].id
        : undefined;

    setData("id_pegawai", defaultPegawai);
  }, [selectedPelayanan]);

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
        <fieldset className="border border-solid border-black px-8 py-4 flex flex-col gap-4">
          <legend className="text-lg -ml-4">Tambah Kunjungan</legend>
          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="id_nomor_antrian" value="Nomor Antrian" />

            <Select
              name="id_nomor_antrian"
              value={data.id_nomor_antrian}
              className="block w-full"
              autoComplete="id_nomor_antrian"
              handleChange={onHandleChange}
              required={true}
              options={[
                {
                  text: "-- Pilih --",
                  value: "",
                },
                ...props.list_antrian.map((a) => ({
                  text: `${a.no} | ${formatDate(a.tanggal)}`,
                  value: a.id,
                })),
              ]}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="id_pasien" value="Pasien" />

            <Select
              name="id_pasien"
              value={data.id_pasien}
              className="block w-full"
              autoComplete="id_pasien"
              handleChange={onHandleChange}
              required={true}
              options={[
                {
                  text: "-- Pilih --",
                  value: "",
                },
                ...props.list_pasien.map((p) => ({
                  text: `${p.nik} | ${p.nama}`,
                  value: p.id,
                })),
              ]}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="id_pelayanan" value="Layanan" />

            <Select
              name="id_pelayanan"
              value={data.id_pelayanan}
              className="block w-full"
              autoComplete="id_pelayanan"
              handleChange={onHandleChange}
              required={true}
              options={[
                {
                  text: "-- Pilih --",
                  value: "",
                },
                ...props.list_pelayanan.map((p) => ({
                  text: p.nama,
                  value: p.id,
                })),
              ]}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="id_pegawai" value="Dokter" />

            <Select
              name="id_pegawai"
              value={data.id_pegawai}
              className="block w-full"
              autoComplete="id_pegawai"
              handleChange={onHandleChange}
              required={true}
              options={
                selectedPelayanan
                  ? selectedPelayanan.pegawai.map((p) => ({
                      text: p.nama,
                      value: p.id,
                    }))
                  : []
              }
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="jenis_pembayaran" value="Jenis Pembayaran" />

            <Select
              name="jenis_pembayaran"
              value={data.jenis_pembayaran}
              className="block w-full"
              autoComplete="jenis_pembayaran"
              handleChange={onHandleChange}
              required={true}
              options={[
                { text: "Umum", value: "Umum" },
                { text: "BPJS", value: "BPJS" },
              ]}
            />
          </div>
        </fieldset>
        <div className="flex gap-4 justify-center">
          <Button type="submit" className="bg-green-500 hover:bg-green-700">
            Simpan
          </Button>
          <InertiaLink href={route("layanan")}>
            <Button className="bg-gray-500 hover:bg-gray-700">Batal</Button>
          </InertiaLink>
        </div>
      </form>
    </Authenticated>
  );
}
