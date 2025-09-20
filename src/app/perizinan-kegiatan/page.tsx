"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, CalendarDays } from "lucide-react";

// Dummy data 20 event
const dummyEvents = Array.from({ length: 20 }, (_, i) => {
  const statuses = ["Diajukan", "Draf", "Disetujui", "Selesai", "Ditolak"];
  const categories = [
    "Rapat • Sumber Daya Manusia",
    "Penyuluhan • Hubungan Masyarakat",
    "Pelatihan • Divisi Urusan Hukum",
    "Upacara • Bagian Protokol",
    "Seminar • Penelitian dan Pengembangan",
  ];
  const locations = ["Daring", "Luring", "Hibrid"];

  return {
    code: `EV-2025-${String(i + 1).padStart(3, "0")}`,
    title: `Kegiatan ${i + 1}`,
    category: categories[i % categories.length],
    schedule: `${10 + (i % 20)} Mar 09.00 → 12.00`,
    location: locations[i % locations.length],
    status: statuses[i % statuses.length],
  };
});

export default function PerizinanKegiatanPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const [kegiatan, setKegiatan] = useState(dummyEvents);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();

  const handleDelete = (code: any) => {
    setKegiatan((prev) => prev.filter((kegiatan) => kegiatan.code !== code));
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = kegiatan.filter(
    (ev) =>
      (search === "" ||
        ev.code.toLowerCase().includes(search.toLowerCase()) ||
        ev.title.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus === "all" || ev.status === filterStatus) &&
      (filterCategory === "all" || ev.category.includes(filterCategory))
  );
  React.useEffect(() => {
    const newEventParam = searchParams.get("newEvent");
    if (newEventParam) {
      try {
        const newEvent= JSON.parse(decodeURIComponent(newEventParam));
        setKegiatan((prev) => [...prev, newEvent]);
      } catch (e) {
        console.error("Failed to parse newHouse:", e);
      }
    }
  }, [searchParams]);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="space-y-6 pt-3">
      {/* Filter bar */}
      <div className="flex w-full items-center justify-between flex-wrap gap-3">
        <div className="flex w-full flex-wrap gap-3 items-center">
          {/* Search */}
          <Input
            placeholder="Cari judul/kode/nomor izin"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="sm:w-[250px] flex-1"
          />

          {/* Status */}
          <Select
            onValueChange={(v) => {
              setFilterStatus(v);
              setCurrentPage(1);
            }}
            value={filterStatus}
          >
            <SelectTrigger className="w-[160px]">
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

          {/* Kategori */}
          <Select
            onValueChange={(v) => {
              setFilterCategory(v);
              setCurrentPage(1);
            }}
            value={filterCategory}
          >
            <SelectTrigger className="w-[160px]">
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

          {/* Date Pickers */}
          <Input type="date" className="w-[160px]" />
          <Input type="date" className="w-[160px]" />
          {/* Button */}
          <a href="perizinan-kegiatan/add">
            <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" /> Kegiatan Baru
            </Button>
          </a>
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
              {paginatedData.map((ev) => (
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
                    <div className="flex items-center gap-2">{ev.schedule}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        ev.location === "Daring"
                          ? "bg-blue-500"
                          : ev.location === "Luring"
                          ? "bg-green-500"
                          : "bg-purple-500"
                      }
                    >
                      {ev.location}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        ev.status === "Diajukan"
                          ? " bg-blue-500"
                          : ev.status === "Draf"
                          ? "bg-gray-500"
                          : ev.status === "Disetujui"
                          ? "bg-green-500"
                          : ev.status === "Selesai"
                          ? "bg-teal-500"
                          : "bg-red-500"
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
                          onClick={() =>
                            router.push(`/perizinan-kegiatan/${ev.code}`)
                          }
                        >
                          Lihat
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/perizinan-kegiatan/${ev.code}/edit`)
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(ev.code)}
                        >
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-4 flex ">
            <Pagination className="flex w-full justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-disabled={page === 1}
                    className="cursor-pointer"
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={page === i + 1}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    aria-disabled={page === totalPages}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
