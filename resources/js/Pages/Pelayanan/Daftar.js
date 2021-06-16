import React from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { Inertia } from "@inertiajs/inertia";

import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/Table";

export default function DaftarLayanan(props) {
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
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: props.list_pelayanan,
      defaultColumn: columns,
      initialState: { pageSize: 7 },
    },
    useGlobalFilter,
    usePagination
  );

  const onHandleDelete = (id) => {
    if (window.confirm(`Hapus pelayanan dengan id ${id}?`)) {
      Inertia.delete(`/layanan/${id}`);
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
          editURL={`/layanan`}
          handleDelete={onHandleDelete}
        />
      </div>
    </Authenticated>
  );
}
