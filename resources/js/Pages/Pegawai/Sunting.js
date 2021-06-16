import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Select from "@/Components/Select";
import Authenticated from "@/Layouts/Authenticated";
import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";

export default function SuntingPegawai(props) {
  const [dPelayanan, setDPelayanan] = React.useState(false);
  const { data, setData, put, processing, errors, reset } = useForm({
    nama: props.pegawai.nama,
    jabatan: props.pegawai.jabatan,
    peran: props.pegawai.pengguna.peran,
    username: props.pegawai.pengguna.username,
    id_pelayanan: props.pegawai.id_pelayanan,
    password: "",
    password_confirmation: "",
  });

  React.useEffect(() => {
    console.log(props.pegawai);
    return () => {
      reset();
    };
  }, []);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();

    put(
      route("pegawai.update", {
        id_pegawai: props.pegawai.id,
      })
    );
  };

  React.useEffect(() => {
    const defaultPelayanan = props.pegawai.id_pelayanan
      ? props.pegawai.id_pelayanan
      : props.list_pelayanan && props.list_pelayanan.length > 0
      ? props.list_pelayanan[0].id
      : undefined;

    setDPelayanan(data.peran === "medis");
    setData(
      "id_pelayanan",
      data.peran === "medis" ? defaultPelayanan : undefined
    );
  }, [data.peran]);

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
          <legend className="text-lg -ml-4">Tambah Pegawai</legend>
          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="nama" value="Nama" />

            <Input
              type="text"
              name="nama"
              value={data.nama}
              className="block w-full"
              autoComplete="nama"
              isFocused={true}
              handleChange={onHandleChange}
              required
            />
          </div>
          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="jabatan" value="Jabatan" />

            <Input
              type="text"
              name="jabatan"
              value={data.jabatan}
              className="block w-full"
              autoComplete="jabatan"
              handleChange={onHandleChange}
              required
            />
          </div>
          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="peran" value="Bagian" />

            <Select
              name="peran"
              value={data.peran}
              className="block w-full"
              autoComplete="peran"
              handleChange={onHandleChange}
              required
              options={[
                { text: "Administrator", value: "admin" },
                { text: "Pendaftaran", value: "pendaftaran" },
                { text: "Medis", value: "medis" },
                { text: "Pembayaran", value: "pembayaran" },
                { text: "Antrian", value: "antrian" },
                { text: "Apoteker", value: "apoteker" },
              ]}
            />
          </div>
          <div
            className={`grid gap-4 items-center ${!dPelayanan ? "hidden" : ""}`}
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="id_pelayanan" value="Pelayanan" />

            <Select
              name="id_pelayanan"
              value={data.id_pelayanan}
              className="block w-full"
              autoComplete="id_pelayanan"
              handleChange={onHandleChange}
              required={dPelayanan}
              options={props.list_pelayanan.map((p) => ({
                text: p.nama,
                value: p.id,
              }))}
            />
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="username" value="Username" />

            <Input
              type="text"
              name="username"
              value={data.username}
              className="block w-full"
              autoComplete="username"
              handleChange={onHandleChange}
              required
            />
          </div>
          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="password" value="Password" />

            <Input
              type="password"
              name="password"
              value={data.password}
              className="block w-full"
              autoComplete="password"
              handleChange={onHandleChange}
            />
          </div>
          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label
              forInput="password_confirmation"
              value="Konfirmasi Password"
            />

            <Input
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="block w-full"
              autoComplete="password_confirmation"
              handleChange={onHandleChange}
              required={data.password.length > 0}
            />
          </div>
        </fieldset>

        <div className="flex gap-4 justify-center">
          <Button type="submit" className="bg-green-500 hover:bg-green-700">
            Simpan
          </Button>
          <InertiaLink href={route("pegawai")}>
            <Button className="bg-gray-500 hover:bg-gray-700">Batal</Button>
          </InertiaLink>
        </div>
      </form>
    </Authenticated>
  );
}
