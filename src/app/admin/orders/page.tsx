"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import { useGetOrdersQuery } from "../../../../generated-types";

type Props = {};
const columns: ColumnDef<any>[] = [
  {
    accessorKey: "status",
    header: "Estado"
  },
  {
    accessorKey: "address",
    header: "Direccion"
  },
];

export default function OrdersPage({}: Props) {
  const { data, isFetched } = useGetOrdersQuery({},{})

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Ordenes" />
      {isFetched && (
        <DataTable columns={columns} data={data?.orders ?? []} />
      )}
    </div>
  );
}
