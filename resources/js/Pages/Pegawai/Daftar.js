import "regenerator-runtime/runtime";

import Authenticated from "@/Layouts/Authenticated";
import React from "react";
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import { Inertia } from "@inertiajs/inertia";
import { getPeran } from "@/Utilities/misc";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

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
    { columns, data: props.list_pegawai, defaultColumn: columns },
    useGlobalFilter
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  const _handleDelete = (id) => {
    Inertia.delete(
      `/pegawai/${id}`,
      {},
      {
        onSuccess: (page) => {
          console.log(page, props);
        },
        onFinish: (visit) => {
          console.log(visit, props);
        },
      }
    );
  };

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <table
            {...getTableProps()}
            className="border border-primary border-collapse w-full"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="border-b border-primary p-2 bg-primary text-white text-left text-sm"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                  <th className="border-b border-primary p-2 bg-primary text-white text-left text-sm">
                    Aksi
                  </th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="border-b border-primary p-2 text-xs"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                    <td className="border-b border-primary p-2 text-xs">
                      <div className="flex gap-4">
                        <button className="p-1 rounded-full hover:bg-gray-400 ">
                          <img src="/assets/edit.svg"></img>
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-gray-400 "
                          onClick={() => _handleDelete(row.original.id)}
                        >
                          <img src="/assets/delete.svg"></img>
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-400 ">
                          <img src="/assets/detail.svg"></img>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Authenticated>
  );
}
