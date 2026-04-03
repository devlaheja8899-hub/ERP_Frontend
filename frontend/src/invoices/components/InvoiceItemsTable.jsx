import React, { useMemo } from "react";
import { useTable } from "react-table";
import { formatCurrency } from "../utils/invoiceFormatters";

export default function InvoiceItemsTable({ items }) {
  const data = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        amount: item.quantity * item.rate,
      })),
    [items]
  );

  const totals = useMemo(
    () => ({
      quantity: data.reduce((sum, item) => sum + item.quantity, 0),
      amount: data.reduce((sum, item) => sum + item.amount, 0),
    }),
    [data]
  );

  const columns = useMemo(
    () => [
      { Header: "Sl No", accessor: "si", align: "center" },
      { Header: "Description of Goods", accessor: "description" },
      { Header: "HSN/SAC", accessor: "hsn", align: "center" },
      { Header: "Quantity", accessor: "quantity", align: "center" },
      { Header: "Rate", accessor: "rate", Cell: ({ value }) => formatCurrency(value), align: "right" },
      { Header: "Per", accessor: "unit", align: "center" },
      { Header: "Amount", accessor: "amount", Cell: ({ value }) => formatCurrency(value), align: "right" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <section className="bg-white px-4 pb-4">
      <div className="overflow-hidden rounded-[22px] border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <table {...getTableProps()} className="min-w-full border-collapse text-[11px]">
        <thead className="bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_120%)] uppercase text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className={`border-r border-b border-white/10 px-3 py-3 font-semibold tracking-[0.12em] ${
                    column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"
                  } ${column.id === "amount" ? "border-r-0" : ""}`}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id} className="odd:bg-white even:bg-slate-50/70">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className={`border-r border-b border-slate-200 px-3 py-3 align-top text-slate-700 ${
                      cell.column.align === "right"
                        ? "text-right"
                        : cell.column.align === "center"
                          ? "text-center"
                          : "text-left"
                    } ${cell.column.id === "amount" ? "border-r-0" : ""}`}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
          <tr className="bg-slate-50 font-semibold text-slate-900">
            <td className="border-r border-slate-300 px-3 py-3 text-center" colSpan={3}>
              Total
            </td>
            <td className="border-r border-slate-300 px-3 py-3 text-center">{totals.quantity}</td>
            <td className="border-r border-slate-300 px-3 py-3" />
            <td className="border-r border-slate-300 px-3 py-3 text-center">PCS</td>
            <td className="px-3 py-3 text-right">{formatCurrency(totals.amount)}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </section>
  );
}
