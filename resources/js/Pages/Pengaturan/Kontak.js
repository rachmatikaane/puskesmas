import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";

export default function SuntingKontak(props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    kontak: props.list_kontak,
  });

  React.useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const onHandleChange = (event) => {
    setData(
      "kontak",
      data.kontak.map((k) => {
        if (k.id == event.target.id) {
          k[event.target.name] = event.target.value;
        }
        return k;
      })
    );
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("kontak.update"));
  };

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <form onSubmit={submit} className="px-8 py-4 flex flex-col gap-4 w-full">
        <fieldset className="border border-solid border-black px-8 py-4 flex flex-col gap-4">
          <legend className="text-lg -ml-4">Ubah Kontak</legend>
          {props.list_kontak.map((k, i) => (
            <React.Fragment key={k.id}>
              <div
                className="grid gap-4 items-center"
                style={{ gridTemplateColumns: "2fr 10fr" }}
              >
                <Label
                  forInput="isi"
                  value={`${k.nama}`}
                  className="capitalize"
                />

                <Input
                  name="isi"
                  id={k.id}
                  value={data.kontak[i].isi}
                  className="block w-full"
                  autoComplete="isi"
                  isFocused={true}
                  handleChange={onHandleChange}
                  required
                />
              </div>
              {k.nama !== "telepon" && k.nama !== "alamat" && (
                <div
                  className="grid gap-4 items-center"
                  style={{ gridTemplateColumns: "2fr 10fr" }}
                  key={k.id}
                >
                  <Label
                    forInput="url"
                    value={`URL ${k.nama}`}
                    className="capitalize"
                  />

                  <Input
                    name="url"
                    id={k.id}
                    value={data.kontak[i].url}
                    className="block w-full"
                    autoComplete="url"
                    handleChange={onHandleChange}
                  />
                </div>
              )}
              <hr />
            </React.Fragment>
          ))}
        </fieldset>
        <div className="flex gap-4 justify-end">
          <Button type="submit" className="bg-green-500 hover:bg-green-700">
            Simpan
          </Button>
        </div>
      </form>
    </Authenticated>
  );
}
