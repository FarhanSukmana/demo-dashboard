"use client";
import React, { useState, useEffect } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, MoreVertical } from "lucide-react";

// Dummy data 20 rooms
const dummyRooms = Array.from({ length: 20 }, (_, i) => ({
  code: `RM-2025-${String(i + 1).padStart(3, "0")}`,
  name:
    i < 5
      ? `Main Conference Hall ${i + 1}`
      : i < 10
      ? `Executive Meeting Room ${i + 1}`
      : i < 15
      ? `Training Room ${i + 1}`
      : `Collaboration Room ${i + 1}`,
  type: i % 2 === 0 ? "Offline" : "Online",
  capacity: (i + 1) * 10,
  location: `Building ${String.fromCharCode(65 + (i % 5))} - Floor ${i % 6}`,
  status: i % 2 === 0 ? "Active" : "Inactive",
}));

export default function RoomMeetingPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [rooms, setRooms] = useState(dummyRooms);

  const router = useRouter();
  const searchParams = useSearchParams();

  
  const handleDelete = (code: any) => {
    setRooms((prev) => prev.filter((room) => room.code !== code));
  };

  useEffect(() => {
    const newRoomParam = searchParams.get("newRoom");
    if (newRoomParam) {
      try {
        const newRoom = JSON.parse(decodeURIComponent(newRoomParam));
        setRooms((prev) => [...prev, newRoom]);
      } catch (e) {
        console.error("Failed to parse newRoom:", e);
      }
    }
  }, [searchParams]);

  const filteredData = rooms.filter(
    (room) =>
      (search === "" ||
        room.code.toLowerCase().includes(search.toLowerCase()) ||
        room.name.toLowerCase().includes(search.toLowerCase()) ||
        room.location.toLowerCase().includes(search.toLowerCase())) &&
      (filterType === "all" || room.type === filterType) &&
      (filterStatus === "all" || room.status === filterStatus)
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
            placeholder="Search code/name/location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
          {/* Filter Type */}
          <Select onValueChange={setFilterType} value={filterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="Offline">Offline</SelectItem>
              <SelectItem value="Online">Online</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Status */}
          <Select onValueChange={setFilterStatus} value={filterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="Active">Aktif</SelectItem>
              <SelectItem value="Inactive">Tidak Aktif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <a href="room-meeting/add">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" /> Tambah Ruangan
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
                <TableHead>Tipe</TableHead>
                <TableHead>Kapasitas</TableHead>
                <TableHead>Lokasi/Meeting</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((room) => (
                <TableRow key={room.code}>
                  <TableCell className="font-semibold text-green-600">
                    {room.code}
                  </TableCell>
                  <TableCell>{room.name}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        room.type === "Online"
                          ? "bg-green-500"
                          : room.status === "Offline"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }
                    >
                      {room.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {room.location}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        room.status === "Active"
                          ? "bg-green-500"
                          : room.status === "Inactive"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }
                    >
                      {room.status}
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
                            router.push(`/room-meeting/${room.code}`)
                          }
                        >
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/room-meeting/${room.code}/edit`)
                          }
                        >
                          Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(room.code)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-4 flex">
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
