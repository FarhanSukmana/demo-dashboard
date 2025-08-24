"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc"];

export default function ExpertStatistikPage() {
  const [data, setData] = useState<{ pendidikan: string; jumlah: number }[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/Expert/expert-statistik/pendidikan")
      .then((res) => res.json())
      .then((result) => {
        const formatted = Object.entries(result).map(([key, value]) => ({
          pendidikan: key,
          jumlah: value as number,
        }));
        setData(formatted);
      })
      .catch((err) => console.error("Gagal fetch data statistik:", err))
      .finally(() => setLoading(false));
  }, []);

  const chartConfig: ChartConfig = {
    jumlah: {
      label: "Jumlah",
      color: "#4f46e5",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Pendidikan Expert</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="pendidikan" />
                  <YAxis allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="jumlah" fill="var(--color-jumlah)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Line Chart - Pendidikan Expert</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis dataKey="pendidikan" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="jumlah"
                stroke="#6366f1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pie Chart - Pendidikan Expert</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="jumlah"
                nameKey="pendidikan"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Radar Chart - Pendidikan Expert</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="pendidikan" />
              <Radar
                name="Jumlah"
                dataKey="jumlah"
                stroke="#818cf8"
                fill="#818cf8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
