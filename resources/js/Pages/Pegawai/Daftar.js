import React from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { Inertia } from "@inertiajs/inertia";

import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/Table";

import { getPeran } from "@/Utilities/misc";

export default function DaftarPegawai(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Bagian",
        accessor: (originalRow) => {
          return `${getPeran(originalRow.pengguna.peran)}${
            originalRow.pelayanan ? ` (${originalRow.pelayanan.nama})` : ""
          }`;
        },
        id: "pengguna.peran",
      },
      {
        Header: "Jabatan",
        accessor: "jabatan",
      },
      {
        Header: "Username",
        accessor: "pengguna.username",
      },
    ],
    []
  );
  const tableInstance = useTable(
    {
      columns,
      data: props.list_pegawai,
      defaultColumn: columns,
      initialState: { pageSize: 7 },
    },
    useGlobalFilter,
    usePagination
  );

  const onHandleDelete = (id) => {
    Inertia.delete(`/pegawai/${id}`);
  };

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <div className="py-8">
        <Table tableInstance={tableInstance} handleDelete={onHandleDelete} />
      </div>
    </Authenticated>
  );
}
