import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import { usePDF } from "@react-pdf/renderer";

import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import PrintDocument from "@/Print/BuktiPembayaran";

import { formatDate } from "@/Utilities/misc";

export default function TambahPembayaran(props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    total_harga: 0,
  });

  const [instance, updateInstance] = usePDF({
    document: (
      <PrintDocument
        kunjungan={props.kunjungan}
        petugas={props.petugas}
        totalHarga={data.total_harga}
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

  const submit = (e) => {
    e.preventDefault();

    post(
      route("pembayaran.store", {
        id_kunjungan: props.kunjungan.id,
      })
    );
  };

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <form onSubmit={submit} className="px-8 py-4 flex flex-col gap-5 w-full">
        <h1 className="font-bold text-lg">Tambah Pembayaran</h1>
        <table className="w-full">
          <colgroup>
            <col className="w-64" />
            <col className="w-0.5" />
            <col className="w-auto" />
          </colgroup>
          <thead>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="bg-gray-200 px-4 py-2">1. Data Pemeriksaan</td>
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
              <td className="bg-gray-200 px-4 py-2">2. Resep Obat</td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">No Resep</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">{props.kunjungan.no_resep_obat}</td>
            </tr>
            {props.kunjungan.resep_obat.map((r, i) => (
              <React.Fragment key={r.id}>
                <tr className="border-b-2 border-t-2 border-gray-200">
                  <td className="pl-8 py-2">{i + 1}. Nama Obat</td>
                  <td className="px-4 py-2">:</td>
                  <td className="px-4 py-2">{r.obat.nama}</td>
                </tr>
                <tr className="border-b-2 border-t-2 border-gray-200">
                  <td className="pl-12 py-2">Qty dan Aturan Pakai</td>
                  <td className="px-4 py-2">:</td>
                  <td className="px-4 py-2 flex gap-2 items-center">
                    {r.jumlah} {r.obat.satuan} ({r.aturan_pakai})
                  </td>
                </tr>
              </React.Fragment>
            ))}
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
              <td className="bg-gray-200 px-4 py-2">3. Data Pembayaran</td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">Jenis Pembayaran</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">{props.kunjungan.jenis_pembayaran}</td>
            </tr>
            {props.kunjungan.jenis_pembayaran === "BPJS" && (
              <tr className="border-b-2 border-t-2 border-gray-200">
                <td className="pl-12 py-2">No BPJS</td>
                <td className="px-4 py-2">:</td>
                <td className="px-4 py-2">{props.kunjungan.pasien.no_bpjs}</td>
              </tr>
            )}
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">Total Bayar</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">
                <Input
                  type="number"
                  name="total_harga"
                  value={data.total_harga}
                  className="block w-full"
                  autoComplete="total_harga"
                  isFocused={true}
                  handleChange={onHandleChange}
                  required
                />
              </td>
            </tr>
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
                download={
                  `Bukti Pembayaran_${props.kunjungan.pasien.nama}_${props.kunjungan.rekam_medis.tanggal}.pdf` ??
                  "Bukti Pembayaran.pdf"
                }
                className="flex gap-2 items-center"
              >
                <img src="/assets/print.svg" className="h-5" />
                Cetak Bukti Pembayaran
              </a>
            )}
          </Button>
          <InertiaLink href={route("pembayaran")}>
            <Button className="bg-gray-500 hover:bg-gray-700">Kembali</Button>
          </InertiaLink>
        </div>
      </form>
    </Authenticated>
  );
}
