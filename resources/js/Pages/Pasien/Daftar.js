import React from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { Inertia } from "@inertiajs/inertia";

import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/Table";
import { formatDate } from "@/Utilities/misc";

export default function DaftarPasien(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "NIK",
        accessor: "nik",
      },
      {
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Tempat/Tanggal Lahir",
        accessor: (row) => {
          return `${row.tempat_lahir}, ${formatDate(row.tanggal_lahir)}`;
        },
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: props.list_pasien,
      defaultColumn: columns,
      initialState: { pageSize: 7 },
    },
    useGlobalFilter,
    usePagination
  );

  const onHandleDelete = (id) => {
    if (window.confirm(`Hapus pasien dengan id ${id}?`)) {
      Inertia.delete(`/pasien/${id}`);
    }
  };

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <div className="py-8">
        <Table
          tableInstance={tableInstance}
          editURL={`/pasien`}
          handleDelete={onHandleDelete}
        />
      </div>
    </Authenticated>
  );
}
