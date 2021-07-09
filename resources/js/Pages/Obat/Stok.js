import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";

export default function SuntingStokObat(props) {
  const { data, setData, put, processing, errors, reset } = useForm({
    stok: 0,
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

    put(
      route("obat.updateStok", {
        id_obat: props.obat.id,
      })
    );
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
        <fieldset className="border border-solid border-black px-8 py-4 flex flex-col gap-4">
          <legend className="text-lg -ml-4">Ubah Obat</legend>
          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="nama" value="Nama" />

            {props.obat.nama}
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="stok" value="Stok saat ini" />
            {props.obat.stok} {props.obat.satuan}
          </div>

          <div
            className="grid gap-4 items-center"
            style={{ gridTemplateColumns: "3fr 10fr" }}
          >
            <Label forInput="stok" value="Jumlah stok yang akan ditambahkan" />

            <Input
              type="number"
              name="stok"
              value={data.stok}
              className="block w-full"
              autoComplete="stok"
              handleChange={onHandleChange}
              required
            />
          </div>
        </fieldset>
        <div className="flex gap-4 justify-center">
          <Button type="submit" className="bg-green-500 hover:bg-green-700">
            Simpan
          </Button>
          <InertiaLink href={route("obat")}>
            <Button className="bg-gray-500 hover:bg-gray-700">Batal</Button>
          </InertiaLink>
        </div>
      </form>
    </Authenticated>
  );
}
