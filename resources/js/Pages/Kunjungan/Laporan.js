import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import { usePDF } from "@react-pdf/renderer";

import Authenticated from "@/Layouts/Authenticated";
import Radio from "@/Components/Radio";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Select from "@/Components/Select";
import Label from "@/Components/Label";
import PrintDocument from "@/Print/LaporanKunjungan";
import { formatDate, getMonthName } from "@/Utilities/misc";

export default function LaporanKunjungan(props) {
  const [kunjungan, setKunjungan] = React.useState([]);
  const [judul, setJudul] = React.useState("Tahunan");
  const [text, setText] = React.useState("");

  const { data, setData, post, processing, errors, reset } = useForm({
    jenis_laporan: "per_tahun",
    tahun: 0,
    bulan: 0,
    tanggal: 0,
  });

  const [instance, updateInstance] = usePDF({
    document: (
      <PrintDocument
        data={{ ...data, judul_laporan: judul, text_laporan: text }}
        kunjungan={kunjungan}
        petugas={props.petugas}
      />
    ),
  });
  React.useEffect(updateInstance, [data, kunjungan]);

  React.useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  React.useEffect(() => {
    if (data.jenis_laporan === "per_tahun") {
      setJudul("Tahunan");
    }

    if (data.jenis_laporan === "per_bulan") {
      setJudul("Bulanan");
    }

    if (data.jenis_laporan === "per_tanggal") {
      setJudul("Harian");
    }
  }, [data.jenis_laporan]);

  React.useEffect(() => {
    if (data.jenis_laporan === "per_tahun") {
      setText(data.tahun);
      setKunjungan(
        props.list_kunjungan.filter((k) => {
          const kDate = new Date(k.tanggal);

          return kDate.getFullYear() == data.tahun;
        })
      );
    }

    if (data.jenis_laporan === "per_bulan") {
      setText(`${getMonthName(data.bulan)} ${data.tahun}`);
      setKunjungan(
        props.list_kunjungan.filter((k) => {
          const kDate = new Date(k.tanggal);

          return (
            kDate.getFullYear() == data.tahun && kDate.getMonth() == data.bulan
          );
        })
      );
    }
  }, [data.tahun, data.jenis_laporan]);

  React.useEffect(() => {
    if (data.jenis_laporan === "per_bulan") {
      setText(`${getMonthName(data.bulan)} ${data.tahun}`);
      setKunjungan(
        props.list_kunjungan.filter((k) => {
          const kDate = new Date(k.tanggal);

          return (
            kDate.getFullYear() == data.tahun && kDate.getMonth() == data.bulan
          );
        })
      );
    }
  }, [data.bulan, data.jenis_laporan]);

  React.useEffect(() => {
    if (data.jenis_laporan === "per_tanggal") {
      setText(formatDate(data.tanggal));
      setKunjungan(
        props.list_kunjungan.filter(
          (k) => formatDate(k.tanggal) === formatDate(data.tanggal)
        )
      );
    }
  }, [data.tanggal, data.jenis_laporan]);

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <form className="py-8 px-4 grid gap-4">
        <div
          className="grid gap-4 items-center"
          style={{ gridTemplateColumns: "2fr 10fr" }}
        >
          <Label forInput="jenis_laporan" value="Jenis Laporan*" />

          <div className="flex gap-4 items-center">
            <Radio
              id="per_tahun"
              name="jenis_laporan"
              value="per_tahun"
              checked={data.jenis_laporan === "per_tahun"}
              label="Tahunan"
              onChange={onHandleChange}
            />
            <Radio
              id="per_bulan"
              name="jenis_laporan"
              value="per_bulan"
              checked={data.jenis_laporan === "per_bulan"}
              label="Bulanan"
              onChange={onHandleChange}
            />
            <Radio
              id="per_tanggal"
              name="jenis_laporan"
              value="per_tanggal"
              checked={data.jenis_laporan === "per_tanggal"}
              label="Harian"
              onChange={onHandleChange}
            />
          </div>
        </div>

        <hr />

        {(data.jenis_laporan === "per_tahun" ||
          data.jenis_laporan === "per_bulan") && (
          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "2fr 10fr" }}
          >
            <Label forInput="tahun" value="Tahun" />

            <Input
              type="number"
              name="tahun"
              value={data.tahun}
              className="block w-full"
              autoComplete="tahun"
              handleChange={onHandleChange}
              required={data.jenis_laporan === "per_tahun"}
              min={2000}
              max={new Date().getFullYear()}
            />
          </div>
        )}

        {data.jenis_laporan === "per_bulan" && (
          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "2fr 10fr" }}
          >
            <Label forInput="bulan" value="Bulan" />

            <Select
              name="bulan"
              value={data.bulan}
              className="block w-full"
              autoComplete="bulan"
              handleChange={onHandleChange}
              options={[
                { text: "Januari", value: "0" },
                { text: "Februari", value: "1" },
                { text: "Maret", value: "2" },
                { text: "April", value: "3" },
                { text: "Mei", value: "4" },
                { text: "Juni", value: "5" },
                { text: "Juli", value: "6" },
                { text: "Agustus", value: "7" },
                { text: "September", value: "8" },
                { text: "Oktober", value: "9" },
                { text: "November", value: "10" },
                { text: "Desember", value: "11" },
              ]}
              required={data.jenis_laporan === "per_bulan"}
            />
          </div>
        )}

        {data.jenis_laporan === "per_tanggal" && (
          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "2fr 10fr" }}
          >
            <Label forInput="tanggal" value="Tanggal" />

            <Input
              type="date"
              name="tanggal"
              value={data.tanggal}
              className="block w-full"
              autoComplete="tanggal"
              handleChange={onHandleChange}
              required={data.jenis_laporan === "per_tanggal"}
            />
          </div>
        )}

        <Button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 flex gap-2 items-center"
        >
          {instance.loading ? (
            "Loading document..."
          ) : (
            <a
              href={instance.url}
              download={`Laporan Kunjungan ${data.judul_laporan} ${
                data.text_laporan
              } ${
                data.jenis_laporan !== "per_tanggal" &&
                `per ${formatDate(new Date())}`
              }`}
              className="flex gap-2 items-center"
            >
              <img src="/assets/print.svg" className="h-5" />
              Cetak Laporan
            </a>
          )}
        </Button>
      </form>
    </Authenticated>
  );
}
