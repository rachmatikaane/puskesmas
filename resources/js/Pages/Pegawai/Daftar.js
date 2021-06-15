import Authenticated from "@/Layouts/Authenticated";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import React from "react";
import { useTable } from "react-table";

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
        accessor: "pengguna.peran",
      },
      {
        Header: "Jabatan",
        accessor: "jabatan",
      },
      {
        Header: "Layanan",
        accessor: "pelayanan.nama",
      },
      {
        Header: "Username",
        accessor: "pengguna.username",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: props.list_pegawai });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

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

  React.useEffect(() => {
    console.log(props.message);
  }, [props.message]);

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      message={props.message ?? ""}
    >
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <table
            {...getTableProps()}
            className="border border-black border-collapse w-full"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="border-b border-black p-3 bg-primary text-white text-left text-sm"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                  <th className="border-b border-black p-3 bg-primary text-white text-left text-sm">
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
                          className="border-b border-black p-3 text-xs"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                    <td className="border-b border-black p-3 text-xs">
                      <div className="flex gap-4">
                        <button className="p-1 rounded-full hover:bg-gray-200 ">
                          <img src="/assets/edit.svg"></img>
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-gray-200 "
                          onClick={() => _handleDelete(row.original.id)}
                        >
                          <img src="/assets/delete.svg"></img>
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-200 ">
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
