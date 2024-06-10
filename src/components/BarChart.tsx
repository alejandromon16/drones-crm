/** @format */
"use client";
import React from "react";
import {
  AreaChart as AreaGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  linearGradient,
  defs,
  stop
} from "recharts";

type Props = {};

const data = [
  { name: "Jan", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", uv: Math.floor(Math.random() * 5000) + 1000, pv: Math.floor(Math.random() * 5000) + 1000 },
];

export default function AreaChart({}: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaGraph data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d8b684" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#e4a620" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d8b684" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#e4a620" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
        <YAxis tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#d8b684" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="pv" stroke="#e4a620" fillOpacity={1} fill="url(#colorPv)" />
      </AreaGraph>
    </ResponsiveContainer>
  );
}

