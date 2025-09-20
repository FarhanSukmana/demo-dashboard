"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, MoreVertical } from "lucide-react";

// Dummy data 20 rumah
const dummyHouses = Array.from({ length: 20 }, (_, i) => ({
  code: `RN-2025-${String(i + 1).padStart(3, "0")}`,
  name:
    i < 5
      ? `Minister Residence ${i + 1}`
      : i < 10
      ? `Deputy Residence ${i + 1}`
      : i < 15
      ? `Staff Housing Block ${i + 1}`
      : `Guest House ${i + 1}`,
  address: `Jl. Contoh No. ${i + 1}, Jakarta Selatan`,
  province: "DKI Jakarta",
  type:
    i % 3 === 0
      ? "Official Residence"
      : i % 3 === 1
      ? "Staff Housing"
      : "Guest House",
  condition:
    i % 4 === 0
      ? "Good"
      : i % 4 === 1
      ? "Fair"
      : i % 4 === 2
      ? "Needs Repair"
      : "Good",
  status: i % 3 === 0 ? "Available" : i % 3 === 1 ? "Occupied" : "Maintenance",
  
}));

export default function RumahNegaraPage() {
  const [search, setSearch] = useState("");
  const [filterProvince, setFilterProvince] = useState("all");
  const [filterCondition, setFilterCondition] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [houses, setHouses] = useState(dummyHouses); // mulai dari dummy
  const searchParams = useSearchParams();

  const handleDelete = (code:any) => {
    setHouses((prev) => prev.filter((house) => house.code !== code));
  };

  const router = useRouter();
  React.useEffect(() => {
    const newHouseParam = searchParams.get("newHouse");
    if (newHouseParam) {
      try {
        const newHouse = JSON.parse(decodeURIComponent(newHouseParam));
        setHouses((prev) => [...prev, newHouse]);
      } catch (e) {
        console.error("Failed to parse newHouse:", e);
      }
    }
  }, [searchParams]);

  const filteredData = houses.filter(
    (house) =>
      (search === "" ||
        house.code.toLowerCase().includes(search.toLowerCase()) ||
        house.name.toLowerCase().includes(search.toLowerCase()) ||
        house.address.toLowerCase().includes(search.toLowerCase())) &&
      (filterProvince === "all" || house.province === filterProvince) &&
      (filterCondition === "all" || house.condition === filterCondition) &&
      (filterStatus === "all" || house.status === filterStatus)
  );
  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="space-y-6 pt-3">
      <div className="flex w-full items-center justify-between flex-wrap gap-3">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Input
            placeholder="Cari Kode/Nama/Alamat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select onValueChange={setFilterProvince} value={filterProvince}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setFilterCondition} value={filterCondition}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="Good">Baik</SelectItem>
              <SelectItem value="Fair">Cukup</SelectItem>
              <SelectItem value="Needs Repair">Butuh Perbaikan</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setFilterStatus} value={filterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="Available">Tersedia</SelectItem>
              <SelectItem value="Occupied">Terisi</SelectItem>
              <SelectItem value="Maintenance">Dalam perawatan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <a href="rumah-negara/add">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" /> Tambah Rumah
          </Button>
        </a>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-4 sm:p-6">
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Provinsi</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Kondisi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((house) => (
                <TableRow key={house.code}>
                  <TableCell className="font-semibold text-green-600">
                    {house.code}
                  </TableCell>
                  <TableCell>{house.name}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {house.address}
                  </TableCell>
                  <TableCell>{house.province}</TableCell>
                  <TableCell>{house.type}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        house.condition === "Good"
                          ? "bg-green-500"
                          : house.condition === "Fair"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }
                    >
                      {house.condition === "Good"
                        ? "Baik"
                        : house.condition === "Fair"
                        ? "Cukup"
                        : "Butuh Perbaikan"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        house.status === "Available"
                          ? "bg-green-500"
                          : house.status === "Occupied"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }
                    >
                      {house.status === "Available"
                        ? "Tersedia"
                        : house.status === "Occupied"
                        ? "Terisi"
                        : "Dalam Perawatan"}
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
                            router.push(`/rumah-negara/${house.code}`)
                          }
                        >
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/rumah-negara/${house.code}/edit`)
                          }
                        >
                          Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(house.code)}
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
