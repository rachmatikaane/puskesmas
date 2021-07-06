import "regenerator-runtime/runtime";

import Button from "@/Components/Button";
import Input from "@/Components/Input";
import React from "react";
import { useAsyncDebounce } from "react-table";
import { InertiaLink } from "@inertiajs/inertia-react";
import { deformatDate } from "@/Utilities/misc";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = React.useState(globalFilter || "");
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || "");
  }, 200);

  return (
    <Input
      value={value}
      handleChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder="Cari"
      className="mb-4 w-full search"
    />
  );
}

function Pagination({ tableInstance }) {
  const {
    state,
    pageOptions,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = tableInstance;

  const pages = () => {
    if (pageOptions.length <= 8) return pageOptions;

    if (state.pageIndex < Math.floor(pageOptions.length / 2)) {
      const ps = [
        ...pageOptions.slice(state.pageIndex, state.pageIndex + 5),
        "rest",
      ];

      if (state.pageIndex !== 0) ps.unshift(0);

      return ps;
    } else if (
      state.pageIndex > 2 &&
      state.pageIndex < pageOptions.length - 3
    ) {
      return [
        0,
        "rest",
        ...pageOptions.slice(state.pageIndex - 1, state.pageIndex + 2),
        "rest",
        pageOptions.length - 1,
      ];
    } else {
      return [0, "rest", ...pageOptions.slice(-5)];
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {canPreviousPage && (
        <Button
          handleClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-primary hover:bg-opacity-75"
        >
          &#8249;
        </Button>
      )}

      {pages().map((p) =>
        p !== "rest" ? (
          <Button
            handleClick={() => gotoPage(p)}
            disabled={state.pageIndex === p}
            className={
              state.pageIndex === p ? "" : "bg-primary hover:bg-opacity-75"
            }
            key={p}
          >
            {p + 1}
          </Button>
        ) : (
          "..."
        )
      )}

      {canNextPage && (
        <Button
          handleClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-primary hover:bg-opacity-75"
        >
          &#8250;
        </Button>
      )}
    </div>
  );
}

function DateFilter({ filter, setFilter }) {
  const [value, setValue] = React.useState(filter.value || "");
  const onChange = useAsyncDebounce((value) => {
    setFilter(filter.id, value || "");
  }, 200);

  return (
    <Input
      value={deformatDate(value)}
      handleChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      type="date"
      className="mb-4 w-full"
    />
  );
}

export default function Table({
  tableInstance,
  editURL = "#",
  withSearch = true,
  withAction = true,
  withPagination = true,
  withDateSearch = false,
  withDetailButton = true,
  withDelete = true,
  customEditIcon,
  extraEditUrl,
  handleDelete,
}) {
  const {
    getTableProps,
    columns,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
    page,
    setFilter,
  } = tableInstance;

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      {withDateSearch && (
        <DateFilter
          filter={state.filters.find((f) => f.id === "tanggal")}
          setFilter={setFilter}
        />
      )}

      {withSearch && (
        <GlobalFilter
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}

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
              {withAction && (
                <th className="border-b border-primary p-2 bg-primary text-white text-left text-sm">
                  Aksi
                </th>
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
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
                {withAction && (
                  <td className="border-b border-primary p-2 text-xs">
                    <div className="flex gap-2">
                      <InertiaLink
                        href={`${editURL}/${row.original.id}${
                          extraEditUrl ?? ""
                        }`}
                        as="button"
                        className="p-1 rounded-full hover:bg-gray-400"
                      >
                        <img
                          className="max-h-8"
                          src={`/assets/${customEditIcon ?? "edit.svg"}`}
                        />
                      </InertiaLink>
                      {withDelete && (
                        <button
                          className="p-1 rounded-full hover:bg-gray-400"
                          onClick={() => handleDelete(row.original.id)}
                        >
                          <img className="max-h-8" src="/assets/delete.svg" />
                        </button>
                      )}
                      {withDetailButton && (
                        <InertiaLink
                          href={`${editURL}/${row.original.id}/detail`}
                          as="button"
                          className="p-1 rounded-full hover:bg-gray-400"
                        >
                          <img className="max-h-8" src="/assets/detail.svg" />
                        </InertiaLink>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {withPagination && <Pagination tableInstance={tableInstance} />}
    </div>
  );
}
