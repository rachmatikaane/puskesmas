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

export default function DaftarPemeriksaan(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: (row, index) => index + 1,
      },
      {
        id: "tanggal",
        Header: "Tanggal Pemeriksaan",
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
      },
      {
        Header: "Petugas Medis",
        accessor: (row) => {
          return `${row.pegawai.nama} (${row.pegawai.pelayanan.nama})`;
        },
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: props.list_pemeriksaan,
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
          editURL="/pemeriksaan"
          handleDelete={() => {}}
          withEditButton={false}
          withDateSearch={true}
          withDelete={false}
        />
      </div>
    </Authenticated>
  );
}
