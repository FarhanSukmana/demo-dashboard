'use client'
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { Home, Monitor, Car, Calendar } from "lucide-react";

const metricCards = [
  {
    title: "Total Rumah Negara",
    value: "120",
    icon: Home,
    route: "rumah-negara",
  },
  {
    title: "Total Ruangan Meeting",
    value: "35",
    icon: Monitor,
    route: "room-meeting",
  },
  {
    title: "Total Kendaraan Dinas",
    value: "42",
    icon: Car,
    route: "kendaraan-dinas",
  },
  {
    title: "Total Kegiatan Terdaftar",
    value: "18",
    icon: Calendar,
    route: "perizinan-kegiatan",
  },
];

const barChartData = [
  { name: "Jan", rumahNegara: 12, roomMeeting: 8, kendaraan: 5, kegiatan: 3 },
  { name: "Feb", rumahNegara: 15, roomMeeting: 12, kendaraan: 8, kegiatan: 5 },
  { name: "Mar", rumahNegara: 18, roomMeeting: 15, kendaraan: 12, kegiatan: 8 },
  {
    name: "Apr",
    rumahNegara: 22,
    roomMeeting: 18,
    kendaraan: 15,
    kegiatan: 12,
  },
];

const pieChartData = [
  { name: "Disetujui", value: 65, color: "var(--chart-1)" },
  { name: "Menunggu", value: 25, color: "var(--chart-4)" },
  { name: "Ditolak", value: 10, color: "var(--chart-3)" },
];

const recentActivities = [
  {
    id: 1,
    action: "Rumah #12 ditambahkan",
    time: "5 menit lalu",
    type: "success",
    user: "Admin Rumah",
    module: "Rumah Negara",
  },
  {
    id: 2,
    action: "Kegiatan Rapat Bulanan disetujui",
    time: "15 menit lalu",
    type: "success",
    user: "Admin Kegiatan",
    module: "Perizinan Kegiatan",
  },
  {
    id: 3,
    action: "Kendaraan B1234AB memerlukan service",
    time: "1 jam lalu",
    type: "warning",
    user: "Admin Kendaraan",
    module: "Kendaraan Dinas",
  },
  {
    id: 4,
    action: "Ruangan Meeting A1 dibooking",
    time: "2 jam lalu",
    type: "info",
    user: "Admin Ruangan",
    module: "Room Meeting",
  },
  {
    id: 5,
    action: "Perizinan kegiatan X ditolak",
    time: "3 jam lalu",
    type: "error",
    user: "Admin Kegiatan",
    module: "Perizinan Kegiatan",
  },
];

export default function Page() {
  const handleMetricClick = (route: string) => {
    console.log(`Navigate to ${route}`);
    // Here you would implement navigation logic
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metricCards.map((card, index) => (
          <Card
            key={index}
            className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg"
            onClick={() => handleMetricClick(card.route)}
            style={{ boxShadow: "var(--elevation-sm)" }}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="p-2 sm:p-3 bg-accent/10"
                  style={{ borderRadius: "var(--radius)" }}
                >
                  <card.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <p
                    className="text-card-foreground"
                    style={{
                      fontSize: "var(--text-3xl)",
                      fontWeight: "var(--font-weight-bold)",
                    }}
                  >
                    {card.value}
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{
                      fontSize: "var(--text-xs)",
                      fontWeight: "var(--font-weight-normal)",
                    }}
                  >
                    {card.title}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Bar Chart */}
        <Card className="rounded-2xl">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle
              className="text-card-foreground"
              style={{
                fontSize: "var(--text-xl)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              <span className="hidden sm:inline">
                Jumlah Pengajuan per Modul (Bulan Ini)
              </span>
              <span className="sm:hidden">Pengajuan per Modul</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer
              width="100%"
              height={250}
              className="sm:h-[300px]"
            >
              <BarChart data={barChartData}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    fontSize: "var(--text-xs)",
                  }}
                />
                <Bar
                  dataKey="rumahNegara"
                  fill="var(--chart-1)"
                  name="Rumah Negara"
                />
                <Bar
                  dataKey="roomMeeting"
                  fill="var(--chart-2)"
                  name="Room Meeting"
                />
                <Bar
                  dataKey="kendaraan"
                  fill="var(--chart-3)"
                  name="Kendaraan"
                />
                <Bar dataKey="kegiatan" fill="var(--chart-4)" name="Kegiatan" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Donut Chart */}
        <Card className="rounded-2xl">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle
              className="text-card-foreground"
              style={{
                fontSize: "var(--text-xl)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              <span className="hidden sm:inline">
                Distribusi Status Pengajuan
              </span>
              <span className="sm:hidden">Status Pengajuan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer
              width="100%"
              height={250}
              className="sm:h-[300px]"
            >
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  className="sm:inner-radius-[60] sm:outer-radius-[120]"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Persentase"]}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    fontSize: "var(--text-xs)",
                    color: "#fff", // teks jadi putih
                  }}
                  itemStyle={{
                    color: "#fff", // teks item juga putih
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
              {pieChartData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1 sm:gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: "var(--text-xs)" }}
                  >
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="rounded-2xl">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle
            className="text-card-foreground"
            style={{
              fontSize: "var(--text-xl)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            Aktivitas Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-border cursor-pointer transition-all duration-200 ease-in-out hover:bg-accent/10 gap-2 sm:gap-0"
                title={`${activity.user} • ${activity.time} • ${activity.module}`}
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        activity.type === "success"
                          ? "var(--chart-1)"
                          : activity.type === "warning"
                          ? "var(--chart-4)"
                          : activity.type === "error"
                          ? "var(--chart-3)"
                          : "var(--muted-foreground)",
                    }}
                  />
                  <span
                    className="text-card-foreground"
                    style={{
                      fontSize: "var(--text-base)",
                      fontWeight: "var(--font-weight-normal)",
                    }}
                  >
                    {activity.action}
                  </span>
                </div>
                <span
                  className="text-muted-foreground text-right sm:text-left ml-5 sm:ml-0"
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-weight-normal)",
                  }}
                >
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
