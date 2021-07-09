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
import { formatDate } from "@/Utilities/misc";

export default function AntrianResep(props) {
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
          return `${formatDate(row.nomor_antrian.tanggal)}`;
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
              {formatDate(tableInstance.row.original.nomor_antrian.tanggal)} •{" "}
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
        Header: "Nomor Resep",
        accessor: "no_resep_obat",
      },
      {
        Header: "Obat",
        Cell: (tableInstance) => {
          return (
            <div>
              {tableInstance.row.original.resep_obat.map((resep) => (
                <p>
                  - {resep.obat.nama} • {resep.jumlah} {resep.obat.satuan} •{" "}
                  {resep.aturan_pakai}
                </p>
              ))}
            </div>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: props.antrian,
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
          handleDelete={(id) => {
            if (window.confirm(`Selesaikan proses pengambilan obat?`)) {
              Inertia.post(`/resep/${id}`);
            }
          }}
          customDeleteIcon="detail.svg"
          withDateSearch={true}
          withEditButton={false}
          withDetailButton={false}
        />
      </div>
    </Authenticated>
  );
}
