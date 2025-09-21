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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// Dummy data vehicles
// Dummy data 20 kendaraan dinas
const dummyVehicles = Array.from({ length: 20 }, (_, i) => ({
  plate: `B ${1000 + i} ${["ABC", "DEF", "GHI", "JKL", "MNO"][i % 5]}`,
  brand:
    i < 5
      ? `Toyota Fortuner ${i + 1}`
      : i < 10
      ? `Mitsubishi Pajero ${i + 1}`
      : i < 15
      ? `Honda CR-V ${i + 1}`
      : `Suzuki Ertiga ${i + 1}`,
  year: 2010 + (i % 15), // tahun 2010–2024
  fuel: i % 2 === 0 ? "Gasoline" : "Diesel",
  odometer: (i + 1) * 5000, // jarak tempuh naik tiap kendaraan
  condition:
    i % 4 === 0
      ? "Good"
      : i % 4 === 1
      ? "Fair"
      : i % 4 === 2
      ? "Needs-Repair"
      : "Good",
  status: i % 3 === 0 ? "Available" : i % 3 === 1 ? "In Use" : "Maintenance",
}));

export default function KendaraanDinasPage() {
  const [search, setSearch] = useState("");
  const [filterCondition, setFilterCondition] = useState("all");
  const [filterFuel, setFilterFuel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [vehicle, setVehicle] = useState(dummyVehicles); // mulai dari dummy
  const searchParams = useSearchParams();

  const router = useRouter();
  // Fungsi Delete
  const handleDelete = (plate: any) => {
    setVehicle((prev) => prev.filter((vehicle) => vehicle.plate !== plate));
  };

  // Membaca Data Baru
  React.useEffect(() => {
    const newVehicleParam = searchParams.get("newVehicle");
    if (newVehicleParam) {
      try {
        const newVehicle = JSON.parse(decodeURIComponent(newVehicleParam));
        setVehicle((prev) => [...prev, newVehicle]);
      } catch (e) {
        console.error("Failed to parse Vehicle:", e);
      }
    }
  }, [searchParams]);
  const filteredData = vehicle.filter((vehicle) => {
    const matchesSearch =
      search === "" ||
      vehicle.plate.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(search.toLowerCase());

    const matchesCondition =
      filterCondition === "all" || vehicle.condition === filterCondition;

    const matchesFuel = filterFuel === "all" || vehicle.fuel === filterFuel;

    const matchesStatus =
      filterStatus === "all" || vehicle.status === filterStatus;
    return matchesSearch && matchesCondition && matchesFuel && matchesStatus;
  });

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
        <div className="flex w-full items-center justify-between gap-3 flex-wrap">
          {/* Search & Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <Input
              placeholder="Search plate/brand/model/driver"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[240px]"
            />
            <Select onValueChange={setFilterCondition} value={filterCondition}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="Good">Baik</SelectItem>
                <SelectItem value="Fair">Cukup</SelectItem>
                <SelectItem value="Needs-Repair">Butuh Perbaikan</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setFilterFuel} value={filterFuel}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Fuel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="Gasoline">Bensin</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setFilterStatus} value={filterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="Available">Tersedia</SelectItem>
                <SelectItem value="In Use">Sedang Digunakan</SelectItem>
                <SelectItem value="Inactive">Tidak Aktif</SelectItem>
                <SelectItem value="Maintenance">Dalam Perawatan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Button */}
          <a href="kendaraan-dinas/add">
            <Button className="bg-[#031833] dark:text-white whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
          </a>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-4 sm:p-6">
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plat Nomor</TableHead>
                <TableHead>Merek/Model</TableHead>
                <TableHead>Tahun</TableHead>
                <TableHead>Bahan Bakar</TableHead>
                <TableHead>Odometer (km)</TableHead>
                <TableHead>Kondisi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((vehicle) => (
                <TableRow key={vehicle.plate}>
                  <TableCell className="font-semibold text-green-600">
                    {vehicle.plate}
                  </TableCell>
                  <TableCell>{vehicle.brand}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{vehicle.fuel}</TableCell>
                  <TableCell>
                    {vehicle.odometer.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        vehicle.condition === "Good"
                          ? "bg-green-500"
                          : vehicle.condition === "Fair"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }
                    >
                      {vehicle.condition === "Good"
                        ? "Baik"
                        : vehicle.condition === "Fair"
                        ? "Cukup"
                        : "Butuh Perbaikan"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        vehicle.status === "Available"
                          ? "bg-green-500"
                          : vehicle.status === "In Use"
                          ? "bg-blue-500"
                          : vehicle.status === "Inactive"
                          ? "bg-gray-500"
                          : "bg-yellow-500"
                      }
                    >
                      {vehicle.status === "Available"
                        ? "Tersedia"
                        : vehicle.status === "In Use"
                        ? "Sedang Digunakan"
                        : vehicle.status === "Inactive"
                        ? "Tidak Aktif"
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
                            router.push(
                              `/kendaraan-dinas/${encodeURIComponent(
                                vehicle.plate
                              )}`
                            )
                          }
                        >
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/kendaraan-dinas/${vehicle.plate}/edit`
                            )
                          }
                        >
                          Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(vehicle.plate)}
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
