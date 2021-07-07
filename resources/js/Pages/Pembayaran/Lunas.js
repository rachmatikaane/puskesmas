import React from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useFilters,
} from "react-table";

import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/Table";
import { formatDate } from "@/Utilities/misc";

export default function DaftarLunas(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: (row, index) => index + 1,
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
        Cell: (tableInstance) => {
          return (
            <>
              {formatDate(tableInstance.row.original.tanggal)} •{" "}
              {tableInstance.row.original.waktu}
            </>
          );
        },
      },
      {
        Header: "Nama Pasien",
        accessor: "pasien.nama",
        Cell: (tableInstance) => {
          return (
            <a
              href={route("pasien.show", tableInstance.row.original.pasien.id)}
              method="post"
              target="_blank"
              className="flex gap-4 items-center w-full text-xs text-blue-700 hover:underline"
            >
              {tableInstance.row.original.pasien.nama}
            </a>
          );
        },
      },
      {
        Header: "Poli",
        accessor: "pegawai.pelayanan.nama",
      },
      {
        Header: "Jenis Pembayaran",
        accessor: "jenis_pembayaran",
      },
      {
        Header: "Total Harga",
        accessor: (row) => `Rp. ${row.total_harga}`,
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: props.list_pembayaran,
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

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <div className="py-8">
        <Table
          tableInstance={tableInstance}
          editURL="/pembayaran"
          handleDelete={() => {}}
          withDateSearch={true}
          withDelete={false}
          withEditButton={false}
        />
      </div>
    </Authenticated>
  );
}
