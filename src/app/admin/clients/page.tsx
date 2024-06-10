"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getClients } from "@/lib/action/clients.actions";
import { useGetClientQuery, useGetClientsQuery } from "../../../../generated-types";

type Props = {};
type Payment = {
  name: string;
  email: string;
  lastOrder: string;
  method: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "name"
            )}`}
            alt="user-image"
          />
          <p>{row.getValue("name")} </p>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "phoneNumber",
    header: "Numero de Telefono"
  },
  {
    accessorKey: "gender",
    header: "Genero"
  }
];

export default function ClientsPage({}: Props) {
  const { data, isFetched } = useGetClientsQuery({},{})
  const router = useRouter();


  const handleClick = () => {
    router.push('/admin/clients/create')
  }

  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="flex flex-row w-full justify-between">
        <PageTitle title="Clientes" />
        <Button
          onClick={() => handleClick()}
        >Crear Cliente</Button>
      </div>
      {isFetched && (
        <DataTable columns={columns} data={data?.getClients ?? []} />
      )}
    </div>
  );
}
