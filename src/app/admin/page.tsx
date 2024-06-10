'use client'
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import { Fragment } from "react";
import { useGetSellersQuery } from "../../../generated-types";
import SalesCard from "@/components/SalesCard";


const topSellers = [
  { name: "John Doe", value: "152 ventas" },
  { name: "Jane Smith", value: "127 ventas" },
  { name: "Sam Lee", value: "118 ventas" },
];

const topBuyers = [
  { name: "Company A", value: "200 Bs" },
  { name: "Company B", value: "185 Bs" },
  { name: "Company C", value: "160 Bs" },
];

const bestSoldDrone = [
  { name: "Phantom 4 Pro", value: "340 units" },
];


const InfoCard = ({ title, items, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-4">
        {icon && <span className="p-2 bg-blue-100 text-blue-500 rounded-full">{icon}</span>}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ul>
        {items.map((item, index) => (
          <Fragment key={index}>
            <li className="flex justify-between py-2 border-b last:border-b-0">
              <span className="text-gray-600">{item.name}</span>
              <span className="font-semibold">{item.value}</span>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default function Home() {
  const {data, isFetched } = useGetSellersQuery({},{})

  return (
    <div className="flex flex-col gap-5 w-full px-5">
      <PageTitle title="Drones Yohans" />
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="flex flex-col gap-5 w-full">
          <InfoCard title="Top Vendedor" items={topSellers} icon={<Users/>} />
          <InfoCard title="Top Clientes" items={topBuyers} icon={<CreditCard />} />
          <InfoCard title="Drone Mas Vendido" items={bestSoldDrone} icon={<Activity />} />
        </div>
        <div className="col-span-1 sm:col-span-1 xl:col-span-3">
          <CardContent>
            <p className="p-4 font-semibold">Vista General</p>
            <BarChart />
          </CardContent>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4">
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Top 3 Vendores</p>
            <p className="text-sm text-gray-400">
              Estos son los mejores vendedores
            </p>
          </section>
          {isFetched && data?.getSellers.map((d, i) => (
            <SalesCard
              key={i}
              email={d.email}
              name={d.firstName}
              saleAmount={(Math.random() * 100).toFixed(0)}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
}
