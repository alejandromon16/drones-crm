'use client'
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetDronesQuery } from "../../../../generated-types";

type Props = {};


const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Nombre"
  },
  {
    accessorKey: "description",
    header: "Descripcion"
  },
  {
    accessorKey: "stock",
    header: "Stock"
  },
  {
    accessorKey: "price",
    header: "Precio"
  }
];

export default function UsersPage({}: Props) {
  const router = useRouter()
  const {data, isFetched} = useGetDronesQuery({},{})

  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="flex flex-row w-full justify-between">
        <PageTitle title="Drones" />
        <Button
          onClick={() => {
            router.push("/admin/drones/create")
          }}
        >Agregar Dron</Button>
      </div>
      {isFetched && (
        <DataTable columns={columns} data={data?.getDrones ?? []} handleEditClick={() => router.push('/admin/drones/update/drone-pele')} />
      )}
    </div>
  );
}
