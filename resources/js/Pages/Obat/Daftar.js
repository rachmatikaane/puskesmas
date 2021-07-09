import React from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useFilters,
} from "react-table";
import { Inertia } from "@inertiajs/inertia";

import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/Table";

export default function DaftarObat(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: (row, index) => index + 1, // accessor is the "key" in the data
      },
      {
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Stok",
        accessor: (row) => `${row.stok} ${row.satuan}`,
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: props.list_obat,
      defaultColumn: columns,
      initialState: {
        pageSize: 7,
      },
    },
    useGlobalFilter,
    useFilters,
    usePagination
  );

  const onHandleDelete = (id) => {
    if (window.confirm(`Hapus obat dengan id ${id}?`)) {
      Inertia.delete(`/obat/${id}`);
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
          extraActions={[
            {
              type: "link",
              icon: "add.svg",
              to: "stok",
            },
          ]}
          editURL={`/obat`}
          handleDelete={onHandleDelete}
          withDetailButton={false}
        />
      </div>
    </Authenticated>
  );
}
