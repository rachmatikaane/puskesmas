import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import Select from "react-select";
import { usePDF } from "@react-pdf/renderer";

import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import PrintDocument from "@/Print/ResepObat";

import { formatDate } from "@/Utilities/misc";

export default function TambahPemeriksaan(props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    anamnesis: "",
    hasil_pemeriksaan: "",
    no_resep: "",
    resep_obat: [
      {
        id: 0,
        id_obat: 0,
        nama: "",
        qty: 0,
        satuan: "kapsul",
        aturan_pakai: "",
      },
    ],
  });

  const [instance, updateInstance] = usePDF({
    document: (
      <PrintDocument
        kunjungan={props.kunjungan}
        kontak={props.kontak}
        pemeriksaan={data}
      />
    ),
  });
  React.useEffect(updateInstance, [data]);

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

  const onResepChange = (name, id, value) => {
    setData(
      "resep_obat",
      data.resep_obat.map((r) => {
        if (id === r.id) {
          r[name] = value;

          if (name === "id_obat") {
            r["satuan"] = props.list_obat.find((o) => o.id === value).satuan;
            r["nama"] = props.list_obat.find((o) => o.id === value).nama;
          }
        }

        return r;
      })
    );
  };

  const submit = (e) => {
    e.preventDefault();

    post(
      route("pemeriksaan.store", {
        id_kunjungan: props.kunjungan.id,
      })
    );
  };

  const addResep = () => {
    const resep = [
      ...data.resep_obat,
      {
        id: data.resep_obat.length,
        id_obat: 0,
        nama: "",
        qty: 0,
        satuan: "kapsul",
        aturan_pakai: "",
      },
    ];
    setData("resep_obat", resep);
  };

  const removeResep = (id) =>
    setData(
      "resep_obat",
      data.resep_obat.filter((r) => r.id !== id)
    );

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <form onSubmit={submit} className="px-8 py-4 flex flex-col gap-5 w-full">
        <h1 className="font-bold text-lg">Tambah Pemeriksaan</h1>

        <table className="w-full">
          <colgroup>
            <col className="w-64" />
            <col className="w-0.5" />
            <col className="w-auto" />
          </colgroup>
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="bg-gray-200 px-4 py-2">1. Data Pasien</td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">Nama Pasien</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">{props.kunjungan.pasien.nama}</td>
            </tr>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">Nomor Rekam Medis</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">
                {props.kunjungan.pasien.no_rekam_medis ?? "-"}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full">
          <colgroup>
            <col className="w-64" />
            <col className="w-0.5" />
            <col className="w-auto" />
          </colgroup>
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="bg-gray-200 px-4 py-2">2. Data Layanan</td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">No. Pendaftaran</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">{props.kunjungan.nomor_antrian.no}</td>
            </tr>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">Tanggal Pemeriksaan</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">
                {formatDate(props.kunjungan.tanggal)}
              </td>
            </tr>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">Poli</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">
                {props.kunjungan.pegawai.pelayanan.nama}
              </td>
            </tr>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">Petugas Medis</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">{props.kunjungan.pegawai.nama}</td>
            </tr>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">Keluhan</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">
                <textarea
                  className={`border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md w-full`}
                  name="anamnesis"
                  value={data.anamnesis}
                  onChange={onHandleChange}
                  required
                ></textarea>
              </td>
            </tr>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">Diagnosa</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">
                <textarea
                  className={`border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md w-full`}
                  name="hasil_pemeriksaan"
                  value={data.hasil_pemeriksaan}
                  onChange={onHandleChange}
                  required
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full">
          <colgroup>
            <col className="w-64" />
            <col className="w-0.5" />
            <col className="w-auto" />
          </colgroup>
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="bg-gray-200 px-4 py-2">3. Resep Obat</td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">No Resep</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">
                <Input
                  type="text"
                  name="no_resep"
                  value={data.no_resep}
                  className="block w-full"
                  autoComplete="no_resep"
                  isFocused={true}
                  handleChange={onHandleChange}
                  required
                />
              </td>
            </tr>
            {data.resep_obat.map((r, i) => (
              <React.Fragment key={r.id}>
                <tr className="border-b-2 border-t-2 border-gray-200">
                  <td className="pl-8 py-2">{i + 1}. Nama Obat</td>
                  <td className="px-4 py-2">:</td>
                  <td className="px-4 py-2">
                    <Select
                      name="id_obat"
                      defaultValue={props.list_obat.map(
                        (obat) =>
                          obat.id === r.id_obat && {
                            label: obat.nama,
                            name: "id_obat",
                            value: obat.id,
                          }
                      )}
                      placeholder="Pilih..."
                      noOptionsMessage={() => "Tidak ditemukan"}
                      className="block w-full"
                      onChange={(e) => onResepChange(e.name, i, e.value)}
                      required={true}
                      options={[
                        ...props.list_obat.map((obat) => ({
                          label: obat.nama,
                          name: "id_obat",
                          value: obat.id,
                        })),
                      ]}
                    />
                  </td>
                </tr>
                <tr className="border-b-2 border-t-2 border-gray-200">
                  <td className="pl-12 py-2">Qty dan Aturan Pakai</td>
                  <td className="px-4 py-2">:</td>
                  <td className="px-4 py-2 flex gap-2 items-center">
                    <Input
                      type="number"
                      name="qty"
                      value={data.resep_obat[i].qty}
                      className="block w-24"
                      autoComplete="id_obat"
                      handleChange={(e) =>
                        onResepChange(e.target.name, i, e.target.value)
                      }
                      required
                    />

                    <Input
                      name="satuan"
                      value={data.resep_obat[i].satuan}
                      className="block w-36"
                      autoComplete="satuan"
                      handleChange={(e) =>
                        onResepChange(e.target.name, i, e.target.value)
                      }
                      disabled={true}
                    />

                    <Input
                      name="aturan_pakai"
                      value={data.resep_obat[i].aturan_pakai}
                      className="block"
                      autoComplete="aturan_pakai"
                      handleChange={(e) =>
                        onResepChange(e.target.name, i, e.target.value)
                      }
                      placeholder="Aturan pakai"
                      required
                    />

                    {i === data.resep_obat.length - 1 && (
                      <Button
                        type="button"
                        handleClick={() => addResep()}
                        className="bg-green-500 hover:bg-green-700 flex gap-2 items-center"
                      >
                        Tambah
                      </Button>
                    )}

                    {i !== 0 && (
                      <Button
                        type="button"
                        handleClick={() => removeResep(r.id)}
                        className="bg-red-500 hover:bg-red-700 flex gap-2 items-center"
                      >
                        Hapus
                      </Button>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="flex gap-4 justify-end">
          <Button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-700 flex gap-2 items-center"
          >
            <img src="/assets/simpan.svg" className="h-5" />
            Simpan
          </Button>
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 flex gap-2 items-center"
          >
            {instance.loading ? (
              "Loading document..."
            ) : (
              <a
                href={instance.url}
                download={`${data.no_resep}.pdf` ?? "resep_obat.pdf"}
                className="flex gap-2 items-center"
              >
                <img src="/assets/print.svg" className="h-5" />
                Cetak Resep Obat
              </a>
            )}
          </Button>
          <InertiaLink href={route("antrian.medis")}>
            <Button className="bg-gray-500 hover:bg-gray-700">Batal</Button>
          </InertiaLink>
        </div>
      </form>
    </Authenticated>
  );
}
