"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, CalendarDays } from "lucide-react";

// Dummy data sesuai gambar
const dummyEvents = [
  {
    code: "EV-2025-002",
    title: "Rapat Bulanan Pegawai",
    category: "Rapat • Sumber Daya Manusia",
    schedule: "25 Mar 10.00 → 12.00",
    location: "Daring",
    status: "Diajukan",
  },
  {
    code: "EV-2025-003",
    title: "Program Penyuluhan Masyarakat",
    category: "Penyuluhan • Hubungan Masyarakat",
    schedule: "1 Apr 08.00 → 17.00",
    location: "Luring",
    status: "Draf",
  },
  {
    code: "EV-2025-001",
    title: "Workshop Pelatihan Hukum Peraturan Baru",
    category: "Pelatihan • Divisi Urusan Hukum",
    schedule: "15 Apr 09.00 → 16.00",
    location: "Hibrid",
    status: "Disetujui",
  },
  {
    code: "EV-2025-004",
    title: "Upacara Penyambutan VIP",
    category: "Upacara • Bagian Protokol",
    schedule: "10 Mei 18.00 → 21.00",
    location: "Luring",
    status: "Selesai",
  },
  {
    code: "EV-2025-005",
    title: "Seminar Hukum Tahunan",
    category: "Seminar • Penelitian dan Pengembangan",
    schedule: "15 Jun, 08.00 → 16 Jun, 17.00",
    location: "Hibrid",
    status: "Ditolak",
  },
];

export default function PerizinanKegiatanPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const router = useRouter();

  const filteredData = dummyEvents.filter(
    (ev) =>
      (search === "" ||
        ev.code.toLowerCase().includes(search.toLowerCase()) ||
        ev.title.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus === "all" || ev.status === filterStatus) &&
      (filterCategory === "all" || ev.category.includes(filterCategory))
  );

  return (
    <div className="space-y-6 pt-3">
      {/* Filter bar */}
      <div className="flex w-full items-center justify-between flex-wrap gap-3">
        <div className="flex flex-col w-full sm:flex-row gap-3 flex-wrap">
          <div className="flex w-full gap-x-4">
            <Input
              placeholder="Cari judul/kode/nomor izin"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:min-w-[250px]"
            />
            <a href="perizinan-kegiatan/add">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" /> Kegiatan Baru
              </Button>
            </a>
          </div>
          <div className="flex w-full gap-4">
            <Select onValueChange={setFilterStatus} value={filterStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Diajukan">Diajukan</SelectItem>
                <SelectItem value="Draf">Draf</SelectItem>
                <SelectItem value="Disetujui">Disetujui</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
                <SelectItem value="Ditolak">Ditolak</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setFilterCategory} value={filterCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Rapat">Rapat</SelectItem>
                <SelectItem value="Penyuluhan">Penyuluhan</SelectItem>
                <SelectItem value="Pelatihan">Pelatihan</SelectItem>
                <SelectItem value="Upacara">Upacara</SelectItem>
                <SelectItem value="Seminar">Seminar</SelectItem>
              </SelectContent>
            </Select>

            <Input type="date" placeholder="dd/mm/yyyy" />
            <Input type="date" placeholder="dd/mm/yyyy" />
          </div>
        </div>
      </div>

      {/* Table */}
      <Card className="rounded-2xl">
        <CardContent className="p-4 sm:p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Jadwal</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((ev) => (
                <TableRow key={ev.code}>
                  <TableCell className="font-semibold text-green-600">
                    {ev.code}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{ev.title}</p>
                      <p className="text-sm text-gray-500">{ev.category}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                      {ev.schedule}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        ev.location === "Daring"
                          ? "bg-blue-100 text-blue-600"
                          : ev.location === "Luring"
                          ? "bg-green-100 text-green-600"
                          : "bg-purple-100 text-purple-600"
                      }
                    >
                      {ev.location}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        ev.status === "Diajukan"
                          ? "bg-blue-100 text-blue-600"
                          : ev.status === "Draf"
                          ? "bg-gray-200 text-gray-700"
                          : ev.status === "Disetujui"
                          ? "bg-green-100 text-green-600"
                          : ev.status === "Selesai"
                          ? "bg-teal-100 text-teal-600"
                          : "bg-red-100 text-red-600"
                      }
                    >
                      {ev.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left" align="start">
                        <DropdownMenuItem
                          onClick={() => router.push(`/perizinan-kegiatan/${ev.code}`)}
                        >
                          Lihat
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
