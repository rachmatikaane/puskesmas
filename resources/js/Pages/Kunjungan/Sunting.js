import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import Select from "react-select";

import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import MySelect from "@/Components/Select";
import { formatDate } from "@/Utilities/misc";

export default function SuntingKunjungan(props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    id_nomor_antrian: props.kunjungan.id_nomor_antrian,
    id_pasien: props.kunjungan.id_pasien,
    id_pelayanan: props.kunjungan.pegawai.id_pelayanan,
    id_pegawai: props.kunjungan.id_pegawai,
    jenis_pembayaran: props.kunjungan.jenis_pembayaran,
  });
  const [selectedPelayanan, setSelectedPelayanan] = React.useState(
    props.list_pelayanan.find((p) => p.id == data.id_pelayanan)
  );

  React.useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const onHandleChange = (event) => {
    event.target
      ? setData(event.target.name, event.target.value)
      : setData(event.name, event.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(
      route("kunjungan.update", {
        id_kunjungan: props.kunjungan.id,
      })
    );
  };

  React.useEffect(() => {
    setSelectedPelayanan(
      props.list_pelayanan.find((p) => p.id == data.id_pelayanan)
    );
  }, [data.id_pelayanan]);

  React.useEffect(() => {
    const defaultPegawai = props.kunjungan.id_pegawai
      ? props.kunjungan.id_pegawai
      : selectedPelayanan && selectedPelayanan.pegawai.length > 0
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
              defaultValue={props.list_antrian.map((a) =>
                a.id === data.id_nomor_antrian
                  ? {
                      label: `${a.no} • ${formatDate(a.tanggal)}`,
                      name: "id_nomor_antrian",
                      value: a.id,
                    }
                  : false
              )}
              placeholder="Pilih..."
              noOptionsMessage={() => "Tidak ditemukan"}
              className="block w-full"
              onChange={onHandleChange}
              required={true}
              options={[
                ...props.list_antrian.map((a) => ({
                  label: `${a.no} • ${formatDate(a.tanggal)}`,
                  name: "id_nomor_antrian",
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
              defaultValue={props.list_pasien.map((p) =>
                p.id === data.id_pasien
                  ? {
                      label: `${p.nik} • ${p.nama}`,
                      name: "id_pasien",
                      value: p.id,
                    }
                  : false
              )}
              placeholder="Pilih..."
              noOptionsMessage={() => "Tidak ditemukan"}
              className="block w-full"
              onChange={onHandleChange}
              required={true}
              options={[
                ...props.list_pasien.map((p) => ({
                  label: `${p.nik} • ${p.nama}`,
                  name: "id_pasien",
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
              defaultValue={props.list_pelayanan.map((p) =>
                p.id === data.id_pelayanan
                  ? {
                      label: p.nama,
                      name: "id_pelayanan",
                      value: p.id,
                    }
                  : false
              )}
              placeholder="Pilih..."
              noOptionsMessage={() => "Tidak ditemukan"}
              className="block w-full"
              onChange={onHandleChange}
              required={true}
              options={[
                ...props.list_pelayanan.map((p) => ({
                  label: p.nama,
                  name: "id_pelayanan",
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
              defaultValue={
                selectedPelayanan && selectedPelayanan.pegawai.length > 0
                  ? selectedPelayanan.pegawai.map((p) =>
                      p.id == data.id_pegawai
                        ? {
                            label: p.nama,
                            name: "id_pegawai",
                            value: p.id,
                          }
                        : false
                    )
                  : []
              }
              placeholder="Pilih..."
              noOptionsMessage={() => "Tidak ditemukan"}
              className="block w-full"
              onChange={onHandleChange}
              required={true}
              options={
                selectedPelayanan
                  ? selectedPelayanan.pegawai.map((p) => ({
                      label: p.nama,
                      name: "id_pegawai",
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

            <MySelect
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
