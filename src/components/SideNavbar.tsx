/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  LucideHand,
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import { signOut } from "next-auth/react";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-10  pb-10 pt-24 bg-orange-200 h-[100vh] flex flex-col justify-between">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Clientes",
            href: "/admin/clients",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Vendedores",
            href: "/admin/sellers",
            icon: LucideHand,
            variant: "ghost",
          },
          {
            title: "Drones",
            href: "/admin/drones",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Ordenes",
            href: "/admin/orders",
            icon: ShoppingCart,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/admin/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />

      <button
        onClick={() => signOut()}
        className="bg-gray-500 text-white font-bold px-6 py-2 mt-3 rounded-lg relative"
      >
        Log Out
      </button>
    </div>
  );
}
