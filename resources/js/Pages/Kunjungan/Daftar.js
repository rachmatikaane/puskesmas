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
import { formatDate, getStatusKunjungan } from "@/Utilities/misc";

export default function DaftarKunjungan(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: (row, index) => index + 1, // accessor is the "key" in the data
      },
      {
        id: "tanggal",
        Header: "Tanggal",
        accessor: (row) => {
          return `${formatDate(row.tanggal)}`;
        },
        filter: (rows, id, filterValue) => {
          return rows.filter(
            (row) =>
              filterValue.length <= 0 ||
              !filterValue ||
              formatDate(filterValue).includes(row.values[id])
          );
        },
      },
      {
        Header: "Nama",
        accessor: "pasien.nama",
      },
      {
        Header: "Status",
        accessor: (row) => {
          return getStatusKunjungan(row.status);
        },
      },
      {
        Header: "Layanan",
        accessor: "pegawai.pelayanan.nama",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: props.list_kunjungan,
      defaultColumn: columns,
      initialState: {
        pageSize: 7,
        filters: [
          {
            id: "tanggal",
            value: formatDate(new Date()),
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    usePagination
  );

  const onHandleDelete = (id) => {
    if (window.confirm(`Hapus kunjungan dengan id ${id}?`)) {
      Inertia.delete(`/kunjungan/${id}`);
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
          editURL={`/kunjungan`}
          handleDelete={onHandleDelete}
          withDateSearch={true}
        />
      </div>
    </Authenticated>
  );
}
