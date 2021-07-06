import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";

export default function SuntingJadwal(props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    jadwal: props.list_jadwal,
  });

  React.useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const onHandleChange = (event) => {
    setData(
      "jadwal",
      data.jadwal.map((j) => {
        if (j.id == event.target.id) {
          if (event.target.name === "libur") {
            if (event.target.checked) {
              j.jam_mulai = "";
              j.jam_selesai = "";
            }
            j[event.target.name] = event.target.checked;
          } else {
            j[event.target.name] = event.target.value;
          }
        }
        return j;
      })
    );
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("jadwal.update"));
  };

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <form onSubmit={submit} className="px-8 py-4 flex flex-col gap-4 w-full">
        <fieldset className="border border-solid border-black px-8 py-4 flex flex-col gap-4">
          <legend className="text-lg -ml-4">Ubah Jadwal</legend>
          {props.list_jadwal.map((j, i) => (
            <div
              className="grid gap-4 items-center"
              style={{ gridTemplateColumns: "1fr 10fr" }}
              key={j.id}
            >
              <Label forInput="jadwal" value={j.hari} />

              <div className="grid grid-cols-3 gap-2 items-center">
                <Input
                  type="time"
                  name="jam_mulai"
                  id={j.id}
                  value={data.jadwal[i].jam_mulai ?? ""}
                  className="block w-full"
                  autoComplete="jam_mulai"
                  isFocused={true}
                  disabled={data.jadwal[i].libur}
                  step={300}
                  handleChange={onHandleChange}
                  required
                />

                <Input
                  type="time"
                  name="jam_selesai"
                  id={j.id}
                  value={data.jadwal[i].jam_selesai ?? ""}
                  className="block w-full"
                  autoComplete="jam_selesai"
                  disabled={data.jadwal[i].libur}
                  step={300}
                  handleChange={onHandleChange}
                  required
                />

                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="libur"
                    id={j.id}
                    checked={data.jadwal[i].libur}
                    onChange={onHandleChange}
                  />
                  <label htmlFor="libur">Libur</label>
                </div>
              </div>
            </div>
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
