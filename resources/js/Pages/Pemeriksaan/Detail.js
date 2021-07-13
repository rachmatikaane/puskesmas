import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { usePDF } from "@react-pdf/renderer";

import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import PrintDocument from "@/Print/ResepObat";

import { formatDate } from "@/Utilities/misc";

export default function DetailPemeriksaan(props) {
  const [instance, updateInstance] = usePDF({
    document: (
      <PrintDocument
        kunjungan={props.kunjungan}
        kontak={props.kontak}
        pemeriksaan={props.kunjungan}
      />
    ),
  });

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <form className="px-8 py-4 flex flex-col gap-5 w-full">
        <h1 className="font-bold text-lg">Detail Pemeriksaan</h1>

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
                {props.kunjungan.rekam_medis.anamnesis}
              </td>
            </tr>
            <tr className="border-b-2 border-t-2 border-gray-200">
              <td className="pl-12 py-2">Diagnosa</td>
              <td className="px-4 py-2">:</td>
              <td className="px-4 py-2">
                {props.kunjungan.rekam_medis.hasil_pemeriksaan}
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

        <div className="flex gap-4 justify-end">
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
                  `${props.kunjungan.no_resep_obat}.pdf` ?? "resep_obat.pdf"
                }
                className="flex gap-2 items-center"
              >
                <img src="/assets/print.svg" className="h-5" />
                Cetak Resep Obat
              </a>
            )}
          </Button>
          <InertiaLink href={route("pemeriksaan")}>
            <Button className="bg-gray-500 hover:bg-gray-700">Kembali</Button>
          </InertiaLink>
        </div>
      </form>
    </Authenticated>
  );
}
